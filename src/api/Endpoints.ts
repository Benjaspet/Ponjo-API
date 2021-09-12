import * as express from "express";
import TriggerRoute from "./routes/images/TriggerRoute";
import JailRoute from "./routes/images/JailRoute";
import GayRoute from "./routes/images/GayRoute";
import ChatbotRoute from "./routes/utility/ChatbotRoute";
import HealthRoute from "./routes/HealthRoute";
import limiter from "./config/RateLimitConfig";

const router = express.Router();
router.use(limiter.rateLimiter);

/*
 * @description All image manipulation routes.
 */

router.get("/trigger", TriggerRoute.triggerImage);
router.get("/jail", JailRoute.jailImage);
router.get("/gay", GayRoute.gayImage);

/*
 * @description All utility routes.
 */

router.get("/health", HealthRoute.fetchApiHealth);
router.get("/chatbot", ChatbotRoute.sendChatbotMessage);

export = router;