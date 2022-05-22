import index from "../../index.js";
import GameState from "../../modules/gamestate.js";

let Story = {
    id: 1,
    title: "Development Story",
    steps: [
        {
            step: 1,
            dialog: [
                {
                    text: "Welcome to Development Story",
                },
                {
                    text: "I will guide you through this awesome adventure"
                },
                {
                    text: "Are you excited? "
                },
                {
                    text: "[yes] or [no]",
                    choices: {
                        yes: () => { 
                            GameState.player.progress.step = 2;
                            index.OnAction();
                        },
                        no: () => {
                            GameState.player.progress.step = 3;
                            index.OnAction();
                        }
                    }
                }
            ],

        },
        {
            step: 2,
            dialog: [
                {
                    text: "Awesome"
                }
            ]
        },
        {
            step: 3,
            dialog: [
                {
                    text: "nvm then :("
                }
            ]
        }
    ]
}

export default Story;