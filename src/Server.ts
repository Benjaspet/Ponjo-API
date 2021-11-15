import express from "express";
import {Application} from "./api/Application";
import * as http from "http";
import Logger from "./Logger";
import Config from "./api/config/Config";

const app = express();
new Application(app);

console.clear();
const server = http.createServer(app);
server.listen(Config.get("PORT") || 3000, () => {
   Logger.info("Connected to Ponjo database.");
   Logger.info("Connected to RoboEerie database.");
   Logger.info("Now running on port 3000.");
});