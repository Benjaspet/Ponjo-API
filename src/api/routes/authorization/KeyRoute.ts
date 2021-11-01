import {Request, Response} from "express";
import AuthorizationUtil from "../../util/AuthorizationUtil";
import ErrorUtil from "../../util/ErrorUtil";

export default class KeyRoute {

    /*
     The endpoint listener to create an API key and insert it
     into the database.
     */

    public static async createKey(req: Request, res: Response) {
        try {
            const user = req.query.user as string;
            if (!user) {
                return res.status(500).json({
                    status: res.statusCode,
                    message: "Invalid syntax.",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
            const key = await AuthorizationUtil.generateUniqueApiKey() as string;
            await AuthorizationUtil.createApiKey(key, user)
                .then(result => {
                    return res.status(200).json({
                        status: 200,
                        data: result.data,
                        timestamps: result.timestamps
                    });
                });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     The endpoint listener to return an array of all API keys.
     */

    public static async getAllKeys(req: Request, res: Response) {
        await AuthorizationUtil.getAllApiKeys()
            .then(result => {
                return res.status(200).json({
                    status: 200,
                    keys: result,
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            })
            .catch(error => {
                return res.status(500).json({
                    status: 500,
                    message: error.message,
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            });
    }
}