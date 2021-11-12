import {Request, Response} from "express";
import AvatarUtil from "../util/api/AvatarUtil";
import ErrorUtil from "../util/ErrorUtil";
import PrideUtil from "../util/api/PrideUtil";
import ResponseUtil from "../util/api/ResponseUtil";

export default class LGBTQEndpoint {

    public static async sendPrideFlag(req: Request, res: Response) {
        const query = req.query.query || req.params.query as string;
        const all: string = req.query.all as string;
        if (!query) {
            if (JSON.parse(all) == true) {
                return res.status(200).json({
                    status: res.statusCode,
                    data: await PrideUtil.getFlag("pride", true),
                    timestamps: ResponseUtil.getTimestamps()
                });
            } else {
                return res.status(200).sendFile(await PrideUtil.getFlag("pride"))
            }
        } else {
            try {
                if (all) {
                    return res.status(200).json({
                        status: res.statusCode,
                        data: await PrideUtil.getFlag("pride", true),
                        timestamps: ResponseUtil.getTimestamps()
                    });
                } else {
                    return res.status(200).sendFile(await PrideUtil.getFlag(<string> query));
                }
            } catch (error) {
                return ErrorUtil.sent500Status(req, res);
            }
        }
    }

    public static async sendFlairedAvatar(req: Request, res: Response): Promise<Response> {
        const flair: string = req.query.flair as string;
        const avatar: string = req.query.avatar as string;
        const format: string = req.query.format as string;
        if (!flair || !avatar) {
            return res.status(500).json({
                status: res.statusCode,
                message: "Invalid syntax.",
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                }
            });
        }
        let result;
        if (format === "base64") {
            switch (flair.toLowerCase()) {
                case "aro":
                case "aromantic":
                    result = await AvatarUtil.getFlairedAvatar("Aromantic", avatar, true);
                    break;
                case "ace":
                case "asexual":
                    result = await AvatarUtil.getFlairedAvatar("Asexual", avatar, true);
                    break;
                case "bi":
                case "bisexual":
                    result = await AvatarUtil.getFlairedAvatar("Bisexual", avatar, true);
                    break;
                case "enby":
                case "nonbinary":
                    result = await AvatarUtil.getFlairedAvatar("Nonbinary", avatar, true);
                    break;
                case "lgbt":
                case "lgbtq":
                case "pride":
                case "rainbow":
                    result = await AvatarUtil.getFlairedAvatar("LGBT", avatar,true);
                    break;
                case "pan":
                case "pansexual":
                    result = await AvatarUtil.getFlairedAvatar("Pansexual", avatar, true);
                    break;
                case "progress":
                case "progresspride":
                    result = await AvatarUtil.getFlairedAvatar("ProgressPride", avatar, true);
                    break;
                case "trans":
                case "transgender":
                case "transmasc":
                case "transfemme":
                    result = await AvatarUtil.getFlairedAvatar("Transgender", avatar, true);
                    break;
                default:
                    return ErrorUtil.sent500Status(req, res);
            }
            return res.status(200).json({
                status: 200,
                timestamps: {
                    date: new Date().toLocaleString(),
                    unix: Math.round(+ new Date() / 1000),
                },
                image: {
                    flair: flair,
                    input: avatar,
                    output: result
                }
            });
        } else {
            switch (flair.toLowerCase()) {
                case "lgbt":
                case "lgbtq":
                case "rainbow":
                    result = await AvatarUtil.getFlairedAvatar("LGBT", avatar);
                    break;
                case "pride":
                case "progress":
                case "progresspride":
                    result = await AvatarUtil.getFlairedAvatar("ProgressPride", avatar);
                    break;
                case "enby":
                case "nonbinary":
                    result = await AvatarUtil.getFlairedAvatar("Nonbinary", avatar);
                    break;
                case "ace":
                case "asexual":
                    result = await AvatarUtil.getFlairedAvatar("Asexual", avatar);
                    break;
                case "aro":
                case "aromantic":
                    result = await AvatarUtil.getFlairedAvatar("Aromantic", avatar);
                    break;
                case "bi":
                case "bisexual":
                    result = await AvatarUtil.getFlairedAvatar("Bisexual", avatar);
                    break;
                case "pan":
                case "pansexual":
                    result = await AvatarUtil.getFlairedAvatar("Pansexual", avatar);
                    break;
                case "trans":
                case "transgender":
                case "transmasc":
                case "transfemme":
                    result = await AvatarUtil.getFlairedAvatar("Transgender", avatar);
                    break;
                default:
                    return ErrorUtil.sent500Status(req, res);
            }
            switch (format) {
                case "png":
                    res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Content-Length": result.length
                    });
                    res.end(result);
                    break;
                case "jpg":
                case "jpeg":
                    res.writeHead(200, {
                        "Content-Type": "image/jpg",
                        "Content-Length": result.length
                    });
                    res.end(result);
                    break;
                default:
                    res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Content-Length": result.length
                    });
                    res.end(result);
            }
        }
    }
}