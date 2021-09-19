import * as express from "express";
import {Request, Response} from "express";
import multer from "multer";
import mongoose from "mongoose";
import UploaderUtil from "./util/UploaderUtil";
import APIUtil from "./util/APIUtil";
import Image from "./models/Images";
import Images from "./models/Images";
import path from "path";
import config from "./config/Config";

mongoose.connect(config.mongoUri, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const router = express.Router();

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

/*
 * @description The POST request to add the image to the database.
 */

router.post("/post", upload.array("avatar"), (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        data: {
            filePath: UploaderUtil.imageData[0],
            imageId: UploaderUtil.imageData[1]
        }
    });
});

/*
 * @description The GET request to return a list of all uploaded images.
 */

router.get("/list", (req: Request, res: Response) => {
    Image.find()
        .then(images => {
            return res.status(200).json({images});
        });
});

/*
 * @description The GET request to get an image by ID.
 */

router.get("/:image", (req: Request, res: Response) => {
    Images.find()
        .then(images => {
            if (UploaderUtil.imageExists(req.params.image, images)) {
                return res.status(200).json({
                    status: 200,
                    data: UploaderUtil.getImageData(req.params.image, images)
                });
            }
            return res.status(404).json({
                status: 404,
                message: "An image with that ID does not exist."
            });
        });
});

export = router;