import {Request, Response} from "express";
import AvatarGenerator from "../../generators/AvatarGenerator";
import ErrorUtil from "../../util/ErrorUtil";

export default class AvatarRoute {

    public static async sendPrideFlairedAvatar(req: Request, res: Response): Promise<Response> {
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
                case "lgbt":
                case "lgbtq":
                case "pride":
                case "rainbow":
                    result = await AvatarGenerator.getFlairedAvatar("LGBT", true);
                    break;
                case "progress":
                case "progresspride":
                    result = await AvatarGenerator.getFlairedAvatar("ProgressPride", true);
                    break;
                case "enby":
                case "nonbinary":
                    result = await AvatarGenerator.getFlairedAvatar("Nonbinary", true);
                    break;
                case "ace":
                case "asexual":
                    result = await AvatarGenerator.getFlairedAvatar("Asexual", true);
                    break;
                case "aro":
                case "aromantic":
                    result = await AvatarGenerator.getFlairedAvatar("Aromantic", true);
                    break;
                case "bi":
                case "bisexual":
                    result = await AvatarGenerator.getFlairedAvatar("Bisexual", true);
                    break;
                case "pan":
                case "pansexual":
                    result = await AvatarGenerator.getFlairedAvatar("Pansexual", true);
                    break;
                case "trans":
                case "transgender":
                case "transmasc":
                case "transfemme":
                    result = await AvatarGenerator.getFlairedAvatar("Transgender", true);
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
                    result = await AvatarGenerator.getFlairedAvatar("LGBT");
                    break;
                case "pride":
                case "progress":
                case "progresspride":
                    result = await AvatarGenerator.getFlairedAvatar("ProgressPride");
                    break;
                case "enby":
                case "nonbinary":
                    result = await AvatarGenerator.getFlairedAvatar("Nonbinary");
                    break;
                case "ace":
                case "asexual":
                    result = await AvatarGenerator.getFlairedAvatar("Asexual");
                    break;
                case "aro":
                case "aromantic":
                    result = await AvatarGenerator.getFlairedAvatar("Aromantic");
                    break;
                case "bi":
                case "bisexual":
                    result = await AvatarGenerator.getFlairedAvatar("Bisexual");
                    break;
                case "pan":
                case "pansexual":
                    result = await AvatarGenerator.getFlairedAvatar("Pansexual");
                    break;
                case "trans":
                case "transgender":
                case "transmasc":
                case "transfemme":
                    result = await AvatarGenerator.getFlairedAvatar("Transgender");
                    break;
                default:
                    return ErrorUtil.sent500Status(req, res);
            }
            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": result.length
            });
            res.end(result);
        }
    }
}