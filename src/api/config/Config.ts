import dotenv from "dotenv";

dotenv.config();

export default class Config {

    public static get(key: string): string|undefined {
        return process.env[key];
    }
}