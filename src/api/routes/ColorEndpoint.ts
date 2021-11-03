import {Request, Response} from "express";
import Jimp from "jimp";
import colors from "hex-colors-info";
import ErrorUtil from "../util/ErrorUtil";

export default class ColorEndpoint {

    /*
     The endpoint listener to retrieve data on a specific hex color.
     @header none
     @uri /v1/color?hex=#F8B112&format=json
     @param hex: string
     @param format: string <json, png, jpg>
     */

    public static async hexToImage(req: Request, res: Response) {
        const hex = req.query.hex as string;
        const format = req.query.format as string;
        if (format === "json") {
            try {
                const colorInfo = colors(hex);
                return res.status(200).json({
                    status: 200,
                    hex: hex,
                    name: colorInfo.name,
                    hueHex: colorInfo.hueHex,
                    hueName: colorInfo.hueName,
                    match: colorInfo.match,
                    image: "https://app.ponjo.club/v1/color/img?hex=" + hex + "&format=png",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            } catch (error) {
                return ErrorUtil.sent500Status(req, res);
            }
        } else {
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
}