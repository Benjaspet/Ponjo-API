import APIUtil from "../util/APIUtil";

export default class LogController {

    public static info(message: string = "None specified."): void {
        console.log(`[${APIUtil.getTimestamp()}] [PONJO-API] ${message}`);
    }
}