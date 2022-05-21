import config from "../config.js";

let GET = (endpoint, callback) => {
    console.log("end", endpoint);
    fetch(`${config.server.restURL}/${endpoint}`)
    .then(response => response.json())
    .then(data => {
        callback(data)
    })
    .catch(err => {
        callback(err);
    });
}

export default {
    GET
}