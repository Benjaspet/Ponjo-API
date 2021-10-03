import {Request, Response} from "express";
import SCPScraper from "../../util/SCPScraper";

export default class SCPRoute {

    public static async getScpData(req: Request, res: Response) {
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
            await SCPScraper.scrapeScp(scp)
                .then(result => {
                    return res.status(200).json({
                        status: 200,
                        data: {
                            url: `https://www.scpwiki.com/scp-${scp}`,
                            scp: result.item,
                            class: result.class,
                            procedures: result.procedures
                        },
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                });
        } catch (error) {
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