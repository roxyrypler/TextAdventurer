import GameState from "./modules/gamestate.js";
import GETREQ from "./modules/getreq.js";
import InputDisplayController from "./classes/inputDisplayController.js";
import MainMenuData from "./data/mainMenu.js";
import commandDefaults from "./data/standardCommands.js";
import commandContexts from "./data/commandContext.js";
import gamestate from "./modules/gamestate.js";

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
    console.log(MainMenuData);
    inputDisplayController.display.clearWindow();
    MainMenuData.data.entries.forEach((i) => {
        inputDisplayController.display.addToQueue(i.text);
    });

    inputDisplayController.display.handleQueue(); // run this after handling all text to be displayed
}

function onPlay() {
    inputDisplayController.display.clearWindow();
    console.log("started playing");
}

/* ------------------------------------ Handle option callbacks ----------------------------------------------------- */

function CommandCallbacks() {
    commandDefaults.commands.help = () => {
        let output = [];
        let context;
        switch (GameState.state) {
            case GameState.states.MAINMENU:
                context = commandContexts.mainMenuCommands;
                break;
            case GameState.states.PLAY:
                context = commandContexts.playCommands
                break;
        }

        for (const key in context.defaults) {
            output.push(key);
        }
        for (const key in context) {
            if (key != "defaults") {
                output.push(key);
            }
        }

        inputDisplayController.display.addToQueue("Available Commands:");
        output.forEach((i) => {
            inputDisplayController.display.addToQueue(i);
        });
        inputDisplayController.display.handleQueue();
        console.log(output);
    }

    commandDefaults.commands.exit = () => {
        setTimeout(() => {
            SetState(GameState.states.MAINMENU);
        }, 500);
    }

    commandContexts.mainMenuCommands[1] = () => {
        setTimeout(() => {
            SetState(GameState.states.PLAY);
        }, 500);
    }
}