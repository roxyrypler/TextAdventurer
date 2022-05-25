import GameState from "../../../modules/gamestate.js";
import index from "../../../index.js";

let location = {
    id: 0,
    title: "Dev World - Spawn",
    description: [
        {
            text: "You are located in spawn"
        },
        {
            text: "There is a path to the north... "
        },
        {
            text: "[go north]",
            choices: {
                "go north": () => {
                    GameState.player.progress.locationID = 1;
                    index.HandleLocation();
                }
            },
            action: () => {
                console.log("Action");
                index.ChanceOfStartingBattle(10);
            }
        }
    ]
}

export default {
    location
}