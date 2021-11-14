import {Request, Response} from "express";

export default class ErrorUtil {

    public static async send400Status(req: Request, res: Response) {
        return res.status(400).json({
            status: res.statusCode,
            message: "Invalid syntax provided.",
            timestamps: {
                date: new Date().toLocaleString(),
                unix: Math.round(+ new Date() / 1000),
            }
        });
    }

    public static send404Response(req: Request, res: Response) {
        return res.status(404).json({
            status: 404,
            message: "The requested URL was not found on our servers.",
            timestamps: {
                date: new Date().toLocaleString(),
                unix: Math.round(+ new Date() / 1000),
            }
        });
    }

    public static send429Response(req: Request, res: Response) {
        return res.status(429).json({
            status: 429,
            message: "Too many requests. Try again later.",
            timestamps: {
                date: new Date().toLocaleString(),
                unix: Math.round(+ new Date() / 1000)
            }
        });
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