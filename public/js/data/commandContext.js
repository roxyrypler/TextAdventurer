import defaultCommands from "./standardCommands.js";

let mainMenuCommands = {
    defaults: defaultCommands.commands,
    1: null,
    2: null,
    3: null
}

let playCommands = {
    defaults: defaultCommands.commands
}

export default {
    mainMenuCommands,
    playCommands
}