import GameState from "../../../modules/gamestate.js";

let location = {
    id: 0,
    title: "Dev World - Spawn",
    paths,
    description: [
        {
            text: "You are located in spawn"
        },
        {
            text: "you stand on a crossroads, with paths leading: ",
            choices: {
                north: () => {
                    GameState.player.progress.locationID = 1;
                }
            }
        }
    ]
}

export default {
    location
}