export default class APIUtil {

    public static getTimestamp(): string {
        return new Date().toLocaleTimeString();
    }

}