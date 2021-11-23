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

import {Express, NextFunction, Request, Response} from "express";
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import Router from "./Router";
import ErrorUtil from "./util/ErrorUtil";
import URLShortenerEndpoint from "./routes/URLShortenerEndpoint";
import Images from "./models/Images";
import Requests from "./models/Requests";
import Logger from "../Logger";
import APIUtil from "./util/api/APIUtil";
import Keys from "./models/Keys";
import RoboEerieUtil from "./util/RoboEerieUtil";

export class Application {

    constructor(app: Express) {
        this.init(app);
    }

    private init(app: Express) {

        /*
         Setting up the view engine and our public static directories.
         */

        app.use(express.static(path.join(__dirname, "/public")));
        app.use(express.static(path.join(__dirname, "/uploads")));
        app.set("view engine", "ejs");
        app.set("views", __dirname + "/views");

        /*
         Handling the NGINX reverse proxy to accept all requests originating
         from the Google DNS.
         */

        app.set("trust proxy", "8.8.8.8");
        app.set("trust proxy", 1);

        /*
         URL encoding and other configuration settings.
         */

        app.use(express.urlencoded({extended: false}));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(this.requestMiddleware);

        /*
         Setting our base endpoints and their callbacks.
         */

        app.get("/", async (req: Request, res: Response) => {return res.render("index", {requests: await APIUtil.getTotalApiRequests(), keys: await Keys.find()})});
        app.get("/hosting", (req: Request, res: Response) => {return res.render("hosting")});
        app.get("/roboeerie", async (req: Request, res: Response) => {return res.render("roboeerie", {tags: await RoboEerieUtil.fetchTags()})});
        app.get("/image-hosting", this.imageHostingMiddleware);
        app.get("/endpoints", (req: Request, res: Response) => {return res.render("endpoints")});
        app.get("/short/:shortURL", URLShortenerEndpoint.getShortenedURL);

        /*
         Initialize the routers.
         */

        app.use("/v1", Router.v1);
        app.use("/v1", Router.premium);
        app.use("/uploads", Router.hosting);

        /*
         FINAL: DEFAULT HTTP ERROR CALLBACKS BELOW.
         Only run if all above methods fail or cannot be found.
         */

        app.use((req: Request, res: Response) => {return ErrorUtil.send404Response(req, res);});
    }

    private async requestMiddleware(req: Request, res: Response, next: NextFunction) {
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

    private async imageHostingMiddleware(req: Request, res: Response, next: NextFunction) {
        const images = await Images.find();
        return res.render("uploads", {images: images});
    }
}