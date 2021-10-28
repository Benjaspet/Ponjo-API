import {Request} from "express";
import {Response} from "express";
import RandomUtil from "../../util/RandomUtil";

export default class RandomTimezoneRoute {

    /*
     @uri /v1/random/timezone?amount=6
     @uri /v1/random/timezone/3
     */

    public static async getRandomTimezone(req: Request, res: Response) {
        const amount = req.query.amount || req.params.amount as string;
        if (amount) {
            return res.status(200).json({
                status: 200,
                data: RandomUtil.getRandomTimezone(parseInt(<string>amount)),
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        } else {
            return res.status(200).json({
                status: 200,
                data: RandomUtil.getRandomTimezone(1),
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000)
                }
            });
        }
    }
}