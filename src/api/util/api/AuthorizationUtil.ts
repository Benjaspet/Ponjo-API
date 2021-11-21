import {v4 as uuidv4} from "uuid";
import Keys from "../../models/Keys";
import APIUtil from "./APIUtil";
import {NextFunction, Request, Response} from "express";

export default class AuthorizationUtil {

    public static async generateUniqueApiKey() {
        return uuidv4();
    }

    public static async isValidApiKey(key: string) {
        return Keys.findOne({key: key})
            .then(async key => {
                return !!key;
            });
    }

    public static async createApiKey(key: string, user: string) {
        return Keys.create({
            key: key,
            user: user,
            requests: 0
        }).then(() => {
            return {
                status: 200,
                message: "New API key created.",
                data: {
                    key: key,
                    user: user,
                    requests: 0
                },
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            }
        });
    }

    public static async getAllApiKeys(): Promise<object[]> {
        const keys: object[] = [];
        return new Promise((resolve, reject) => {
            Keys.find()
                .then(async result => {
                   result.forEach(query => {
                       keys.push(query)
                   });
                    resolve(keys);
                })
                .catch(async error => {
                    reject({
                        status: 500,
                        message: "An error occurred."
                    });
                });
        });
    }

    public static async addApiKeyUse(key: string, amount: number): Promise<void> {
        Keys.findOne({key: key})
            .then(async result => {
                Keys.findOneAndUpdate({key: key}, {requests: result.requests + amount})
                    .then(async result => {})
                    .catch(error => {});
            })
            .catch(error => {});
    }

    public static async checkKeyValidity(req: Request, res: Response, next: NextFunction) {
        const key = req.headers.authorization as string;
        if (await AuthorizationUtil.isValidApiKey(key) == false) {
            return res.status(403).json({
                status: res.statusCode,
                message: "Invalid API key provided.",
                timestamps: APIUtil.getTimestamps()
            });
        }
        await AuthorizationUtil.addApiKeyUse(key, 1);
        next();
    }
}