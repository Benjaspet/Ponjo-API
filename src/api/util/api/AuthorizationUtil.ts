import {v4 as uuidv4} from "uuid";
import Keys from "../../models/Keys";

export default class AuthorizationUtil {

    public static async generateUniqueApiKey() {
        const options = {
            random: [
                0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
                0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
            ],
        }
        return uuidv4(options);
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
            user: user
        }).then(() => {
            return {
                status: 200,
                message: "New API key created.",
                data: {
                    key: key,
                    user: user
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
                    })
                });
        });
    }
}