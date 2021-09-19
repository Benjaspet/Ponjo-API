import mongoose from "mongoose";
import config from "../config/Config";

export default class APIUtil {

    public static getTimestamp(): string {
        return new Date().toLocaleTimeString();
    }

    public static generateUniqueId(): string {
        return "yxxx-4xx-xxxxxx".replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static connectToDatabase(): void {
        mongoose.connect(config.mongoUri, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

}