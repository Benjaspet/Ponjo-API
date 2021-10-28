import {Request, Response} from "express";
import Chance from "chance";

export default class RandomMonthRoute {

    /*
     @uri /v1/random/month
     */

    public static async getRandomMonth(req: Request, res: Response) {
        return res.status(200).json({
            status: 200,
            data: new Chance().month({raw: true}),
            timestamps: {
                date: new Date().toLocaleString(),
                unix: Math.round(+ new Date() / 1000),
            }
        });
    }
}