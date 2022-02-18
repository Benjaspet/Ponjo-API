/*
 * Copyright 2022 Ben Petrillo. All rights reserved.
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

import {NextFunction, Request, Response} from "express";
import Requests from "./database/models/Requests";
import Images from "./database/models/Images";

export default class Middleware {

    /**
     * The middleware that handles all API requests.
     * @param req Express.Request
     * @param res Express.Response
     * @param next Express.NextFunction
     * @return Promise<void>
     */

    public static async requestMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        switch (req.originalUrl) {
            case "/": case "/hosting": case "/endpoints": case "/uploads": case "/image-hosting":
                next(); break;
            default:
                const current = await Requests.findOne();
                if (!current) {
                    await Requests.create({total: 0, gets: 0, posts: 0});
                    next();
                } else {
                    current.total++;
                    if (req.method == "GET") current.gets++;
                    else if (req.method == "POST") current.posts++;
                    current.save();
                    next();
                }
        }
    }

    /**
     * The middleware that handles uploaded image rendering.
     * @param req Express.Request
     * @param res Express.Response
     * @param next Express.NextFunction
     * @return Promise<Response|void>
     */

    public static async imageHostingMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        const images = await Images.find();
        return res.render("image-hosting", {images: images});
    }
}