import {Request, Response} from "express";
import Jimp from "jimp";
import AuthorizationUtil from "../../util/AuthorizationUtil";

export default class ColorRoute {

    public static async hexToImage(req: Request, res: Response) {
        try {
            const hex = req.query.hex as string;
            const format = req.query.format as string;
            const key = req.headers.authorization as string;
            if (!req.headers.authorization || !await AuthorizationUtil.isValidApiKey(key)) {
                return res.status(403).json({
                    status: res.statusCode,
                    message: "Invalid API key provided.",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
            switch (format) {
                case "png":
                    new Jimp(200, 200, hex, async (err, image) => {
                        await image.getBase64Async(Jimp.MIME_PNG)
                            .then(base64 => {
                                const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                                res.writeHead(200, {
                                    "Content-Type": "image/png",
                                    "Content-Length": img.length
                                });
                                return res.end(img);
                            })
                    });
                    break;
                case "jpeg":
                case "jpg":
                    new Jimp(200, 200, hex, async (err, image) => {
                        await image.getBase64Async(Jimp.MIME_PNG)
                            .then(base64 => {
                                const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                                res.writeHead(200, {
                                    "Content-Type": "image/jpeg",
                                    "Content-Length": img.length
                                });
                                return res.end(img);
                            })
                    });
                    break;
                default:
                    new Jimp(200, 200, hex, async (err, image) => {
                        await image.getBase64Async(Jimp.MIME_PNG)
                            .then(base64 => {
                                const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                                res.writeHead(200, {
                                    "Content-Type": "image/png",
                                    "Content-Length": img.length
                                });
                                return res.end(img);
                            })
                    });
            }
        } catch (error) {
            const errorMessage = new Error("An error occurred. Please contact an API developer.");
            return res.status(500).json({
                status: res.statusCode,
                message: errorMessage,
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
    }
}