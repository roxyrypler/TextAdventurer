import ref from "../modules/ref.js";

export default class TextDisplay {
    constructor(textInput) {
        this.textInput = textInput;
        this.isQueueBusy = false;
        this.Queue = [];
    }

    addToQueue(line, color) {
        this.Queue.push({
            line,
            color
        });
    }
    
    handleQueue() {
        setTimeout(() => {
            if (this.Queue.length > 0) {
                this.isQueueBusy = true;
                ref.textInput.disabled = true;
                this.createUserEntry(this.Queue[0]);
                this.Queue.splice(0, 1);
                this.handleQueue();

                ref.TextAreaBox.scrollTop = ref.TextAreaBox.scrollHeight;
            }else {
                this.isQueueBusy = false;
                ref.textInput.disabled = false;
                ref.textInput.focus();
            }
        }, 200);

    }

    createUserEntry(data) {
        let p = document.createElement("p");
        p.innerHTML = `> ${data.line?.toString()}`;
        p.className = "animatedText";
        p.style.color = data.color;

        ref.TextAreaBox.appendChild(p);
    }

    clearWindow() {
        ref.TextAreaBox.innerHTML = `
            <br>
        `;
    }
}