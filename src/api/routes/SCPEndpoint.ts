import {Request, Response} from "express";
import SCPScraper from "../util/scp/SCPScraper";
import ErrorUtil from "../util/ErrorUtil";
import branches from "../data/foundation/Branches";
import personnel from "../data/foundation/Personnel";
import SCPTaskForceUtil from "../util/scp/SCPTaskForceUtil";
import sites from "../data/foundation/Sites";
import ResponseUtil from "../util/api/ResponseUtil";
import SCPFoundationDataUtil from "../util/scp/SCPFoundationDataUtil";

export default class SCPEndpoint {

    /*
     Get data on a specific SCP item.
     @method GET
     @header Authentication: token
     @uri /v1/scp?item=005
     @param item: string | int
     */

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

    /*
     Get all SCP Foundation branches.
     @method GET
     @header Authentication: token
     @uri /v1/scp/branches
     */

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

    /*
     Get all SCP Foundation task forces.
     @method GET
     @header Authentication: token
     @uri /v1/scp/taskforces
     */

    public static async getFoundationTaskForce(req: Request, res: Response) {
        try {
            await SCPTaskForceUtil.getTaskForceData()
                .then(result => {
                    return res.status(200).json({
                        status: 200,
                        data: result.data,
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                });
        } catch (error) {
            ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Get all SCP Foundation sites & their category data.
     @method GET
     @header Authentication: token
     @uri /v1/scp/sites
     */

    public static async getFoundationSites(req: Request, res: Response) {
        try {
            return res.status(200).json({
                status: res.statusCode,
                sites: SCPFoundationDataUtil.getAllSiteData(),
                categories: SCPFoundationDataUtil.getSiteCategories(),
                timestamps: ResponseUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Get all SCP Foundation personnel.
     @method GET
     @header Authentication: token
     @uri /v1/scp/personnel
     */

    public static async getFoundationPersonnel(req: Request, res: Response) {
        try {
            return res.status(200).json({
                status: res.statusCode,
                personnel: SCPFoundationDataUtil.getScpPersonnel(),
                timestamps: ResponseUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Get all SCP Foundation areas.
     @method GET
     @header Authentication: token
     @uri /v1/scp/areas
     */

    public static async getFoundationAreas(req: Request, res: Response) {
        try {
            return res.status(200).json({
                status: res.statusCode,
                areas: SCPFoundationDataUtil.getAllAreaData(),
                timestamps: ResponseUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Get all SCP Foundation data.
     @method GET
     @header Authentication: token
     @uri /v1/scp/all
     */

    public static async getAllFoundationData(req: Request, res: Response) {
        try {
            return res.status(200).json({
                status: res.statusCode,
                personnel: SCPFoundationDataUtil.getScpPersonnel(),
                branches: SCPFoundationDataUtil.getAllBranchData(),
                areas: SCPFoundationDataUtil.getAllAreaData(),
                sites: SCPFoundationDataUtil.getAllSiteData(),
                siteCategories: SCPFoundationDataUtil.getSiteCategories(),
                timestamps: ResponseUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}