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
import * as uuid from "uuid";
import APIUtil from "./APIUtil";
import {CreatedAPIKey} from "../../structs/APIResponses";
import DatabaseManager from "../../database/DatabaseManager";
import {PonjoKey} from "../../structs/database/PonjoKey";
import {Document} from "mongodb";
import {OptionalId} from "mongodb";

export default class AuthorizationUtil {

    /**
     * Generate a unique API key.
     * @return string
     */

    public static generateUniqueApiKey(): string {
        return uuid.v4();
    }

    /**
     * Determine if an API key is valid.
     * @param key The API key.
     * @return boolean
     */

    public static isValidApiKey(key: string): boolean {
        return uuid.validate(key);
    }

    /**
     * Create an API key.
     * @param key The key to create.
     * @param user The name of the user to which the key belongs.
     * @return Promise<any>
     */

    public static async createApiKey(apiKey: string, user: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const document: OptionalId<Document> = {
                key: apiKey,
                user: user,
                requests: 0,
                timestamps: {
                    created: new Date().getTime().toLocaleString(),
                    lastUpdated: new Date().getTime().toLocaleString()
                }
            };
            const promise = await DatabaseManager.getAPIKeyCollection().insertOne(document as any);
            if (!promise) reject();
            resolve(promise)
        });
    }

    /**
     * Get a collection of all API keys.
     * @return Promise<any[]>
     */

    public static async getAllApiKeys(): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const promise = await DatabaseManager.getAPIKeyCollection().find({}).toArray();
                if (!promise) reject();
                resolve(promise);
            } catch (error: any) {
                reject(error);
            }
        });
    }

    /**
     * Add a use to the specified API key.
     * @param key string
     * @return Promise<void>
     */

    public static async addApiKeyUse(key: string): Promise<void> {
        try {
            const data = await Keys.findOne({key: key});
            data.request++;
            data.save();
        } catch ({}) {}
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