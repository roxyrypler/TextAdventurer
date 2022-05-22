import config from "../config.js";

let data = {
    entries: [
        {
            text: "Text Adventure Game"
        },
        {
            text: config.version
        },
        {
            text: "------------------------"
        },
        {
            text: "[1] - Start New Game"
        },
        {
            text: "[2] - FreeBattle"
        },
        {
            text: "[3] - Exit Game"
        },
        {
            text: "------------------------"
        },
        {
            text: "type a number to select an option"
        }
    ]
}

export default {
    data
}