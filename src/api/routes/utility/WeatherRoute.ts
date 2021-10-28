import {Request, Response} from "express";
import ErrorUtil from "../../util/ErrorUtil";
import * as weather from "weather-js";

export default class WeatherRoute {

    public static async sendResponse(req: Request, res: Response) {
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
}