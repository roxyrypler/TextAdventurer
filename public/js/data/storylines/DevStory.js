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
                            index.ProgressStory();
                        },
                        no: () => {
                            GameState.player.progress.step = 3;
                            index.ProgressStory();
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
                            index.ProgressStory();
                        },
                        no: () => {
                            GameState.player.progress.step = 5;
                            index.ProgressStory();
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
                GameState.player.progress.step = 6;
                index.onBattle(true);
            }
        },
        {
            step: 5,
            dialog: [
                {
                    text: "hmm i guess you have played before then."
                }
            ],
            action: () => {
                GameState.player.progress.step = 7;
                index.ProgressStory();
                console.log("Continue story");
            }
        },
        {
            step: 6,
            dialog: [
                {
                    text: "Hurrayy! you won the battle!"
                }
            ],
            action: () => {
                console.log("Continue story");
            }
        },
        {
            step: 7,
            dialog: [
                {
                    text: "Lets see, where are we"
                }
            ],
            action: () => {
                GameState.player.progress.worldID = "DevWorld";
                GameState.player.progress.locationID = 0;
                index.HandleLocation();
            }
        }
    ]
}

export default Story;