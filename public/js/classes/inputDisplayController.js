import TextDisplay from "./textDisplay.js";
import TextInput from "./textInput.js";

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
        if (value.length === 0) return;
        
        this.parseInput(value);
    }

    parseInput(value) {
        console.log(value);
        // TODO: refer to state / context for command parsing. Need to make

        if (value === "1") {
            console.log("start game");
        }
        this.display.createUserEntry(value);
    }
}