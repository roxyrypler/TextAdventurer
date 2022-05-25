//import road from "./roadroad.js";
import index from "./devworldindex.js"

let paths = [
    {
        id: 1,
        hook: "north",
        obj: index
    }
]

let location = {
    id: 0,
    title: "Dev World - Spawn",
    paths,
    description: [
        {
            text: "You are located in spawn"
        },
        {
            text: "you stand on a crossroads, with paths leading: ",
            choices: {
                north: null
            }
        }
    ]
}

export default {
    location
}