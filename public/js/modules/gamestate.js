export default {
    states: {
        INIT: 0,
        MAINMENU: 1,
        PLAY: 2,
        BATTLE: 3
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
            step: 1,
            locationID: 0,
            worldID: 0
        },
        attacks: [
            {
                name: "attack",
                damage: 15
            }
        ]
    }
}