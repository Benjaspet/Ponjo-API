import express from "express";
import {AppController} from "./api/controllers/AppController";
import * as http from "http";
import LogController from "./api/controllers/LogController";

const app = express();
new AppController(app);

console.clear();
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
   LogController.info("CRESCENT-API", "Now running on port 3000.");
});