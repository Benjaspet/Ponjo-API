import rateLimit from "express-rate-limit";
import {Request, Response} from "express";
import ErrorUtil from "../util/ErrorUtil";

/*
@description The rate limiter for the /v1 endpoint.
@cont Handles a maximum of 10 requests per 10 seconds, per address.
@cont If this limit is reached, the address is rate limited for 300 seconds.
TODO: implement longer rate limits if bypassing is attempted.
 */

const limiter = {
    rateLimiter: rateLimit({
        max: 20,
        windowMs: 60 * 3 * 1000,
        handler(req: Request, res: Response): void {
            ErrorUtil.send429Response(req, res);
        }
    })
};

export default limiter;