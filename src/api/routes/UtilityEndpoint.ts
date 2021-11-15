import {Request, Response} from "express";
import MathUtil from "../util/MathUtil";
import ResponseUtil from "../util/api/ResponseUtil";
import ErrorUtil from "../util/ErrorUtil";

export default class UtilityEndpoint {

    /*
     Check if a number is prime or not.
     @method GET
     @header none
     @uri /v1/prime
     @param number: int
     */

    public static async checkIfNumberIsPrime(req: Request, res: Response) {
        const number = req.query.number ? req.query.number : req.params.number as any;
        try {
            if (!number) return ErrorUtil.send400Status(req, res);
            return res.status(200).json({
                status: res.statusCode,
                data: {
                    number: parseInt(number),
                    isPrime: MathUtil.isPrime(parseInt(number))
                },
                timestamps: ResponseUtil.getTimestamps()
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}