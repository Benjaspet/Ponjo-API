import {Request, Response} from "express";
import SCPScraper from "../../util/SCPScraper";
import AuthorizationUtil from "../../util/AuthorizationUtil";

export default class SCPRoute {

    public static async getScpData(req: Request, res: Response) {
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
            const scp = req.query.scp as string;
            if (!scp) {
                return res.status(500).json({
                    status: res.statusCode,
                    message: "Invalid syntax.",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
            // await SCPScraper.scrapeScp(scp)
            //     .then(result => {
            //         return res.status(200).json({
            //             status: 200,
            //             data: {
            //                 url: `https://www.scpwiki.com/scp-${scp}`,
            //                 scp: result.item,
            //                 class: result.class,
            //                 procedures: result.procedures
            //             },
            //             timestamps: {
            //                 date: new Date().toLocaleString(),
            //                 unix: Math.round(+ new Date() / 1000),
            //             }
            //         });
            //     });
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: res.statusCode,
                message: "That SCP could not be found.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }

}