import {Request, Response} from "express";
import AvatarGenerator from "../../generators/AvatarGenerator";

export default class AvatarRoute {

    public static async sendPrideFlairedAvatar(req: Request, res: Response): Promise<Response> {
        const flair: string = req.query.flair as string;
        const avatar: string = req.query.avatar as string;
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
        switch (flair.toLowerCase()) {
            case "lgbt":
            case "lgbtq":
            case "pride":
            case "rainbow":
                result = await AvatarGenerator.getFlairedAvatar("LGBT");
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
            case "trans":
            case "transgender":
            case "transmasc":
            case "transfemme":
                result = await AvatarGenerator.getFlairedAvatar("LGBT");
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
            default:
                return res.status(500).json({
                    status: res.statusCode,
                    message: "Invalid syntax.",
                    timestamps: {
                        date: new Date().toLocaleString(),
                        unix: Math.round(+ new Date() / 1000),
                    }
                });
        }
    }
}