import GameState from "./modules/gamestate.js";
import GETREQ from "./modules/getreq.js";
import InputDisplayController from "./classes/inputDisplayController.js";
import MainMenuData from "./data/mainMenu.js";
import commandDefaults from "./data/standardCommands.js";
import commandContexts from "./data/commandContext.js";
import StoryIndex from "./data/storyindex.js";
import theme from "./data/themes.js";

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
    inputDisplayController.display.clearWindow();
    console.log("started playing");
    ProgressStory();

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
        }

        for (const key in context.defaults) {
            output.push(`[${key}] - ${commandDefaults.descriptions[key]}`);
        }
        for (const key in context) {
            if (key != "defaults") {
                if (descriptions != null) {
                    output.push(`[${key}] - ${descriptions[key]}`);
                }else {
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
}

export default {
    OnAction,
    SetState
}