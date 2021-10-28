import * as express from "express";
import limiter from "./config/RateLimitConfig";
import TriggerRoute from "./routes/images/TriggerRoute";
import JailRoute from "./routes/images/JailRoute";
import GayRoute from "./routes/images/GayRoute";
import ChatbotRoute from "./routes/utility/ChatbotRoute";
import HealthRoute from "./routes/HealthRoute";
import MCBedrock from "./routes/game/MCBedrock";
import DeckRoute from "./routes/game/DeckRoute";
import AffirmationRoute from "./routes/utility/AffirmationRoute";
import ColorRoute from "./routes/utility/ColorRoute";
import SCPRoute from "./routes/info/SCPRoute";
import KeyRoute from "./routes/authorization/KeyRoute";
import {CaptchaRoute} from "./routes/utility/CaptchaRoute";
import {NextFunction, Request, Response} from "express";
import AuthorizationUtil from "./util/AuthorizationUtil";
import MCJava from "./routes/game/MCJava";
import AvatarRoute from "./routes/lgbtq/AvatarRoute";
import RandomMonthRoute from "./routes/random/RandomMonthRoute";
import RandomUserProfileRoute from "./routes/random/RandomUserProfileRoute";
import RandomTimezoneRoute from "./routes/random/RandomTimezoneRoute";
import WeatherRoute from "./routes/utility/WeatherRoute";

const router = express.Router();

router.use(limiter.rateLimiter);

router.use(async (req: Request, res: Response, next: NextFunction) => {
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

router.get("/trigger", TriggerRoute.triggerImage);
router.get("/jail", JailRoute.jailImage);
router.get("/gay", GayRoute.gayImage);

router.get("/health", HealthRoute.fetchApiHealth);
router.get("/chatbot", ChatbotRoute.sendChatbotMessage);
router.get("/affirmations", AffirmationRoute.getAffirmation);

router.get("/scp", SCPRoute.getScpData);
router.get("/scp/personnel", SCPRoute.getFoundationPersonnel);
router.get("/scp/branches", SCPRoute.getFoundationBranches);
router.get("/scp/taskforces", SCPRoute.getTaskForce);

router.get("/color", ColorRoute.hexToImage);
router.get("/color/img", ColorRoute.getHexVector);

router.get("/query/mcbe", MCBedrock.queryBedrockServer);
router.get("/query/mcjava", MCJava.queryJavaServer);

router.get("/decks/create", DeckRoute.createDeck);
router.get("/decks/find", DeckRoute.getDeckById);
router.get("/decks/shuffle", DeckRoute.shuffleDeckById);
router.get("/decks/poker/evalhand", DeckRoute.getPokerHand);

router.get("/captcha", CaptchaRoute.getCaptchaData);

router.post("/pride/avatar", AvatarRoute.sendPrideFlairedAvatar);

router.get("/weather", WeatherRoute.sendResponse);
router.get("/weather/:location", WeatherRoute.sendResponse);

router.get("/random/month", RandomMonthRoute.getRandomMonth);
router.get("/random/userprofile", RandomUserProfileRoute.sendResponse);
router.get("/random/userprofile/:amount", RandomUserProfileRoute.sendResponse);
router.get("/random/timezone", RandomTimezoneRoute.getRandomTimezone);
router.get("/random/timezone/:amount", RandomTimezoneRoute.getRandomTimezone);

router.post("/auth/keys/create", KeyRoute.createKey);
router.get("/auth/keys/list", KeyRoute.getAllKeys);

export = router;