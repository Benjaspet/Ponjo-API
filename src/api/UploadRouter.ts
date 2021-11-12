import * as express from "express";
import {Request, Response} from "express";
import multer from "multer";
import UploaderUtil from "./util/UploaderUtil";
import APIUtil from "./util/api/APIUtil";
import Image from "./models/Images";
import Images from "./models/Images";
import path from "path";

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

router.post("/post", upload.array("avatar"), (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        data: {
            filePath: UploaderUtil.imageData[0],
            imageId: UploaderUtil.imageData[1]
        }
    });
});

router.get("/list", (req: Request, res: Response) => {
    Image.find()
        .then(images => {
            return res.status(200).json({images});
        });
});

router.get("/:image", (req: Request, res: Response) => {
    Images.find().then(images => {
            if (UploaderUtil.imageExists(req.params.image, images)) {
                const imagePath = UploaderUtil.getImageData(req.params.image, images).filePath;
                const imageId = UploaderUtil.getImageData(req.params.image, images).imageId;
                UploaderUtil.htmlData[0] = "../" + imagePath;
                UploaderUtil.htmlData[1] = imageId;
                res.set("Content-Type", "text/html")
                return res.status(200).send('<html lang="en">\n' +
                    '<head>\n' +
                    '    <style id="stndz-style"></style>\n' +
                    '    <title>Ponjo Hosting</title>\n' +
                    '    <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/Eerie6560/Archives/main/images/icons/Ponjo-Hosting.png">\n' +
                    `    <meta name="twitter:image" content=${imagePath}>\n` +
                    `    <meta property="og:title" content="Ponjo | ${imageId}.png">\n` +
                    '    <meta property="og:description" content="Developed by Eerie#6560.">\n' +
                    '    <meta name="twitter:card" content="summary_large_image">\n' +
                    '    <meta name="theme-color" content="#4295f4">\n' +
                    '</head>\n' +
                    '<body style="height: 100%; text-align: center; margin: 0; background: #222222;">\n' +
                    `    <img id="imageTag" style="user-select: none; -webkit-user-select: none; cursor: zoom-in;" src=${imagePath} alt="https://ponjo.club" alt="">\n` +
                    '</body>\n' +
                    '</html>');
            }
            return res.status(404).json({
                status: 404,
                message: "An image with that ID does not exist."
            });
        });
});

export = router;