import APIUtil from "./api/util/APIUtil";

export default class Logger {

    public static info(message: string = "None specified."): void {
        console.log(`[${APIUtil.getTimestamp()}] [PONJO-API] ${message}`);
    }
}