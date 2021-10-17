import {NextFunction, Request, Response} from "express";

export default class ErrorUtil {

    public static async send400Status(req: Request, res: Response) {

    }

    public static sent500Status(req: Request, res: Response) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred. Please contact an API developer.",
            timestamps: {
                date: new Date().toLocaleString(),
                unix: Math.round(+new Date() / 1000),
            }
        });
    }

    public static sent504Status(req: Request, res: Response) {
        return res.status(504).json({
            status: 504,
            message: "Query timed out.",
            timestamps: {
                date: new Date().toLocaleString(),
                unix: Math.round(+new Date() / 1000),
            }
        });
    }
}