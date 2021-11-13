import {NextFunction, Request, Response} from "express";
import ErrorUtil from "../util/ErrorUtil";
import * as weather from "weather-js";
import Captcha from "@haileybot/captcha-generator";
import CovidDataUtil from "../util/data/CovidDataUtil";
import ResponseUtil from "../util/api/ResponseUtil";
import Logger from "../../Logger";
import fetch from "node-fetch";

export default class DataEndpoint {

    /*
     The endpoint listener to get current weather data as well as
     predictions by Microsoft.
     @header none
     @uri /v1/weather?location=Atlanta
     @uri /v1/weather/Atlanta
     @param string: location
     @query string: location
     */

    public static async sendWeatherResponse(req: Request, res: Response) {
        try {
            const location = req.query.location || req.params.location as string;
            if (!location) {
                return ErrorUtil.sent500Status(req, res);
            } else {
                weather.find({search: location, degreeType: "F"}, (error, result) => {
                    if (error) {
                        return ErrorUtil.sent500Status(req, res);
                    } else {
                        return res.status(200).json({
                            status: 200,
                            data: result,
                            timestamps: {
                                date: new Date().toLocaleString(),
                                unix: Math.round(+ new Date() / 1000),
                            }
                        });
                    }
                });
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     The route to obtain a response from a chatbot.
     @method GET
     @header Authentication: token
     @uri /v1/chatbot?message=Hello&name=ChatBot
     @param message: string
     @param name: string
     */

    public static async sendChatbotMessage(req: Request, res: Response): Promise<Response> {
        try {
            const message = req.query.message as string;
            const botName = req.query.name ? req.query.name : "Ponjo Bot" as string;
            await fetch(`https://yourmommmaosamaobama.hisroyal123.repl.co/?message=${encodeURIComponent(message)}`)
                .then(response => response.json())
                .then(data => {
                    return res.status(200).json({
                        status: res.statusCode,
                        chatbot: {
                            name: botName,
                            response: data.message
                        },
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                }).catch(error => {
                    Logger.error(error);
                    return res.status(400).json({
                        status: 400,
                        message: "The chatbot endpoint is experiencing issues at this time.",
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
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
     @header none
     @uri /v1/captcha
     */

    public static async getCaptchaData(req: Request, res: Response) {
        try {
            const captcha = new Captcha();
            return res.status(200).json({
                data: {
                    value: captcha.value,
                    imgData: captcha.dataURL
                },
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
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
                    data: result,
                    timestamps: ResponseUtil.getTimestamps()
                });
            })
            .catch(error => {
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
        if (!country) {
            return ErrorUtil.send400Status(req, res);
        } else {
            await CovidDataUtil.getCovidDataByCountry(<string> country)
                .then(result => {
                    return res.status(200).json({
                        status: res.statusCode,
                        data: result,
                        timestamps: ResponseUtil.getTimestamps()
                    });
                })
                .catch(error => {
                   return ErrorUtil.sent500Status(req, res);
                });
        }
    }

    /*
     The route to check the API's status/health.
     @header none
     */

    public static getApiHealth(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).json({
                status: res.statusCode,
                message: "API health check succeeded.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}