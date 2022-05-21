import express from "express";
import GET from "./server/API/GET/GET.js";

let main = () => {
  const app = express();
  const port = 3000;

  GET.init(app);

  app.use("/", express.static("public"));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main();