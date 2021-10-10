import {Request, Response} from "express";
import DeckUtil from "../../util/DeckUtil";
import Deck from "../../models/Decks";
import APIUtil from "../../util/APIUtil";

export default class DeckRoute {

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

    public static createDeck(req: Request, res: Response) {
        const deck = DeckUtil.createDeck();
        const deckId = APIUtil.generateUniqueId();
        try {
            Deck.create({
                deck: deck,
                deckId: deckId,
            }).then(() => {
                return res.status(200).json({
                    status: 200,
                    deck: deck,
                    deckId: deckId,
                    expires: 86400,
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }).catch(() => {
                return res.status(400).json({
                    status: 400,
                    message: "Could not create a deck.",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "An error occurred. Please contact an API developer.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }

    public static getDeckById(req: Request, res: Response) {
        const deckId = req.query.id as string;
        if (!deckId) {
            return res.status(400).json({
                status: 400,
                message: "Invalid parameters provided.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
        try {
            Deck.findOne({deckId: deckId})
                .then(deck => {
                    if (!deck) {
                        return res.status(400).json({
                            status: 400,
                            message: "Could not find a deck by that ID.",
                            timestamps: {
                                date: new Date().toLocaleString(),
                                unix: Math.round(+ new Date() / 1000),
                            }
                        });
                    }
                    return res.status(200).json(deck);
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "Could not find a deck by that ID.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }

    public static async shuffleDeckById(req: Request, res: Response) {
        const deckId = req.query.id as string;
        if (!deckId) {
            return res.status(400).json({
                status: 400,
                message: "Invalid parameters provided.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+new Date() / 1000),
                }
            });
        }
        try {
            Deck.findOne({deckId: deckId}, async function (error, deck) {
                if (!deck) {
                    return res.status(400).json({
                        status: 400,
                        message: "Could not find a deck by that ID.",
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+new Date() / 1000),
                        }
                    });
                }
                const shuffledDeck = DeckUtil.shuffleDeck(deck.deck);
                Deck.findOneAndUpdate({deckId: deckId}, {deck: shuffledDeck}, (error, result) => {
                    if (error) {
                        return res.status(400).json({
                            status: 400,
                            message: "Could not find a deck by that ID.",
                            timestamps: {
                                date: new Date().toLocaleString(),
                                unix: Math.round(+new Date() / 1000),
                            }
                        });
                    } else {
                        return res.status(200).json({
                            status: 200,
                            deckId: deckId,
                            deck: shuffledDeck
                        });
                    }
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "Could not find a deck by that ID.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+new Date() / 1000),
                }
            });
        }
    }
}