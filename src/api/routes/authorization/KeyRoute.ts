import {Request, Response} from "express";
import AuthorizationUtil from "../../util/AuthorizationUtil";

export default class KeyRoute {

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
            return res.status(500).json({
                status: 404,
                message: "An error occurred. Please contact an API developer.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }
}