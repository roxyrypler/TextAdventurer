import defaultCommands from "./standardCommands.js";

let mainMenuCommands = {
    defaults: defaultCommands.commands,
    1: null,
    2: null
}

let mainMenuCommandsDescriptions = {
    1: "Start new Game",
    2: "Exit Game"
}

let playCommands = {
    defaults: defaultCommands.commands
}

export default {
    mainMenuCommands,
    mainMenuCommandsDescriptions,
    playCommands
}