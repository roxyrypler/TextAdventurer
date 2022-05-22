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
                    text: "Awesome",
                },
                {
                    text: "Shall we train you in the arts of combat?"
                },
                {
                    text: "[yes] or [no]",
                    choices: {
                        yes: () => { 
                            GameState.player.progress.step = 4;
                            index.OnAction();
                        },
                        no: () => {
                            GameState.player.progress.step = 5;
                            index.OnAction();
                        }
                    }
                }
            ]
        },
        {
            step: 3,
            dialog: [
                {
                    text: "nvm then :("
                },
                {
                    text: "Exiting..."
                }
            ],
            action: () => {
                setTimeout(() => {
                    GameState.player.progress.step = 1;
                    index.SetState(GameState.states.MAINMENU);
                }, 1000);
            }
        },
        {
            step: 4,
            dialog: [
                {
                    text: "Lets start a battle"
                }
            ],
            action: () => {
                console.log("Start a battle");
            }
        },
        {
            step: 5,
            dialog: [
                {
                    text: "hmm i guess you have plaid before then."
                }
            ],
            action: () => {
                console.log("Continue story");
            }
        }
    ]
}

export default Story;