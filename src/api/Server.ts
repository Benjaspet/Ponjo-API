import express from "express";
import {AppController} from "./controllers/AppController";
import * as http from "http";
import LogManager from "./managers/LogManager";

const app = express();
new AppController(app);

console.clear();
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
   LogManager.info("CRESCENT-API", "Now running on port 3000.");
});