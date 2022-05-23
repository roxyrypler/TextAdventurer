import GameState from "./modules/gamestate.js";
import GETREQ from "./modules/getreq.js";
import InputDisplayController from "./classes/inputDisplayController.js";
import MainMenuData from "./data/mainMenu.js";
import commandDefaults from "./data/standardCommands.js";
import commandContexts from "./data/commandContext.js";
import StoryIndex from "./data/storylines/storyindex.js";
import theme from "./data/themes.js";
import enemyIndex from "./data/enemys/enemyindex.js";

let inputDisplayController;

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
    }
}

function onInit() {
    console.log("STATE - INIT");
    inputDisplayController = new InputDisplayController();
    CommandCallbacks();
    /*
    GETREQ.GET("getquest", (data) => {
        console.log(data);
    });
    */
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

function onBattle(startedFromStory) {
    console.log("A Battle has started");
    commandContexts.playCommands = {};
    commandContexts.playCommands.defaults = commandDefaults.commands;

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
            inputDisplayController.display.handleQueue();
            clearInterval(battleInterval);
            if (startedFromStory) {
                ProgressStory();
            }
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

function OnAction() {
    ProgressStory();
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
            SetState(GameState.states.BATTLE);
        }, 500);
    }

    commandContexts.mainMenuCommands[3] = () => {
        setTimeout(() => {
            SetState(GameState.states.MAINMENU);
        }, 500);
    }
}

export default {
    OnAction,
    onBattle,
    SetState
}