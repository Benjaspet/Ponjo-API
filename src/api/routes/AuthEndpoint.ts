import {Request, Response} from "express";
import AuthorizationUtil from "../util/api/AuthorizationUtil";
import ErrorUtil from "../util/ErrorUtil";
import Logger from "../../Logger";
import APIUtil from "../util/api/APIUtil";

export default class AuthEndpoint {

    /*
     Create an API key and insert it into the database.
     @method POST
     @header none
     @uri /v1/auth/keys/create
     */

    public static async createKey(req: Request, res: Response) {
        try {
            const user = req.query.user as string;
            if (!user) {
                return ErrorUtil.send400Status(req, res);
            }
            const key = await AuthorizationUtil.generateUniqueApiKey() as string;
            await AuthorizationUtil.createApiKey(key, user)
                .then(result => {
                    return res.status(200).json({
                        status: 200,
                        data: result.data,
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Returns an array of all API keys.
     @method GET
     @header none
     @uri /v1/auth/keys/list
     */

    public static async getAllKeys(req: Request, res: Response) {
        await AuthorizationUtil.getAllApiKeys()
            .then(result => {
                return res.status(200).json({
                    status: 200,
                    keys: result,
                    timestamps: APIUtil.getTimestamps()
                });
            })
            .catch(error => {
                Logger.error(error.message);
                return ErrorUtil.sent500Status(req, res);
            });
    }
}