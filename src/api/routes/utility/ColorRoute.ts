import {Request, Response} from "express";
import Jimp from "jimp";
import AuthorizationUtil from "../../util/AuthorizationUtil";
import colors from "hex-colors-info";
import ErrorUtil from "../../util/ErrorUtil";

export default class ColorRoute {

    public static async hexToImage(req: Request, res: Response) {
        const hex = req.query.hex as string;
        try {
            const colorInfo = colors(hex);
            return res.status(200).json({
                status: 200,
                hex: hex,
                name: colorInfo.name,
                hueHex: colorInfo.hueHex,
                hueName: colorInfo.hueName,
                match: colorInfo.match,
                image: "https://app.ponjo.club/v1/color/img?hex=" + hex + "&format=png"
            });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    public static async getHexVector(req: Request, res: Response) {
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
            case "jpeg":
            case "jpg":
                new Jimp(200, 200, hex, async (err, image) => {
                    await image.getBase64Async(Jimp.MIME_PNG)
                        .then(base64 => {
                            const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                            res.writeHead(200, {
                                "Content-Type": "image/jpg",
                                "Content-Length": img.length
                            });
                            return res.end(img);
                        })
                });
                break;
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
            default:
                new Jimp(200, 200, "#000000", async (err, image) => {
                    await image.getBase64Async(Jimp.MIME_PNG)
                        .then(base64 => {
                            const img = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
                            res.writeHead(200, {
                                "Content-Type": "image/jpg",
                                "Content-Length": img.length
                            });
                            return res.end(img);
                        })
                });
        }
    }
}