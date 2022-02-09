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
import Jimp from "jimp";
import colors from "hex-colors-info";
import ErrorUtil from "../util/ErrorUtil";
import APIUtil from "../util/api/APIUtil";
import Logger from "../../Logger";

export default class ColorEndpoint {

    /**
     * Retrieve data on a specific hex color.
     * @method GET
     * @header none
     * @uri /v1/color?hex=#F8B112&format=json
     * @param hex: string
     * @param format: string <json, png, jpg>
     * @return Promise<Express.Reponse>
     */

    public static async hexToImage(req: Request, res: Response): Promise<Response> {
        const hex = req.query.hex as string;
        const format = req.query.format as string;
        if (!hex) return ErrorUtil.send400Status(req, res);
        switch (format) {
            case "json":
                try {
                    const colorInfo = colors(hex);
                    return res.status(200).json({
                        status: 200,
                        message: res.statusMessage,
                        hex: hex,
                        name: colorInfo.name,
                        hueHex: colorInfo.hueHex,
                        hueName: colorInfo.hueName,
                        match: colorInfo.match,
                        image: "https://app.ponjo.club/v1/color?hex=" + hex + "&format=png",
                        timestamps: APIUtil.getTimestamps()
                    });
                } catch (error) {
                    Logger.error(error.message);
                    return ErrorUtil.sent500Status(req, res);
                }
            case "jpeg":
            case "jpg":
                new Jimp(200, 200, hex, async (err, image) => {
                    await image.getBase64Async(Jimp.MIME_PNG)
                        .then(base64 => {
                            const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                            res.writeHead(200, {
                                "Content-Type": "image/jpg",
                                "Content-Length": img.length
                            });
                            return res.end(img);
                        });
                });
                break;
            case "png":
                new Jimp(200, 200, hex, async (err, image) => {
                    await image.getBase64Async(Jimp.MIME_PNG)
                        .then(base64 => {
                            const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                            res.writeHead(200, {
                                "Content-Type": "image/png",
                                "Content-Length": img.length
                            });
                            return res.end(img);
                        })
                });
                break;
            default:
                new Jimp(200, 200, "#000000", async (err, image) => {
                    await image.getBase64Async(Jimp.MIME_PNG)
                        .then(base64 => {
                            const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                            res.writeHead(200, {
                                "Content-Type": "image/jpg",
                                "Content-Length": img.length
                            });
                            return res.end(img);
                        })
                });
        }
    }
}