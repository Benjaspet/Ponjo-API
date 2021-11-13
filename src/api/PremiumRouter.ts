import * as express from "express";
import limiter from "./config/RateLimitConfig";
import {NextFunction, Request, Response} from "express";
import AuthorizationUtil from "./util/api/AuthorizationUtil";
import DataEndpoint from "./routes/DataEndpoint";
import SCPEndpoint from "./routes/SCPEndpoint";
import AuthEndpoint from "./routes/AuthEndpoint";
import GameQueryEndpoint from "./routes/GameQueryEndpoint";
import RoboEerieEndpoint from "./routes/RoboEerieEndpoint";
import RandomEndpoint from "./routes/RandomEndpoint";

const premiumRouter = express.Router();

premiumRouter.use(limiter.rateLimiter);

premiumRouter.use(async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers.authorization as string;
    if (await AuthorizationUtil.isValidApiKey(key) == false) {
        return res.status(403).json({
            status: res.statusCode,
            message: "Invalid API key provided.",
            timestamps: {
                date: new Date().toLocaleString(),
                unix: Math.round(+ new Date() / 1000),
            }
        });
    }
    next();
});

premiumRouter.use(async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers.authorization as string;
    await AuthorizationUtil.addApiKeyUse(key, 1);
    next();
});

premiumRouter.get("/chatbot", DataEndpoint.sendChatbotMessage);
premiumRouter.get("/captcha", DataEndpoint.getCaptchaData);

premiumRouter.get("/query/mcbe", GameQueryEndpoint.queryBedrockServer);
premiumRouter.get("/query/mcjava", GameQueryEndpoint.queryJavaServer);
premiumRouter.get("/query/fivem", GameQueryEndpoint.queryFivemServer);
premiumRouter.get("/query/ark", GameQueryEndpoint.queryArkServer);

premiumRouter.get("/scp", SCPEndpoint.getScpData);
premiumRouter.get("/scp/personnel", SCPEndpoint.getFoundationPersonnel);
premiumRouter.get("/scp/branches", SCPEndpoint.getFoundationBranches);
premiumRouter.get("/scp/taskforces", SCPEndpoint.getTaskForce);
premiumRouter.get("/scp/sites", SCPEndpoint.getSites);

premiumRouter.get("/covid/world", DataEndpoint.getWorldwideCovidStats);
premiumRouter.get("/covid/country", DataEndpoint.getCovidStatsByCountry);
premiumRouter.get("/covid/:country", DataEndpoint.getCovidStatsByCountry);

premiumRouter.get("/roboeerie/tags", RoboEerieEndpoint.getTags);
premiumRouter.get("/roboeerie/tags/:count", RoboEerieEndpoint.getTags);

premiumRouter.get("/weather", DataEndpoint.sendWeatherResponse);
premiumRouter.get("/weather/:location", DataEndpoint.sendWeatherResponse);

premiumRouter.get("/random/month", RandomEndpoint.getRandomMonth);
premiumRouter.get("/random/userprofile", RandomEndpoint.getRandomUserProfile);
premiumRouter.get("/random/userprofile/:amount", RandomEndpoint.getRandomUserProfile);
premiumRouter.get("/random/timezone", RandomEndpoint.getRandomTimezone);
premiumRouter.get("/random/timezone/:amount", RandomEndpoint.getRandomTimezone);

premiumRouter.post("/auth/keys/create", AuthEndpoint.createKey);
premiumRouter.get("/auth/keys/list", AuthEndpoint.getAllKeys);

export default premiumRouter;