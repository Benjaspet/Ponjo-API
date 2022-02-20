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
import DatabaseUtil from "../util/DatabaseUtil";

export default class RoboEerieEndpoint {

    /**
     * Get a list of all tags from the RoboEerie bot.
     * @method GET
     * @header Authentication: token
     * @uri /v1/roboeerie/tags?count=2
     * @param count?: int
     * @return Promise<Express.Reponse>
     */

    public static async getTags(req: Request, res: Response): Promise<Response> {
        const count = req.query.count || req.params.count as string;
        try {
            if (count) {
                await DatabaseUtil.fetchTags(parseInt(<string> count))
                    .then(result => {
                        res.status(200).send({
                            status: res.statusCode,
                            message: res.statusMessage,
                            data: result,
                            timestamps: APIUtil.getTimestamps()
                        });
                    });
            } else {
                await DatabaseUtil.fetchTags()
                    .then(result => {
                        res.status(200).send({
                            status: res.statusCode,
                            message: res.statusMessage,
                            data: result,
                            timestamps: APIUtil.getTimestamps()
                        });
                    });
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}