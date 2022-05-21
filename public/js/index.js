import GameState from "./modules/gamestate.js";
import GETREQ from "./modules/getreq.js";
import InputDisplayController from "./classes/inputDisplayController.js";
import MainMenuData from "./data/mainMenu.js";

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
    }
}

function onInit() {
    console.log("STATE - INIT");
    inputDisplayController = new InputDisplayController();
    GETREQ.GET("getquest", (data) => {
        console.log(data);
    });
}

function onMainMenu() {
    console.log("STATE - MAINMENU");
    console.log(MainMenuData);
    MainMenuData.data.entries.forEach((i) => {
        inputDisplayController.display.createUserEntry(i.text);
    });
}