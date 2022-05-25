import TextDisplay from "./textDisplay.js";
import TextInput from "./textInput.js";
import GameState from "../modules/gamestate.js";
import commandContexts from "../data/commandContext.js";
import theme from "../data/themes.js";

export default class InputDisplayController {
    constructor() {
        this.display = new TextDisplay();
        this.input = new TextInput();

        this.init();
    }

    init() {
        this.initEventHandlers();
    }

    initEventHandlers() {
        this.input.elem.addEventListener("input", () => {
            //console.log(this.elem.value);
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                if (this.input.elem == document.activeElement) {
                    this.validateInput(this.input.elem.value);
                    this.input.elem.value = "";
                }
            }
        });
    }

    validateInput(value) {
        let string;
        if (value.length === 0) return;
        string = value;

        if (string.toLowerCase() == "y") string = "yes";
        if (string.toLowerCase() == "n") string = "no";

        this.parseInput(string);
    }

    parseInput(value) {
        console.log(value);
        let context = {};

        switch (GameState.state) {
            case GameState.states.MAINMENU:
                context = commandContexts.mainMenuCommands;
                break;
            case GameState.states.PLAY:
                context = commandContexts.playCommands;
                break;
            case GameState.states.BATTLE:
                context = commandContexts.playCommands; // may change to battle commands later
                break;

            default:
                console.log("Sorry i did not understand");
                break;
        }

        let didFindCommand = false;
        // Check default commands
        for (const key in context.defaults) {
            if (value.toLowerCase() === key) {
                context.defaults[key]();
                didFindCommand = true;
            }
        }

        // Check context commands
        for (const key in context) {
            if (value.toLowerCase() === key) {
                context[key]();
                didFindCommand = true;
            }
        }

        this.display.createUserEntry({
            line: value,
            color: theme.textColor.white
        });

        if (!didFindCommand) {
            this.display.createUserEntry({
                line: "Sorry i dident understand. help for more optionss",
                color: theme.textColor.white
            });
        }
    }
}