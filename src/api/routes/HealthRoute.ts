import {NextFunction, Request, Response} from "express";

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
            return res.status(500).json({
                status: 404,
                message: "An error occurred. Please contact an API developer.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }
}