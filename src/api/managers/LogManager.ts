import {Express, Request, Response} from "express";
import APIUtil from "../util/APIUtil";

export default class LogManager {

    public static info(type: string | "CRESCENT-API", message: string | "None specified."): void {
        console.log(`[${APIUtil.getTimestamp()}] [${type}] ${message}`);
    }
}