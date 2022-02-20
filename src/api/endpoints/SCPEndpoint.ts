/*
 * Copyright © 2021 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import {Request, Response} from "express";
import branches from "../data/foundation/Branches";
import SCPScraper from "../util/scp/SCPScraper";
import ErrorUtil from "../util/ErrorUtil";
import SCPTaskForceUtil from "../util/scp/SCPTaskForceUtil";
import SCPFoundationDataUtil from "../util/scp/SCPFoundationDataUtil";
import APIUtil from "../util/api/APIUtil";

export default class SCPEndpoint {

    /**
     * Get data on a specific SCP item.
     * @method GET
     * @header Authentication: token
     * @uri /v1/scp?item=005
     * @param item: string|int
     * @return Promise<Express.Response>
     */

    public static async getScpData(req: Request, res: Response): Promise<Response> {
        const item: string = req.query.item as string;
        try {
            if (!item) {
                return res.status(500).json({
                    status: res.statusCode,
                    message: res.statusMessage,
                    timestamps: APIUtil.getTimestamps()
                });
            }
            await SCPScraper.getScpData(item)
                .then(result => {
                    if (!result) {
                        return res.status(400).json({
                            status: res.statusCode,
                            message: "That SCP could not be found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(200).json({
                            status: res.statusCode,
                            message: res.statusMessage,
                            data: result,
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                });
        } catch (error) {
            ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Get all SCP Foundation branches.
     * @method GET
     * @header Authentication: token
     * @uri /v1/scp/branches
     * @return Promise<Express.Response>
     */

    public static async getFoundationBranches(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json({
                status: 200,
                message: res.statusMessage,
                branches: branches,
                timestamps: APIUtil.getTimestamps()
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
     @return Promise<any>
     */

    /**
     * Get all SCP Foundation task forces.
     * @method GET
     * @header Authentication: token
     * @uri /v1/scp/taskforces
     * @return Promise<any>
     */

    public static async getFoundationTaskForce(req: Request, res: Response): Promise<any> {
        try {
            await SCPTaskForceUtil.getTaskForceData()
                .then(result => {
                    return res.status(200).json({
                        status: res.statusCode,
                        message: res.statusMessage,
                        data: result.data,
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Get all SCP Foundation sites & their category data.
     * @method GET
     * @header Authentication: token
     * @uri /v1/scp/sites
     * @return Promise<Express.Response>
     */

    public static async getFoundationSites(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json({
                status: res.statusCode,
                sites: SCPFoundationDataUtil.getAllSiteData(),
                categories: SCPFoundationDataUtil.getSiteCategories(),
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Get all SCP Foundation personnel.
     * @method GET
     * @header Authentication: token
     * @uri /v1/scp/personnel
     * @return Promise<Express.Response>
     */

    public static async getFoundationPersonnel(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                personnel: SCPFoundationDataUtil.getScpPersonnel(),
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Get all SCP Foundation areas.
     * @method GET
     * @header Authentication: token
     * @uri /v1/scp/areas
     * @return Promise<Express.Response>
     */

    public static async getFoundationAreas(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                areas: SCPFoundationDataUtil.getAllAreaData(),
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Get all SCP Foundation data.
     * @method GET
     * @header Authentication: token
     * @uri /v1/scp/all
     * @return Promise<Express.Response>
     */

    public static async getAllFoundationData(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json({
                status: res.statusCode,
                personnel: SCPFoundationDataUtil.getScpPersonnel(),
                branches: SCPFoundationDataUtil.getAllBranchData(),
                areas: SCPFoundationDataUtil.getAllAreaData(),
                sites: SCPFoundationDataUtil.getAllSiteData(),
                siteCategories: SCPFoundationDataUtil.getSiteCategories(),
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}