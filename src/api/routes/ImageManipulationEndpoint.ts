import {Request, Response} from "express";
import {Canvacord} from "canvacord";
import ErrorUtil from "../util/ErrorUtil";

export default class ImageManipulationEndpoint {

    /*
     Add rainbow effects to an image.
     @method POST
     @header none
     @uri /v1/img/gay?image=<image-url>
     @param image: <uri-encoded> string
     */

    public static async sendGayImage(req: Request, res: Response) {
        const image = req.query.image as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.rainbow(image);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": img.length
            });
            return res.end(img);
        } catch (error) {
            if (res.status(403)) {
                return res.status(403).json({
                    status: 403,
                    message: "An error occurred. Is your image URL valid?",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
        }
    }

    /*
     Add a jail effect to an image.
     @method POST
     @header none
     @uri /v1/img/jail?image=<image-url>
     @param image: <uri-encoded> string
     */

    public static async sendJailedImage(req: Request, res: Response) {
        const image = req.query.image as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.jail(image, true);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": img.length
            });
            return res.end(img);
        } catch (error) {
            if (res.status(403)) {
                return res.status(403).json({
                    status: 403,
                    message: "An error occurred. Is your image URL valid?",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
            }
        }
    }
}