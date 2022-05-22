export default {
    states: {
        INIT: 0,
        MAINMENU: 1,
        PLAY: 2
    },
    state: null,
    player: {
        username: "",
        health: 100,
        maxHealth: 100,
        level: 1,
        currentEXP: 0,
        maxEXP: 100,
        progress: {
            currentStoryID: 1,
            step: 1
        }
    }
}