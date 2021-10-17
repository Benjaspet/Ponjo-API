import affirmations from "../../data/Affirmations";
import {Request, Response} from "express";
import APIUtil from "../../util/APIUtil";
import ErrorUtil from "../../util/ErrorUtil";

export default class AffirmationRoute {

    public static async getAffirmation(req: Request, res: Response): Promise<any> {
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
}