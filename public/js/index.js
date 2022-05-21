import GETREQ from "./modules/getreq.js";
import InputDisplayController from "./classes/inputDisplayController.js";

let main = () => {
    let inputDisplayController = new InputDisplayController();
    GETREQ.GET("getquest", (data) => {
        console.log(data);
    });
}

main();