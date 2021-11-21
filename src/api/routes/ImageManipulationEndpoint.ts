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
     @return Promise<Express.Response|void>
     */

    public static async sendGayImage(req: Request, res: Response): Promise<Response|void> {
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
     @return Promise<Express.Response|void>
     */

    public static async sendJailedImage(req: Request, res: Response): Promise<Response|void> {
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

    /*
     Add a "triggered" effect to an image.
     @method POST
     @header none
     @uri /v1/img/trigger?image=<image-url>
     @param image: <uri-encoded> string
     @param format: string <base64, png, jpg>
     */

    public static async sendTriggeredImage(req: Request, res: Response) {
        const image = req.query.image as string;
        const format = req.query.format as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.trigger(image);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            if (!format) {
                res.writeHead(200, {
                    "Content-Type": "image/gif",
                    "Content-Length": img.length
                });
                return res.end(img);
            } else {
                switch (format) {
                    case "jpeg":
                    case "jpg":
                        res.writeHead(200, {
                            "Content-Type": "image/jpg",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "png":
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "gif":
                    default:
                        res.writeHead(200, {
                            "Content-Type": "image/gif",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                }
            }

        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Make an image circular.
     @method POST
     @header none
     @uri /v1/img/circle?image=<image-url>&format=png
     @param image: <uri-encoded> string
     @param format: string <png, jpg>
     */

    public static async sendCircularImage(req: Request, res: Response) {
        const image = req.query.image as string;
        const format = req.query.format as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.circle(image);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            if (!format) {
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": img.length
                });
                return res.end(img);
            } else {
                switch (format) {
                    case "jpeg":
                    case "jpg":
                        res.writeHead(200, {
                            "Content-Type": "image/jpg",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "png":
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "gif":
                    default:
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                }
            }

        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Give an image a burn effect.
     @method POST
     @header none
     @uri /v1/img/burn?image=<image-url>&intensity=2&format=png
     @param image: <uri-encoded> string
     @param intensity: int
     @param format: string <png, jpg>
     */

    public static async sendBurningImage(req: Request, res: Response) {
        const image = req.query.image as string;
        const intensity = req.query.intensity as string;
        const format = req.query.format as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.burn(image, parseInt(intensity) || 1);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            if (!format) {
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": img.length
                });
                return res.end(img);
            } else {
                switch (format) {
                    case "jpeg":
                    case "jpg":
                        res.writeHead(200, {
                            "Content-Type": "image/jpg",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "png":
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "gif":
                    default:
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                }
            }

        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Give an image a facepalm effect.
     @method POST
     @header none
     @uri /v1/img/facepalm?image=<image-url>&format=png
     @param image: <uri-encoded> string
     @param format: string <png, jpg>
     */

    public static async sendFacepalmImage(req: Request, res: Response) {
        const image = req.query.image as string;
        const format = req.query.format as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.facepalm(image);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            if (!format) {
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": img.length
                });
                return res.end(img);
            } else {
                switch (format) {
                    case "jpeg":
                    case "jpg":
                        res.writeHead(200, {
                            "Content-Type": "image/jpg",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "png":
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "gif":
                    default:
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                }
            }

        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Give an image a pixelated effect.
     @method POST
     @header none
     @uri /v1/img/pixelate?image=<image-url>&pixels=32&format=png
     @param image: <uri-encoded> string
     @param pixels: int
     @param format: string <png, jpg>
     */

    public static async sendPixelatedImage(req: Request, res: Response) {
        const image = req.query.image as string;
        const pixels = req.query.pixels as string;
        const format = req.query.format as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.pixelate(image, parseInt(pixels) || 32);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            if (!format) {
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": img.length
                });
                return res.end(img);
            } else {
                switch (format) {
                    case "jpeg":
                    case "jpg":
                        res.writeHead(200, {
                            "Content-Type": "image/jpg",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "png":
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "gif":
                    default:
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                }
            }

        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /*
     Give an image a RIP effect.
     @method POST
     @header none
     @uri /v1/img/rip?image=<image-url>&format=png
     @param image: <uri-encoded> string
     @param format: string <png, jpg>
     */

    public static async sendRipEffect(req: Request, res: Response) {
        const image = req.query.image as string;
        const format = req.query.format as string;
        if (!image) return ErrorUtil.sent500Status(req, res);
        try {
            const result = await Canvacord.rip(image);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");
            if (!format) {
                res.writeHead(200, {
                    "Content-Type": "image/png",
                    "Content-Length": img.length
                });
                return res.end(img);
            } else {
                switch (format) {
                    case "jpeg":
                    case "jpg":
                        res.writeHead(200, {
                            "Content-Type": "image/jpg",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "png":
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                    case "gif":
                    default:
                        res.writeHead(200, {
                            "Content-Type": "image/png",
                            "Content-Length": img.length
                        });
                        return res.end(img);
                }
            }

        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}