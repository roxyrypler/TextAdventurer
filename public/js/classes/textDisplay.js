import ref from "../modules/ref.js";

export default class TextDisplay {
    constructor(textInput) {
        this.textInput = textInput;
        this.isQueueBusy = false;
        this.Queue = [];
    }

    addToQueue(line) {
        this.Queue.push(line);
    }
    
    handleQueue() {
        setTimeout(() => {
            if (this.Queue.length > 0) {
                this.isQueueBusy = true;
                ref.textInput.disabled = true;
                this.createUserEntry(this.Queue[0]);
                this.Queue.splice(0, 1);
                this.handleQueue();
            }else {
                this.isQueueBusy = false;
                ref.textInput.disabled = false;
            }
        }, 500);

    }

    createUserEntry(data) {
        let p = document.createElement("p");
        p.innerHTML = `> ${data.toString()}`;
        p.className = "animatedText";

        ref.TextAreaBox.appendChild(p);
    }

    clearWindow() {
        ref.TextAreaBox.innerHTML = `
            <br>
        `;
    }
}