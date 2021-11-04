import express from "express";
import {Application} from "./api/Application";
import * as http from "http";
import APIUtil from "./api/util/api/APIUtil";
import Logger from "./Logger";

const app = express();
new Application(app);
APIUtil.connectToDatabase();

console.clear();
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
   Logger.info("Now running on port 3000.");
});