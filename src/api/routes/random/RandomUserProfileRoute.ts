import {Request, Response} from "express";
import RandomUtil from "../../util/RandomUtil";

export default class RandomUserProfileRoute {

    /*
     @uri /v1/random/userprofile?amount=18
     @uri /v1/random/userprofile/5
     */

    public static async sendResponse(req: Request, res: Response) {
        const amount = req.query.amount || req.params.amount as string;
        if (amount) {
            return res.status(200).json({
                status: 200,
                data: RandomUtil.getRandomUserProfile(parseInt(<string>amount)),
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        } else {
            return res.status(200).json({
                status: 200,
                data: RandomUtil.getRandomUserProfile(1),
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }
}