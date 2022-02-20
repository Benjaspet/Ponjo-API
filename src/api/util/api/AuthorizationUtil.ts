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

import {NextFunction, Request, Response} from "express";
import {CreatedAPIKey} from "../../structs/APIResponses";
import * as uuid from "uuid";
import APIUtil from "./APIUtil";
import Models from "../../database/Models";

export default class AuthorizationUtil {

    public static generateUniqueApiKey(): string {
        return uuid.v4();
    }

    public static isValidApiKey(key: string): boolean {
        return uuid.validate(key);
    }

    public static async createAPIKey(apiKey: string, user: string): Promise<CreatedAPIKey> {
        return new Promise(async (resolve, reject) => {
            try {
                const result: any = await Models.Keys.create(
                    {
                        key: apiKey,
                        user: user,
                        requests: 0
                    }
                );
                if (result) {
                    resolve({
                        key: result.key,
                        user: result.user,
                        requests: result.requests
                    });
                } else reject();
            } catch (error: any) {
                reject(error);
            }
        });
    }

    public static async addApiKeyUse(apiKey: string): Promise<void> {
        try {
            const result: any = await Models.Keys.findOne({key: apiKey});
            result.requests++;
            result.save();
        } catch (error: any) {}
    }


    /**
     * The middleware to check API key validity.
     * @param req Express.Request
     * @param res Express.Response
     * @param next Express.NextFunction
     */

    public static async checkKeyValidity(req: Request, res: Response, next: NextFunction): Promise<Response|void> {
        const key: string = req.headers.authorization as string;
        if (AuthorizationUtil.isValidApiKey(key) == false) {
            return res.status(403).json({
                status: res.statusCode,
                message: "Invalid API key provided.",
                timestamps: APIUtil.getTimestamps()
            });
        }
        await AuthorizationUtil.addApiKeyUse(key);
        next();
    }
}