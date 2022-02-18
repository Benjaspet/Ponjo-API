/*
 * Copyright © 2021 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import {Request, Response} from "express";
import DeckUtil from "../util/DeckUtil";
import Deck from "../database/models/Decks";
import APIUtil from "../util/api/APIUtil";
import ErrorUtil from "../util/ErrorUtil";
import Logger from "../../Logger";

export default class DeckEndpoint {

    /**
     * Evaluate a specific poker hand. Hands must have 3, 5, 6, or 7 cards.
     * @method GET
     * @header Authentication: token
     * @uri /v1/decks/evalhand?hand=Ah,As,2c,5d,9h
     * @param hand: string
     * @return Express.Response|any
     */

    public static getPokerHand(req: Request, res: Response): Response|any {
        const hand = req.query.hand as string;
        if (!hand) return ErrorUtil.send400Status(req, res);
        const cards = hand.replace(/\s/g, "").split(",");
        try {
            const result = DeckUtil.evaluateHand(<string[]> cards);
            return res.status(200).json({
               status: res.statusCode,
               hand: {
                   name: result.handName,
                   type: result.handType,
                   rank: result.handRank,
                   value: result.value
               },
               timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            Logger.error(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Create a virtual deck of cards.
     * @method POST
     * @header Authentication: token
     * @uri /v1/decks/create
     * @return Express.Response|any
     */

    public static createDeck(req: Request, res: Response): Response|any {
        try {
            const deck = DeckUtil.createDeck();
            const deckId = APIUtil.generateUniqueId();
            Deck.create({
                deckId: deckId,
                deck: deck,
                data: {
                    shuffled: false,
                    remainingCards: deck.length
                }
            }).then(() => {
                return res.status(200).json({
                    status: res.statusCode,
                    message: res.statusMessage,
                    deckId: deckId,
                    deck: deck,
                    data: {
                        shuffled: false,
                        remainingCards: deck.length
                    },
                    timestamps: APIUtil.getTimestamps()
                });
            }).catch(() => {
                return res.status(400).json({
                    status: res.statusCode,
                    message: res.statusMessage,
                    timestamps: APIUtil.getTimestamps()
                });
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Get a deck of cards by ID.
     * @method GET
     * @header Authentication: token
     * @uri /v1/decks/find?id=b9e1-4a5-68738
     * @param id: string
     * @return Express.Response|any
     */

    public static getDeckById(req: Request, res: Response): Response|any {
        const deckId = req.query.id as string;
        if (!deckId) return ErrorUtil.send400Status(req, res);
        try {
            Deck.findOne({deckId: deckId})
                .then(deck => {
                    if (!deck) {
                        return res.status(400).json({
                            status: res.statusCode,
                            message: "Could not find a deck by that ID.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(200).json({
                            status: res.statusCode,
                            message: res.statusMessage,
                            deckId: deck.deckId,
                            deck: deck.deck,
                            data: deck.data,
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Shuffle a deck by ID.
     * @method PATCH
     * @header Authentication: token
     * @uri /v1/decks/shuffle?id=b9e1-4a5-68738
     * @param id: string
     * @return Promise<Express.Response>
     */

    public static async shuffleDeckById(req: Request, res: Response): Promise<Response> {
        const deckId = req.query.id as string;
        if (!deckId) return ErrorUtil.send400Status(req, res);
        try {
            Deck.findOne({deckId: deckId}, async function (error, deck) {
                if (!deck) {
                    return res.status(400).json({
                        status: res.statusCode,
                        message: "Could not find a deck by that ID.",
                        timestamps: APIUtil.getTimestamps()
                    });
                } else {
                    const shuffledDeck = DeckUtil.shuffleDeck(deck.deck);
                    Deck.findOneAndUpdate({deckId: deckId}, {deck: shuffledDeck, data: {shuffled: true, remainingCards: shuffledDeck.length}}, (error, result) => {
                        if (error) {
                            return res.status(400).json({
                                status: res.statusCode,
                                message: "Could not find a deck by that ID.",
                                timestamps: APIUtil.getTimestamps()
                            });
                        } else {
                            return res.status(200).json({
                                status: 200,
                                message: res.statusMessage,
                                deckId: deckId,
                                deck: shuffledDeck,
                                data: {
                                    shuffled: true,
                                    remainingCards: deck.deck.length
                                },
                                timestamps: APIUtil.getTimestamps()
                            });
                        }
                    });
                }
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Draw a specified number of cards from a deck.
     * @method PATCH
     * @header Authentication: token
     * @uri /v1/decks/draw?id=b9e1-4a5-68738&count=4
     * @param id: string
     * @param count: int
     * @return Promise<Express.Response>
     */

    public static async drawCards(req: Request, res: Response): Promise<Response> {
        const deckId = req.query.id as string;
        const count = req.query.count as string;
        if (!deckId) return ErrorUtil.send400Status(req, res);
        try {
            Deck.findOne({deckId: deckId}, async function (error, deck) {
                if (!deck) {
                    return res.status(400).json({
                        status: res.statusCode,
                        message: "Invalid deck ID.",
                        timestamps: APIUtil.getTimestamps()
                    });
                } else if (!count) {
                    return ErrorUtil.send400Status(req, res);
                } else {
                    if (deck.deck.length < parseInt(count)) {
                        return res.status(500).json({
                            status: res.statusCode,
                            message: "There are not that many cards left in the deck.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                    const drawn = DeckUtil.drawCard(deck.deck, parseInt(count));
                    Deck.findOneAndUpdate({deckId: deckId}, {deck: drawn.updatedDeck, data: {shuffled: deck.data.shuffled, remainingCards: drawn.remainingCards}}, async function (error, deck) {
                        if (!deck) {
                            return res.status(400).json({
                                status: res.statusCode,
                                message: "Could not find a deck by that ID.",
                                timestamps: APIUtil.getTimestamps()
                            });
                        } else {
                            return res.status(200).json({
                                status: res.statusCode,
                                deckId: deckId,
                                deck: drawn.updatedDeck,
                                data: {
                                    shuffled: deck.shuffled,
                                    remainingCards: drawn.remainingCards,
                                    drawnCards: drawn.cardsDrawn,
                                    amountDrawn: drawn.amountDrawn
                                },
                                timestamps: APIUtil.getTimestamps()
                            });
                        }
                    });
                }
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Reset a deck to its original state.
     * @method POST
     * @header Authentication: token
     * @uri /v1/decks/reset?id=b9e1-4a5-68738
     * @param id: string
     * @return Promise<Express.Response>
     */

    public static async resetDeck(req: Request, res: Response): Promise<Response> {
        const deckId = req.query.id as string;
        if (!deckId) return ErrorUtil.send400Status(req, res);
        try {
            Deck.findOneAndUpdate({deckId: deckId}, {deck: DeckUtil.createDeck(), data: {shuffled: false, remainingCards: 52}}, async function (error, deck) {
                if (!deck) {
                    return res.status(400).json({
                        status: res.statusCode,
                        message: "Could not find a deck by that ID.",
                        timestamps: APIUtil.getTimestamps()
                    });
                } else {
                    return res.status(200).json({
                        status: res.statusCode,
                        message: res.statusMessage,
                        deckId: deckId,
                        deck: DeckUtil.createDeck(),
                        data: {
                            shuffled: false,
                            remainingCards: deck.data.remainingCards
                        },
                        timestamps: APIUtil.getTimestamps()
                    });
                }
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }
}