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
import APIUtil from "./api/APIUtil";

export default class ErrorUtil {

    /*
     Send a 400 HTTP status code.
     @desc malformed request or invalid syntax.
     @return Express.Response
     */

    public static async send400Status(req: Request, res: Response) {
        return res.status(400).json({
            status: res.statusCode,
            message: "Invalid syntax provided.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    /*
     Send a 404 HTTP status code.
     @desc resource could not be found on server.
     @return Express.Response
     */

    public static send404Response(req: Request, res: Response) {
        return res.status(404).json({
            status: res.statusCode,
            message: "The requested URL was not found on our servers.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    public static send429Response(req: Request, res: Response) {
        return res.status(429).json({
            status: res.statusCode,
            message: "Too many requests. Try again later.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    public static sent500Status(req: Request, res: Response): Response {
        return res.status(500).json({
            status: res.statusCode,
            message: "An error occurred. Please contact an API developer.",
            timestamps: APIUtil.getTimestamps()
        });
    }

    public static sent504Status(req: Request, res: Response) {
        return res.status(504).json({
            status: res.statusCode,
            message: "Query timed out.",
            timestamps: APIUtil.getTimestamps()
        });
    }
}