import defaultCommands from "./standardCommands.js";

let mainMenuCommands = {
    defaults: defaultCommands.commands
}

let mainMenuCommandsDescriptions = {
    1: "Start new StoryMode",
    2: "Your on your own",
    3: "Free-Battle",
    4: "Exit Game"
}

let playCommands = {
    defaults: defaultCommands.commands
}

export default {
    mainMenuCommands,
    mainMenuCommandsDescriptions,
    playCommands
}