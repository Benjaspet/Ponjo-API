import * as express from "express";
import limiter from "./config/RateLimitConfig";
import ColorEndpoint from "./routes/ColorEndpoint";
import LGBTQEndpoint from "./routes/LGBTQEndpoint";
import DataEndpoint from "./routes/DataEndpoint";
import RandomEndpoint from "./routes/RandomEndpoint";
import ImageManipulationEndpoint from "./routes/ImageManipulationEndpoint";
import UtilityEndpoint from "./routes/UtilityEndpoint";

const router = express.Router();

router.use(limiter.rateLimiter);

router.get("/health", DataEndpoint.getApiHealth);
router.get("/affirmations", RandomEndpoint.getRandomAffirmation);

router.get("/color", ColorEndpoint.hexToImage);
router.get("/prime", UtilityEndpoint.checkIfNumberIsPrime);
router.get("/prime/:number", UtilityEndpoint.checkIfNumberIsPrime);

router.post("/trigger", ImageManipulationEndpoint.sendTriggeredImage);
router.post("/jail", ImageManipulationEndpoint.sendJailedImage);
router.post("/gay", ImageManipulationEndpoint.sendGayImage);
router.post("/circle", ImageManipulationEndpoint.sendCircularImage);
router.post("/burn", ImageManipulationEndpoint.sendBurningImage);
router.post("/facepalm", ImageManipulationEndpoint.sendFacepalmImage);
router.post("/pixelate", ImageManipulationEndpoint.sendPixelatedImage);
router.post("/rip", ImageManipulationEndpoint.sendRipEffect);

router.post("/pride/avatar", LGBTQEndpoint.sendFlairedAvatar);
router.get("/pride/flags", LGBTQEndpoint.sendPrideFlag);
router.get("/pride/flags/:type", LGBTQEndpoint.sendPrideFlag);
router.get("/pride/orientations", LGBTQEndpoint.searchForOrientation);

export = router;