import GameState from "./modules/gamestate.js";
//import GETREQ from "./modules/getreq.js";
import InputDisplayController from "./classes/inputDisplayController.js";
import MainMenuData from "./data/mainMenu.js";
import commandDefaults from "./data/standardCommands.js";
import commandContexts from "./data/commandContext.js";
import StoryIndex from "./data/storylines/storyindex.js";
import WorldIndex from "./data/world/worldindex.js";
import theme from "./data/themes.js";
import enemyIndex from "./data/enemys/enemyindex.js";
import Inventory from "./classes/inventory.js";
import itemsindex from "./data/items/itemsindex.js";

let inputDisplayController;
let inventory;

let main = () => {
    SetState(GameState.states.INIT);
}

main();

function SetState(state) {
    GameState.state = state;
    switch (GameState.state) {
        case GameState.states.INIT:
            onInit();
            SetState(GameState.states.MAINMENU);
            break;
        case GameState.states.MAINMENU:
            onMainMenu();
            break;
        case GameState.states.PLAY:
            onPlay();
            break;
        case GameState.states.BATTLE:
            onBattle();
            break;
        case GameState.states.ONYOUROWN:
            onOnYourOwn();
            break;
    }
}

function onInit() {
    console.log("STATE - INIT");
    inputDisplayController = new InputDisplayController();
    inventory = new Inventory(20);
    CommandCallbacks();

    inventory.addItem("GoldCoin", 10);
}

function onMainMenu() {
    console.log("STATE - MAINMENU");
    inputDisplayController.display.clearWindow();
    MainMenuData.data.entries.forEach((i) => {
        inputDisplayController.display.addToQueue(i.text, theme.textColor.purple);
    });

    inputDisplayController.display.handleQueue(); // run this after handling all text to be displayed
}

function onPlay() {
    console.log("started playing");
    inputDisplayController.display.clearWindow();
    ProgressStory();

}

function onOnYourOwn() {
    GameState.player.progress.isStoryMode = false;
    HandleLocation();
}

function ChanceOfStartingBattle(chance) {
    let rand = Math.floor(Math.random() * (100 - 0) + 0);

    if (rand < chance) {
        onBattle();
    }
}

function GetItem() {
    let rand = Math.floor(Math.random() * 100);
    let rarity = "Common";
    let raritySorts = [];

    if (rand >= 90) {
        rarity = "Legendary";
    }else if (rand <= 89 && rand >= 70) {
        rarity = "Epic";
    }else if (rand <= 69 && rand >= 40) {
        rarity = "Rare";
    }else if (rand <= 39) {
        rarity = "Common";
    }

    for (let item in itemsindex) {
        if (itemsindex[item].rarity == rarity) {
            raritySorts.push(itemsindex[item]);
        }
    }

    let randItemFromRarity = Math.floor(Math.random() * (raritySorts.length));
    return raritySorts[randItemFromRarity];
}

function onBattle(startedFromStory) {
    console.log("A Battle has started");
    //commandContexts.playCommands = {};
    //commandContexts.playCommands.defaults = commandDefaults.commands;

    inputDisplayController.display.clearWindow();
    inputDisplayController.display.addToQueue("Battle has started", theme.textColor.golden);

    let creature = JSON.parse(JSON.stringify(enemyIndex[0].creature)); // Making a copy from "catalog" of enemys
    // TODO: Set appropriate level, health and damage on attacks based on player stats

    inputDisplayController.display.addToQueue(`creature ${creature.name}, level ${creature.level} has appeard!`, theme.textColor.golden);

    inputDisplayController.display.handleQueue();

    let turnCounter = 0;

    let battleInterval = setInterval(() => {
        if (GameState.player.health <= 0) {
            console.log("You lost the battle");

        } else if (creature.health <= 0) {
            console.log("You won the battle");
            inputDisplayController.display.addToQueue(`I won the battle!`, theme.textColor.golden);
            clearInterval(battleInterval);
            if (startedFromStory) {
                ProgressStory();
            }else {
                // Handle random rewards in free mode
                let rand = Math.floor(Math.random() * 10);
                for (let i = 0; i < rand; i++) {
                    let retrivedItem = GetItem();
                    inputDisplayController.display.addToQueue(`I got a ${retrivedItem.name}`, theme.textColor.golden);
                    inventory.addItem(retrivedItem.name, 1);
                }
            }
            setTimeout(() => {
                inputDisplayController.display.handleQueue();
            }, 1000);
        } else {
            ProgressBattle(turnCounter % 2 == 0, creature);
            turnCounter++;
        }
    }, 2000);
}

