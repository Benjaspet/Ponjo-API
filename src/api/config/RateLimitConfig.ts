import rateLimit from "express-rate-limit";
import {Request, Response} from "express";
import ErrorUtil from "../util/ErrorUtil";

const limiter = {
    rateLimiter: rateLimit({
        max: 35,
        windowMs: 60 * 3 * 1000,
        handler(req: Request, res: Response): void {
            ErrorUtil.send429Response(req, res);
        }
    })
};

export default limiter;