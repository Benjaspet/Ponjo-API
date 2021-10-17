import {Request, Response} from "express";
import Captcha from "@haileybot/captcha-generator";

export class CaptchaRoute {

    public static async getCaptchaData(req: Request, res: Response) {
        try {
            const captcha = new Captcha();
            return res.status(200).json({
                data: {
                    value: captcha.value,
                    imgData: captcha.dataURL
                },
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        } catch (error) {
            const errorMessage = new Error("An error occurred. Please contact an API developer.");
            if (res.status(403)) {
                return res.status(500).json({
                    status: res.statusCode,
                    message: errorMessage,
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
        }
    }
}