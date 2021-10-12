import {Request, Response} from "express";
import SCPScraper from "../../util/SCPScraper";
import AuthorizationUtil from "../../util/AuthorizationUtil";

export default class SCPRoute {

    public static async getScpData(req: Request, res: Response) {
        const item = req.query.item as string;
        const key = req.headers.authorization as string;
        if (!req.headers.authorization || !await AuthorizationUtil.isValidApiKey(key)) {
            return res.status(403).json({
                status: res.statusCode,
                message: "Invalid API key provided.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
        try {
            if (!item) {
                return res.status(500).json({
                    status: res.statusCode,
                    message: "Invalid syntax.",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
            SCPScraper.getScpData(item)
                .then(result => {
                    if (!result) {
                        return res.status(400).json({
                            status: res.statusCode,
                            message: "That SCP could not be found.",
                            timestamps: {
                                date: new Date().toLocaleString(),
                                unix: Math.round(+ new Date() / 1000),
                            }
                        });
                    } else {
                        return res.status(400).json({
                            status: res.statusCode,
                            data: result,
                            timestamps: {
                                date: new Date().toLocaleString(),
                                unix: Math.round(+ new Date() / 1000),
                            }
                        });
                    }
                });
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: res.statusCode,
                message: "An error ocurred.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }

}