export default class ResponseUtil {

    public static getTimestamps(): object {
        return {
            date: new Date().toLocaleString(),
            unix: Math.round(+ new Date() / 1000)
        }
    }
}