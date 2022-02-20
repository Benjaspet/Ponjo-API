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
import ErrorUtil from "../util/ErrorUtil";
import APIUtil from "../util/api/APIUtil";
import Models from "../database/Models";

export default class URLShortenerEndpoint {

    /**
     * Create a shortened URL.
     * @method POST
     * @header Authentication: token
     * @uri /v1/urlshortener/create
     * @param url: <uri-encoded> string
     * @return Promise<Express.Response>
     */

    public static async createShortenedURL(req: Request, res: Response): Promise<Response> {
        const url = req.query.url as string;
        try {
            if (!url) return ErrorUtil.send400Status(req, res);
            const result: any = await Models.ShortURLs.create({full: decodeURIComponent(url)});
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                data: {
                    full: result.full,
                    short: result.short,
                    clicks: result.clicks
                },
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Redirect a user to the specified short URL.
     * @method GET
     * @header none
     * @uri /short/78d5Adv2Aq
     * @return Promise<Express.Response|void>
     */

    public static async getShortenedURL(req: Request, res: Response): Promise<Response|void> {
        const url: string = req.params.shortURL as string;
        try {
            if (!url) return ErrorUtil.send400Status(req, res);
            const shortURL: any = await Models.ShortURLs.findOne({short: url});
            if (!shortURL) return ErrorUtil.send404Response(req, res);
            shortURL.clicks++; shortURL.save();
            return res.redirect(shortURL.full);
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Fetch a list of all shortened URLs.
     * @method GET
     * @header none
     * @uri /v1/urlshortener/all
     * @return Promise<Express.Response>
     */

    public static async getAllShortURLs(req: Request, res: Response): Promise<Response> {
        try {
            let urls: object[] = [];
            const result: any = await Models.ShortURLs.find();
            result.forEach(element => urls.push({
                full: element.full,
                short: element.short,
                clicks: element.clicks
            }));
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                shortURLs: urls,
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}