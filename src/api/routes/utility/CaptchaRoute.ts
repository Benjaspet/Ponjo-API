import {Request, Response} from "express";
import Captcha from "@haileybot/captcha-generator";
import ErrorUtil from "../../util/ErrorUtil";

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
            return ErrorUtil.sent500Status(req, res);
        }
    }
}