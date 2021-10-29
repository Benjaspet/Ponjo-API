import express from "express";
import {Application} from "./api/Application";
import * as http from "http";
import LogController from "./api/controllers/LogController";

const app = express();
new Application(app);

console.clear();
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
   LogController.info("Now running on port 3000.");
});