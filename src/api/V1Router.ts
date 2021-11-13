import * as express from "express";
import limiter from "./config/RateLimitConfig";
import DeckEndpoint from "./routes/DeckEndpoint";
import ColorEndpoint from "./routes/ColorEndpoint";
import LGBTQEndpoint from "./routes/LGBTQEndpoint";
import DataEndpoint from "./routes/DataEndpoint";
import RandomEndpoint from "./routes/RandomEndpoint";
import ImageManipulationEndpoint from "./routes/ImageManipulationEndpoint";

const router = express.Router();

router.use(limiter.rateLimiter);

router.get("/trigger", ImageManipulationEndpoint.sendTriggeredImage);
router.get("/jail", ImageManipulationEndpoint.sendJailedImage);
router.get("/gay", ImageManipulationEndpoint.sendGayImage);

router.get("/health", DataEndpoint.getApiHealth);
router.get("/affirmations", RandomEndpoint.getRandomAffirmation);

router.get("/color", ColorEndpoint.hexToImage);

router.get("/decks/create", DeckEndpoint.createDeck);
router.get("/decks/find", DeckEndpoint.getDeckById);
router.get("/decks/shuffle", DeckEndpoint.shuffleDeckById);
router.get("/decks/evalhand", DeckEndpoint.getPokerHand);
router.get("/decks/draw", DeckEndpoint.drawCards);
router.get("/decks/reset", DeckEndpoint.resetDeck);

router.post("/pride/avatar", LGBTQEndpoint.sendFlairedAvatar);
router.get("/pride/flags", LGBTQEndpoint.sendPrideFlag);
router.get("/pride/flags/:type", LGBTQEndpoint.sendPrideFlag);

export = router;