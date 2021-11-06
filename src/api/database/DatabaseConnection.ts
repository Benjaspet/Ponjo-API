import mongoose from "mongoose";
import * as environment from "dotenv";
import Logger from "../../Logger";

environment.config();

export default class DatabaseConnection {

    public ponjoDatabase;
    public roboEerieDatabase;

    constructor() {
        this.ponjoDatabase = mongoose.createConnection(process.env["PONJOAPI-URI"], {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.roboEerieDatabase = this.ponjoDatabase.useDb("RoboEerie");
    }
}