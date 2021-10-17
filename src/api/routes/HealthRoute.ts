import {NextFunction, Request, Response} from "express";
import ErrorUtil from "../util/ErrorUtil";

export default class HealthRoute {

    public static fetchApiHealth(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json({
                status: res.statusCode,
                message: "API health check succeeded.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}