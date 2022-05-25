//simport dbController from "../modules/dbcontroller.js";

let init = (app) => {
    app.get("/getquest", (req, res) => {
        // TODO: Pass url params into GetQuest
        //sres.send( dbController.GetQuest() );
    });
}

export default {
    init
}