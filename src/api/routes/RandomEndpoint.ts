import {Request, Response} from "express";
import Chance from "chance";
import affirmations from "../data/Affirmations";
import RandomUtil from "../util/RandomUtil";
import APIUtil from "../util/api/APIUtil";
import ErrorUtil from "../util/ErrorUtil";

export default class RandomEndpoint {

    /*
     The route to obtain a random timezone.
     @method GET
     @header Authentication: token
     @uri /v1/random/timezone?amount=6
     @uri /v1/random/timezone/3
     @param amount: int
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

    /*
     The route to return a random user profile.
     @method GET
     @header Authentication: token
     @uri /v1/random/userprofile?amount=18
     @uri /v1/random/userprofile/5
     @param amount: int
     */

    public static async getRandomUserProfile(req: Request, res: Response) {
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
    
    /*
     The route to obtain a random affirmation.
     @method GET
     @header Authentication: token
     @uri /v1/affirmations?count=12
     @uri /v1/affirmations/12
     @param count: int
     */

    public static async getRandomAffirmation(req: Request, res: Response): Promise<any> {
        try {
            const count = req.query.count as string || req.params.count;
            if (!count) {
                return res.status(400).json({
                    status: 200,
                    affirmation: affirmations[Math.floor(Math.random() * affirmations.length + 1)],
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            } else {
                if (parseInt(count) > 100) {
                    return res.status(500).json({
                        status: res.statusCode,
                        message: "Count too high; must be from 1-100.",
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                }
                if (count) {
                    const shuffled = APIUtil.shuffleArray(affirmations);
                    const items = APIUtil.getMultipleElementsFromArray(shuffled, parseInt(count));
                    return res.status(400).json({
                        status: 200,
                        affirmations: items,
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                }
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Returns a random month.
     @method GET
     @header none
     @uri /v1/random/month/raw
     @uri /v1/random/month?raw=true
     @param raw: boolean
     */

    public static async getRandomMonth(req: Request, res: Response) {
        const raw = req.query.raw || req.params.raw as string|boolean;
        try {
            if (raw === "raw" || raw == true) {
                return res.status(200).json({
                    status: 200,
                    data: new Chance().month({raw: true}),
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    data: new Chance().month({raw: false}),
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}