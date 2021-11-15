import {Request, Response} from "express";
import ErrorUtil from "../util/ErrorUtil";
import * as weather from "weather-js";
import Captcha from "@haileybot/captcha-generator";
import CovidDataUtil from "../util/data/CovidDataUtil";
import Logger from "../../Logger";
import fetch from "node-fetch";
import APIUtil from "../util/api/APIUtil";

export default class DataEndpoint {

    /*
     Get current weather data & forecasts.
     @method GET
     @header Authentication: token
     @uri /v1/weather?location=Atlanta
     @uri /v1/weather/Atlanta
     @param string: location
     */

    public static async sendWeatherResponse(req: Request, res: Response) {
        const location = req.query.location || req.params.location as string;
        try {
            if (!location) return ErrorUtil.sent500Status(req, res);
            weather.find({search: location, degreeType: "F"}, (error, result) => {
                if (error) {
                    return ErrorUtil.sent500Status(req, res);
                } else {
                    return res.status(200).json({
                        status: res.statusCode,
                        data: result,
                        timestamps: APIUtil.getTimestamps()
                    });
                }
            });
        } catch (error) {
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
                        chatbot: {
                            name: botName,
                            response: data.message
                        },
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    Logger.error(error);
                    return res.status(400).json({
                        status: res.statusCode,
                        message: "The chatbot endpoint is experiencing issues at this time.",
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            Logger.error(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     The route to retrieve a random captcha.
     @method GET
     @header Authentication: token
     @uri /v1/captcha
     */

    public static async getCaptchaData(req: Request, res: Response) {
        try {
            const captcha = new Captcha();
            return res.status(200).json({
                status: res.statusCode,
                captcha: {
                    value: captcha.value,
                    imgData: captcha.dataURL
                },
                timestamps: APIUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Get worldwide COVID-19 statistics.
     @method GET
     @header Authentication: token
     @uri /v1/covid/world
     */

    public static async getWorldwideCovidStats(req: Request, res: Response) {
        await CovidDataUtil.getWorldWideCovidData()
            .then(result => {
                return res.status(200).json({
                    status: res.statusCode,
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
     */

    public static async getCovidStatsByCountry(req: Request, res: Response) {
        const country = req.query.country || req.params.country as string;
        if (!country) return ErrorUtil.send400Status(req, res);
        await CovidDataUtil.getCovidDataByCountry(<string> country)
            .then(result => {
                return res.status(200).json({
                    status: res.statusCode,
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
     */

    public static getApiHealth(req: Request, res: Response) {
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