function ProgressBattle(turnbool, creature) {
    inputDisplayController.display.clearWindow();

    let getPlayerAttack = GameState.player.attacks[0]; // TODO: make get random attack?
    let getenemyAttack = creature.attacks[0]; // TODO: make get random attacks

    if (turnbool) { // players turn
        inputDisplayController.display.addToQueue(`You attacked with ${getPlayerAttack.name}`, theme.textColor.white);
        inputDisplayController.display.addToQueue(`You dealt ${getPlayerAttack.damage}dmg to ${creature.name}`, theme.textColor.golden);
        creature.health -= getPlayerAttack.damage;
        if (creature.health < 0) {
            creature.health = 0;
        }
        inputDisplayController.display.addToQueue(`The creature have ${creature.health}hp left`, theme.textColor.purple);

        inputDisplayController.display.handleQueue();

    } else { // enemys turn
        inputDisplayController.display.addToQueue(`Enemy used ${getenemyAttack.name} dealing ${getenemyAttack.damage}dmg to me`, theme.textColor.red);
        GameState.player.health -= getenemyAttack.damage;
        if (GameState.player.health < 0) {
            GameState.player.health = 0;
        }
        inputDisplayController.display.addToQueue(`i have ${GameState.player.health}hp left`, theme.textColor.golden);

        inputDisplayController.display.handleQueue();
    }
}

function ProgressStory() {
    // TODO: Get story and step id from savegame.
    let Story = GameState.player.progress.currentStoryID;
    let StoryStep = GameState.player.progress.step;

    commandContexts.playCommands = {};
    commandContexts.playCommands.defaults = commandDefaults.commands;

    setTimeout(() => {
        StoryIndex.forEach((s) => {
            if (s.id == Story) {
                s.steps.forEach((step) => {
                    if (step.step == StoryStep) {
                        step.dialog.forEach((d) => {
                            inputDisplayController.display.addToQueue(d.text, theme.textColor.white);
                            if (d.choices) {
                                for (let key in d.choices) {
                                    commandContexts.playCommands[`${key}`] = d.choices[key];
                                }
                            }
                        });
                        if (step.action) {
                            setTimeout(() => {
                                step.action();
                            }, 1000);
                        }
                    }
                });
            }
        });
        inputDisplayController.display.handleQueue();
    }, 50);
}

function HandleLocation() {
    let worldID = GameState.player.progress.worldID;
    let locationID = GameState.player.progress.locationID;

    commandContexts.playCommands = {};
    commandContexts.playCommands.defaults = commandDefaults.commands;

    setTimeout(() => {
        for (let key in WorldIndex) {
            if (key == worldID) {
                WorldIndex[key].forEach((i) => {
                    if (i.location.id == locationID) {
                        i.location.description.forEach((d) => {
                            inputDisplayController.display.addToQueue(d.text, theme.textColor.white);
                            if (d.choices) {
                                if (!GameState.player.progress.isStoryMode) {
                                    for (let key in d.choices) {
                                        commandContexts.playCommands[`${key}`] = d.choices[key];
                                    }
                                }
                            }
                            if (d.action) {
                                setTimeout(() => {
                                    d.action();
                                }, 1000);
                            }
                        });
                    }
                });
            }
        }
        inputDisplayController.display.handleQueue();
    }, 50);
}

/* ------------------------------------ Handle option callbacks ----------------------------------------------------- */

function CommandCallbacks() {
    commandDefaults.commands.help = () => {
        let output = [];
        let context = null;
        let descriptions = null;
        switch (GameState.state) {
            case GameState.states.MAINMENU:
                context = commandContexts.mainMenuCommands;
                descriptions = commandContexts.mainMenuCommandsDescriptions;
                break;
            case GameState.states.PLAY:
                context = commandContexts.playCommands
                break;
            case GameState.states.BATTLE:
                context = commandContexts.playCommands; // May change these to battle commands later
                break;
            case GameState.states.ONYOUROWN:
                context = commandContexts.playCommands; // May change these to battle commands later
                break;
        }

        for (const key in context.defaults) {
            output.push(`[${key}] - ${commandDefaults.descriptions[key]}`);
        }
        for (const key in context) {
            if (key != "defaults") {
                if (descriptions != null) {
                    output.push(`[${key}] - ${descriptions[key]}`);
                } else {
                    output.push(`[${key}]`);
                }
            }
        }

        inputDisplayController.display.addToQueue("Available Commands:", theme.textColor.golden);
        output.forEach((i) => {
            inputDisplayController.display.addToQueue(i, theme.textColor.purple);
        });
        inputDisplayController.display.handleQueue();
    }

    commandDefaults.commands.exit = () => {
        setTimeout(() => {
            SetState(GameState.states.MAINMENU);
        }, 500);
    }

    commandDefaults.commands.clear = () => {
        setTimeout(() => {
            inputDisplayController.display.clearWindow();
        }, 500);
    }

    commandDefaults.commands.cls = () => {
        setTimeout(() => {
            inputDisplayController.display.clearWindow();
        }, 500);
    }

    commandContexts.mainMenuCommands[1] = () => {
        setTimeout(() => {
            SetState(GameState.states.PLAY);
        }, 500);
    }

    commandContexts.mainMenuCommands[2] = () => {
        setTimeout(() => {
            SetState(GameState.states.ONYOUROWN);
        }, 500);
    }

    commandContexts.mainMenuCommands[3] = () => {
        setTimeout(() => {
            SetState(GameState.states.BATTLE);
        }, 500);
    }

    commandContexts.mainMenuCommands[4] = () => {
        setTimeout(() => {
            SetState(GameState.states.MAINMENU);
        }, 500);
    }
}

export default {
    ProgressStory,
    HandleLocation,
    ChanceOfStartingBattle,
    onBattle,
    SetState,
    inventoryInstance: inventory
}