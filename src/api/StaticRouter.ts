import * as express from "express";
import limiter from "./config/RateLimitConfig";
import {Request, Response} from "express";
import path from "path";

const router = express.Router();
router.use(limiter.rateLimiter);

router.get("/", (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.get("/deck", (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname + "/public/endpoints/deck.html"));
});

router.get("/game", (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname + "/public/endpoints/game.html"));
});

router.get("/image", (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname + "/public/endpoints/image.html"));
});

router.get("/info", (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname + "/public/endpoints/info.html"));
});

router.get("/utils", (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname + "/public/endpoints/utils.html"));
});

export = router;