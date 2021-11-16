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

import {Request, Response} from "express";
import AuthorizationUtil from "../util/api/AuthorizationUtil";
import ErrorUtil from "../util/ErrorUtil";
import Logger from "../../Logger";
import APIUtil from "../util/api/APIUtil";
import * as Mongoose from "mongoose";

export default class AuthEndpoint {

    /*
     Create an API key and insert it into the database.
     @method POST
     @header none
     @uri /v1/auth/keys/create
     @return Promise<e.Response>
     */

    public static async createKey(req: Request, res: Response): Promise<Response> {
        try {
            const user = req.query.user as string;
            if (!user) {
                return ErrorUtil.send400Status(req, res);
            }
            const key = await AuthorizationUtil.generateUniqueApiKey() as string;
            await AuthorizationUtil.createApiKey(key, user)
                .then(result => {
                    return res.status(200).json({
                        status: 200,
                        data: result.data,
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Returns an array of all API keys.
     @method GET
     @header none
     @uri /v1/auth/keys/list
     @return Promise<any>
     */

    public static async getAllKeys(req: Request, res: Response): Promise<any> {
        await AuthorizationUtil.getAllApiKeys()
            .then(result => {
                return res.status(200).json({
                    status: 200,
                    keys: result,
                    timestamps: APIUtil.getTimestamps()
                });
            })
            .catch(error => {
                Logger.error(error.message);
                return ErrorUtil.sent500Status(req, res);
            });
    }
}