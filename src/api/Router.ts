import * as express from "express";
import limiter from "./config/RateLimitConfig";
import ColorEndpoint from "./routes/ColorEndpoint";
import LGBTQEndpoint from "./routes/LGBTQEndpoint";
import DataEndpoint from "./routes/DataEndpoint";
import RandomEndpoint from "./routes/RandomEndpoint";
import ImageManipulationEndpoint from "./routes/ImageManipulationEndpoint";
import UtilityEndpoint from "./routes/UtilityEndpoint";
import {NextFunction, Request, Response} from "express";
import AuthorizationUtil from "./util/api/AuthorizationUtil";
import APIUtil from "./util/api/APIUtil";
import GameQueryEndpoint from "./routes/GameQueryEndpoint";
import DeckEndpoint from "./routes/DeckEndpoint";
import SCPEndpoint from "./routes/SCPEndpoint";
import RoboEerieEndpoint from "./routes/RoboEerieEndpoint";
import AuthEndpoint from "./routes/AuthEndpoint";
import multer from "multer";
import path from "path";
import Image from "./models/Images";
import UploaderUtil from "./util/UploaderUtil";
import Images from "./models/Images";

const router = express.Router();
const premiumRouter = express.Router();
const uploadRouter = express.Router();

router.use(limiter.rateLimiter);
premiumRouter.use(limiter.rateLimiter);

premiumRouter.use(async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers.authorization as string;
    if (await AuthorizationUtil.isValidApiKey(key) == false) {
        return res.status(403).json({
            status: res.statusCode,
            message: "Invalid API key provided.",
            timestamps: APIUtil.getTimestamps()
        });
    }
    await AuthorizationUtil.addApiKeyUse(key, 1);
    next();
});

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

premiumRouter.get("/chatbot", DataEndpoint.sendChatbotMessage);
premiumRouter.get("/captcha", DataEndpoint.getCaptchaData);

premiumRouter.get("/query/mcbe", GameQueryEndpoint.queryBedrockServer);
premiumRouter.get("/query/mcjava", GameQueryEndpoint.queryJavaServer);
premiumRouter.get("/query/fivem", GameQueryEndpoint.queryFivemServer);
premiumRouter.get("/query/ark", GameQueryEndpoint.queryArkServer);

premiumRouter.get("/decks/evalhand", DeckEndpoint.getPokerHand);
premiumRouter.get("/decks/find", DeckEndpoint.getDeckById);
premiumRouter.patch("/decks/shuffle", DeckEndpoint.shuffleDeckById);
premiumRouter.patch("/decks/draw", DeckEndpoint.drawCards);
premiumRouter.post("/decks/create", DeckEndpoint.createDeck);
premiumRouter.post("/decks/reset", DeckEndpoint.resetDeck);

premiumRouter.get("/scp", SCPEndpoint.getScpData);
premiumRouter.get("/scp/personnel", SCPEndpoint.getFoundationPersonnel);
premiumRouter.get("/scp/branches", SCPEndpoint.getFoundationBranches);
premiumRouter.get("/scp/taskforces", SCPEndpoint.getFoundationTaskForce);
premiumRouter.get("/scp/sites", SCPEndpoint.getFoundationSites);
premiumRouter.get("/scp/areas", SCPEndpoint.getFoundationAreas);
premiumRouter.get("/scp/all", SCPEndpoint.getAllFoundationData);

premiumRouter.get("/covid/world", DataEndpoint.getWorldwideCovidStats);
premiumRouter.get("/covid/country", DataEndpoint.getCovidStatsByCountry);
premiumRouter.get("/covid/:country", DataEndpoint.getCovidStatsByCountry);

premiumRouter.get("/roboeerie/tags", RoboEerieEndpoint.getTags);
premiumRouter.get("/roboeerie/tags/:count", RoboEerieEndpoint.getTags);

premiumRouter.get("/weather", DataEndpoint.sendWeatherResponse);
premiumRouter.get("/weather/:location", DataEndpoint.sendWeatherResponse);

premiumRouter.get("/random/month", RandomEndpoint.getRandomMonth);
premiumRouter.get("/random/userprofile", RandomEndpoint.getRandomUserProfile);
premiumRouter.get("/random/userprofile/:count", RandomEndpoint.getRandomUserProfile);
premiumRouter.get("/random/timezone", RandomEndpoint.getRandomTimezone);
premiumRouter.get("/random/timezone/:count", RandomEndpoint.getRandomTimezone);

premiumRouter.post("/auth/keys/create", AuthEndpoint.createKey);
premiumRouter.get("/auth/keys/list", AuthEndpoint.getAllKeys);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname + "/uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id = APIUtil.generateUniqueId();
        const filePath = `/${id}${ext}`;
        Image.create({filePath: filePath, imageId: id})
            .then(() => {
                cb(null, filePath);
                UploaderUtil.imageData[0] = filePath;
                UploaderUtil.imageData[1] = id;
            });
    }
});

const upload = multer({storage});

uploadRouter.post("/post", upload.array("avatar"), (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        data: {
            filePath: UploaderUtil.imageData[0],
            imageId: UploaderUtil.imageData[1]
        }
    });
});

uploadRouter.get("/list", (req: Request, res: Response) => {
    Image.find()
        .then(images => {
            return res.status(200).json({images});
        });
});

uploadRouter.get("/:image", (req: Request, res: Response) => {
    Images.find().then(images => {
        if (UploaderUtil.imageExists(req.params.image, images)) {
            const imagePath = UploaderUtil.getImageData(req.params.image, images).filePath;
            const imageId = UploaderUtil.getImageData(req.params.image, images).imageId;
            UploaderUtil.htmlData[0] = "../" + imagePath;
            UploaderUtil.htmlData[1] = imageId;
            res.set("Content-Type", "text/html")
            return UploaderUtil.sendEmbeddedResponse(imagePath, imageId, req, res);
        } else {
            return res.status(404).json({
                status: res.statusCode,
                message: "An image with that ID does not exist.",
                timestamps: APIUtil.getTimestamps()
            });
        }
    });
});

export = {
    v1: router,
    premium: premiumRouter,
    hosting: uploadRouter
};