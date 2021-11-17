/*
 * Copyright 2021 Ben Petrillo. All rights reserved.
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

import {Express, Request, Response} from "express";
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import Router from "./Router";
import ErrorUtil from "./util/ErrorUtil";

export class Application {

    constructor(app: Express) {
        app.use("/v1", Router.v1);
        app.use("/v1", Router.premium);
        app.use("/uploads", Router.hosting);
        app.use(express.static(path.join(__dirname, "/public")));
        app.use(express.static(path.join(__dirname, "/uploads")));
        app.set("trust proxy", "8.8.8.8");
        app.set("trust proxy", 1);
        app.use(express.urlencoded({ extended: false }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.get("/", (req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname + "/public/index.html"));
        });
        app.get("/hosting", (req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname + "/public/hosting.html"));
        });
        app.get("/endpoints", (req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname + "/public/endpoints.html"));
        });
        app.use((req: Request, res: Response) => {
            return ErrorUtil.send404Response(req, res);
        });
    }
}