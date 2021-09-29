import {Request, Response} from "express";
import DeckUtil from "../../util/DeckUtil";

export default class PokerRoute {

    public static getPokerHand(req: Request, res: Response) {
        const hand = req.query.hand as string;
        const handArray = hand.split(",");
        try {
            const result = DeckUtil.evaluateHand(handArray);
            return res.status(200).json({
               status: 200,
               hand: {
                   name: result.handName,
                   type: result.handType,
                   rank: result.handRank,
                   value: result.value
               },
               timestamps: {
                   date: new Date().toLocaleString(),
                   unix: Math.round(+ new Date() / 1000),
               }
            });
        } catch (error) {
            console.log(error)
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