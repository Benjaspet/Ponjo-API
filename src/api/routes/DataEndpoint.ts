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
import * as weather from "weather-js";
import Captcha from "@haileybot/captcha-generator";
import CovidDataUtil from "../util/data/CovidDataUtil";
import Logger from "../../Logger";
import fetch from "node-fetch";
import APIUtil from "../util/api/APIUtil";
import MemeUtil from "../util/api/MemeUtil";
import QRCodeUtil from "../util/api/QRCodeUtil";

export default class DataEndpoint {

    /*
     Obtain a random set of memes from Reddit.
     @method GET
     @header Authentication: token
     @uri /v1/meme?count=5
     @param count?: number
     @return Promise<any>
     */

    public static async getRandomMeme(req: Request, res: Response): Promise<any> {
        const amount: string = req.query.count as string;
        try {
            if (!amount) return ErrorUtil.send400Status(req, res);
            if (parseInt(amount) > 100) return ErrorUtil.send400Status(req, res);
            MemeUtil.fetchRedditMeme(parseInt(amount), false)
                .then(async result => {
                    return res.status(200).json({
                        status: res.statusCode,
                        message: res.statusMessage,
                        memes: result.data,
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Get current weather data & forecasts.
     @method GET
     @header Authentication: token
     @uri /v1/weather?location=Atlanta
     @uri /v1/weather/Atlanta
     @param location: string
     @return Promise<Express.Reponse>
     */

    public static async sendWeatherResponse(req: Request, res: Response): Promise<Response> {
        const location = req.query.location || req.params.location as string;
        try {
            if (!location) return ErrorUtil.sent500Status(req, res);
            weather.find({search: location, degreeType: "F"}, (error, result) => {
                if (error) {
                    return ErrorUtil.sent500Status(req, res);
                } else {
                    return res.status(200).json({
                        status: res.statusCode,
                        message: res.statusMessage,
                        data: result,
                        timestamps: APIUtil.getTimestamps()
                    });
                }
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Generate a custom QR code.
     @method GET
     @header Authentication: token
     @uri /v1/qr?text=hello%20there&size=500
     @param text: string
     @param size: number
     @param background?: string
     @return Promise<any>
     */

    public static async generateQRCode(req: Request, res: Response): Promise<any> {
        const text = req.query.text as string;
        const size = req.query.size as string;
        const backgroundImage = req.query.background as string;
        if (!text || !size) return ErrorUtil.send400Status(req, res);
        try {
            let code;
            if (!backgroundImage) {
                code = await QRCodeUtil.generateQRCode(decodeURIComponent(text), JSON.parse(size));
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": code.length
                });
                return res.end(code);
            } else {
                code = await QRCodeUtil.generateQRCode(decodeURIComponent(text), JSON.parse(size), decodeURIComponent(backgroundImage));
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": code.length
                });
                return res.end(code);
            }
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Obtain a response from a chatbot.
     @method GET
     @header Authentication: token
     @uri /v1/chatbot?message=hello&name=ChatBot
     @param message: string
     @param name?: string
     @return Promise<Express.Reponse>
     */

    public static async sendChatbotMessage(req: Request, res: Response): Promise<Response> {
        try {
            const message = req.query.message as string;
            if (!message) return ErrorUtil.send400Status(req, res);
            const botName = req.query.name ? req.query.name : "Chatbot" as string;
            await fetch(`https://yourmommmaosamaobama.hisroyal123.repl.co/?message=${encodeURIComponent(message)}`)
                .then(response => response.json())
                .then(data => {
                    return res.status(200).json({
                        status: res.statusCode,
                        message: res.statusMessage,
                        chatbot: {
                            name: botName,
                            response: data.message
                        },
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    Logger.error(error);
                    return res.status(500).json({
                        status: res.statusCode,
                        message: "The chatbot endpoint is experiencing issues at this time.",
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     The route to retrieve a random captcha.
     @method GET
     @header Authentication: token
     @uri /v1/captcha
     @return Promise<Express.Reponse>
     */

    public static async getCaptchaData(req: Request, res: Response): Promise<Response> {
        try {
            const captcha = new Captcha();
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                captcha: {
                    value: captcha.value,
                    imgData: captcha.dataURL
                },
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Get worldwide COVID-19 statistics.
     @method GET
     @header Authentication: token
     @uri /v1/covid/world
     @return Promise<Response|any>
     */

    public static async getWorldwideCovidStats(req: Request, res: Response): Promise<Response|any> {
        await CovidDataUtil.getWorldWideCovidData()
            .then(result => {
                return res.status(200).json({
                    status: res.statusCode,
                    message: res.statusMessage,
                    stats: result,
                    timestamps: APIUtil.getTimestamps()
                });
            })
            .catch(error => {
                Logger.error(error.message);
                return ErrorUtil.sent500Status(req, res);
            });
    }

    /*
     Get COVID-19 statistics on a particular country.
     @method GET
     @header Authentication: token
     @uri /v1/covid/canada
     @uri /v1/covid?country=canada
     @param country: string
     @return Promise<Express.Reponse>
     */

    public static async getCovidStatsByCountry(req: Request, res: Response): Promise<Response> {
        const country = req.query.country || req.params.country as string;
        if (!country) return ErrorUtil.send400Status(req, res);
        await CovidDataUtil.getCovidDataByCountry(<string> country)
            .then(result => {
                return res.status(200).json({
                    status: res.statusCode,
                    message: res.statusMessage,
                    data: result,
                    timestamps: APIUtil.getTimestamps()
                });
            })
            .catch(error => {
                Logger.error(error.message);
                return ErrorUtil.sent500Status(req, res);
            });
    }

    /*
     The route to check the API's status/health.
     @method GET
     @header none
     @uri /v1/health
     @return Express.Response
     */

    public static getApiHealth(req: Request, res: Response): Response {
        try {
            return res.status(200).json({
                status: res.statusCode,
                message: "API health check succeeded.",
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }
}