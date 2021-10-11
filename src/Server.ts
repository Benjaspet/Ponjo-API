import express from "express";
import {Application} from "./api/Application";
import * as http from "http";
import LogController from "./api/controllers/LogController";
import SCPScraper from "./api/util/SCPScraper";

const app = express();
new Application(app);

console.clear();
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
   LogController.info("Now running on port 3000.");
});

SCPScraper.getScpData("1017").then(r => console.log(r));