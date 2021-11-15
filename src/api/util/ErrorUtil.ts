import {Request, Response} from "express";
import APIUtil from "./api/APIUtil";

export default class ErrorUtil {

    /*
     Send a 400 HTTP status code.
     @desc malformed request or invalid syntax.
     @return Express.Response
     */

    public static async send400Status(req: Request, res: Response) {
        return res.status(400).json({
            status: res.statusCode,
            message: "Invalid syntax provided.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    /*
     Send a 404 HTTP status code.
     @desc resource could not be found on server.
     @return Express.Response
     */

    public static send404Response(req: Request, res: Response) {
        return res.status(404).json({
            status: res.statusCode,
            message: "The requested URL was not found on our servers.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    public static send429Response(req: Request, res: Response) {
        return res.status(429).json({
            status: res.statusCode,
            message: "Too many requests. Try again later.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    public static sent500Status(req: Request, res: Response) {
        return res.status(500).json({
            status: res.statusCode,
            message: "An error occurred. Please contact an API developer.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    public static sent504Status(req: Request, res: Response) {
        return res.status(504).json({
            status: res.statusCode,
            message: "Query timed out.",
            timestamps: APIUtil.getTimestamps()
        });
    }
}