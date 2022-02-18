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
import Chance from "chance";
import affirmations from "../data/Affirmations";
import RandomUtil from "../util/RandomUtil";
import APIUtil from "../util/api/APIUtil";
import ErrorUtil from "../util/ErrorUtil";

export default class RandomEndpoint {

    /**
     * The route to obtain a random timezone.
     * @method GET
     * @header Authentication: token
     * @uri /v1/random/timezone?amount=6
     * @uri /v1/random/timezone/3
     * @param amount?: int
     * @return Promise<Express.Reponse>
     */

    public static async getRandomTimezone(req: Request, res: Response): Promise<Response> {
        const amount = req.query.count || req.params.count as string;
        if (amount) {
            return res.status(200).json({
                status: 200,
                message: res.statusMessage,
                data: RandomUtil.getRandomTimezone(parseInt(<string>amount) || 1),
                timestamps: APIUtil.getTimestamps()
            });
        } else {
            return res.status(200).json({
                status: 200,
                data: RandomUtil.getRandomTimezone(1),
                timestamps: APIUtil.getTimestamps()
            });
        }
    }

    /**
     * The route to return a random user profile.
     * @method GET
     * @header Authentication: token
     * @uri /v1/random/userprofile?amount=18
     * @uri /v1/random/userprofile/5
     * @param amount?: int
     * @return Promise<Express.Reponse>
     */

    public static async getRandomUserProfile(req: Request, res: Response): Promise<Response> {
        const amount = req.query.count || req.params.count as string;
        if (amount) {
            return res.status(200).json({
                status: 200,
                message: res.statusMessage,
                data: RandomUtil.getRandomUserProfile(parseInt(<string>amount) || 1),
                timestamps: APIUtil.getTimestamps()
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: res.statusMessage,
                data: RandomUtil.getRandomUserProfile(1),
                timestamps: APIUtil.getTimestamps()
            });
        }
    }

    /**
     * The route to obtain a random affirmation.
     * @method GET
     * @header Authentication: token
     * @uri /v1/affirmations?count=12
     * @uri /v1/affirmations/12
     * @param count: int
     * @return Promise<Express.Reponse>
     */

    public static async getRandomAffirmation(req: Request, res: Response): Promise<Response> {
        try {
            const count = req.query.count as string || req.params.count;
            if (!count) {
                return res.status(400).json({
                    status: 200,
                    message: res.statusMessage,
                    affirmation: affirmations[Math.floor(Math.random() * affirmations.length + 1)],
                    timestamps: APIUtil.getTimestamps()
                });
            } else {
                if (parseInt(count) > 100) {
                    return res.status(500).json({
                        status: res.statusCode,
                        message: "Count too high; must be from 1-100.",
                        timestamps: APIUtil.getTimestamps()
                    });
                }
                if (count) {
                    const shuffled = APIUtil.shuffleArray(affirmations);
                    const items = APIUtil.getMultipleElementsFromArray(shuffled, parseInt(count));
                    return res.status(400).json({
                        status: 200,
                        message: res.statusMessage,
                        affirmations: items,
                        timestamps: APIUtil.getTimestamps()
                    });
                }
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Returns a random month.
     * @method GET
     * @header none
     * @uri /v1/random/month/raw
     * @uri /v1/random/month?raw=true
     * @param raw: boolean
     * @return Promise<Express.Response>
     */

    public static async getRandomMonth(req: Request, res: Response): Promise<Response> {
        const raw = req.query.raw || req.params.raw as string|boolean;
        try {
            if (raw === "raw" || raw == true) {
                return res.status(200).json({
                    status: 200,
                    message: res.statusMessage,
                    data: new Chance().month({raw: true}),
                    timestamps: APIUtil.getTimestamps()
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    message: res.statusMessage,
                    data: new Chance().month({raw: false}),
                    timestamps: APIUtil.getTimestamps()
                });
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}