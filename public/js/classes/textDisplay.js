import ref from "../modules/ref.js";

export default class TextDisplay {
    constructor(textInput) {
        this.textInput = textInput;
    }

    createUserEntry(data) {
        let p = document.createElement("p");
        p.innerHTML = `> ${data.toString()}`;

        ref.TextAreaBox.appendChild(p);
    }
}