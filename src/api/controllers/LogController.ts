import APIUtil from "../util/APIUtil";

export default class LogController {

    public static info(type: string | "CRESCENT-API", message: string | "None specified."): void {
        console.log(`[${APIUtil.getTimestamp()}] [${type}] ${message}`);
    }
}