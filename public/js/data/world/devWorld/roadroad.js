import GameState from "../../../modules/gamestate.js";
import index from "../../../index.js";

let location = {
    id: 1,
    title: "Dev World - Barren road",
    description: [
        {
            text: "You are located in a barren road"
        },
        {
            text: "you stand on a abandoned road, there are paths to: "
        },
        {
            text: "[go north] [go south]",
            choices: {
                "go north": () => {
                    GameState.player.progress.locationID = 1;
                    index.HandleLocation();
                },
                "go south": () => {
                    GameState.player.progress.locationID = 0;
                    index.HandleLocation();
                }
            },
            action: () => {

            }
        }
    ]
}



export default {
    location
}