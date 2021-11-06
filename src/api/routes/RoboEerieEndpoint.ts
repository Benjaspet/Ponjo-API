import {Request, Response} from "express";
import ErrorUtil from "../util/ErrorUtil";
import RoboEerieUtil from "../util/RoboEerieUtil";
import ResponseUtil from "../util/api/ResponseUtil";

export default class RoboEerieEndpoint {

    public static async getTags(req: Request, res: Response) {
        const count = req.query.count || req.params.count as string;
        try {
            if (count) {
                await RoboEerieUtil.fetchTags(parseInt(<string> count))
                    .then(result => {
                        res.status(200).send({
                            status: res.statusCode,
                            data: result,
                            timestamps: ResponseUtil.getTimestamps()
                        });
                    });
            } else {
                await RoboEerieUtil.fetchTags()
                    .then(result => {
                        res.status(200).send({
                            status: res.statusCode,
                            data: result,
                            timestamps: ResponseUtil.getTimestamps()
                        });
                    });
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}