import {Request, Response} from "express";
import SCPScraper from "../../util/SCPScraper";
import ErrorUtil from "../../util/ErrorUtil";
import branches from "../../data/foundation/Branches";
import personnel from "../../data/foundation/Personnel";

export default class SCPRoute {

    public static async getScpData(req: Request, res: Response) {
        const item = req.query.item as string;
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
            ErrorUtil.sent500Status(req, res);
        }
    }

    public static async getFoundationPersonnel(req: Request, res: Response) {
        try {
            return res.status(200).json({
                status: 200,
                personell: personnel,
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        } catch (error) {
            ErrorUtil.sent500Status(req, res);
        }
    }

    public static async getFoundationBranches(req: Request, res: Response) {
        try {
            return res.status(200).json({
                status: 200,
                branches: branches,
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        } catch (error) {
            ErrorUtil.sent500Status(req, res);
        }
    }
}