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

    public static async sleep(ms): Promise<any> {
        new Promise(res => setTimeout(res, ms));
    }

    public static getMultipleElementsFromArray(array: string[], amount: number) {
        return array.slice(0, amount)
    }

    public static shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }

}