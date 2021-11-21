import {Request, Response} from "express";
import Image from "../models/Images";
import APIUtil from "./api/APIUtil";
import path from "path";
import Images from "../models/Images";

export default class HostingUtil {

    public static imageData: string[] = [];
    public static htmlData: string[] = [];

    public static imageExists(id, array) {
        return array.some(function(el) {
            return el.imageId === id;
        });
    }

    public static getImageData(id, array) {
        return array.find(e => e.imageId === id);
    }

    public static async sendArrayOfAllImages(req: Request, res: Response) {
        Image.find()
            .then(images => {
                return res.status(200).json({
                    status: res.statusCode,
                    images: images,
                    timestamps: APIUtil.getTimestamps()
                });
            });
    }

    public static async sendImagePostResponse(req: Request, res: Response) {
        return res.status(200).json({
            status: res.statusCode,
            data: {
                filePath: HostingUtil.imageData[0],
                imageId: HostingUtil.imageData[1]
            },
            timestamps: APIUtil.getTimestamps()
        });
    }

    public static getDiskStorageOptions(): object {
        return {
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
                        HostingUtil.imageData[0] = filePath;
                        HostingUtil.imageData[1] = id;
                    });
            }
        }
    }

    public static async getImage(req: Request, res: Response) {
        Images.find().then(images => {
            if (HostingUtil.imageExists(req.params.image, images)) {
                const imagePath = HostingUtil.getImageData(req.params.image, images).filePath;
                const imageId = HostingUtil.getImageData(req.params.image, images).imageId;
                HostingUtil.htmlData[0] = "../" + imagePath;
                HostingUtil.htmlData[1] = imageId;
                res.set("Content-Type", "text/html")
                return HostingUtil.sendEmbeddedResponse(imagePath, imageId, req, res);
            } else {
                return res.status(404).json({
                    status: res.statusCode,
                    message: "An image with that ID does not exist.",
                    timestamps: APIUtil.getTimestamps()
                });
            }
        });
    }

    public static sendEmbeddedResponse(imagePath: string, imageId: string, req: Request, res: Response) {
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
}