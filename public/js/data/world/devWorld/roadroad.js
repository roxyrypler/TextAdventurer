import GameState from "../../../modules/gamestate.js";

let location = {
    id: 1,
    title: "Dev World - Barren road",
    description: [
        {
            text: "You are located in a barren road"
        },
        {
            text: "you stand on a a abandoned road, there are paths to: ",
            choices: {
                north: () => {
                    GameState.player.progress.locationID = 1;
                },
                south: () => {
                    GameState.player.progress.locationID = 0;
                }
            }
        }
    ]
}



export default {
    location
}