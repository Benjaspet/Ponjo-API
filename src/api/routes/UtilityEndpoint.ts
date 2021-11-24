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
import MathUtil from "../util/MathUtil";
import ErrorUtil from "../util/ErrorUtil";
import APIUtil from "../util/api/APIUtil";

export default class UtilityEndpoint {

    /*
     Check if a number is prime or not.
     @method GET
     @header none
     @uri /v1/prime
     @param number: int
     @return Promise<Express.Response>
     */

    public static async checkIfNumberIsPrime(req: Request, res: Response): Promise<Response> {
        const number = req.query.number ? req.query.number : req.params.number as any;
        try {
            if (!number) return ErrorUtil.send400Status(req, res);
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                data: {
                    number: parseInt(number),
                    isPrime: MathUtil.isPrime(parseInt(number))
                },
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}
