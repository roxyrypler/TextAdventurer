//import spawn from "./spawn.js";

let paths = [
    {
        id: 1,
        hook: "north"
        //obj: imported north object location
    },
    {
        id: 1,
        hook: "south",
        //obj: spawn
    }
]

let location = {
    id: 0,
    title: "Dev World - Barren road",
    paths,
    description: [
        {
            text: "You are located in a barren road"
        },
        {
            text: "you stand on a a abandoned road, there are paths to: ",
            choices: {
                north: null,
                south: null
            }
        }
    ]
}



export default {
    location
}