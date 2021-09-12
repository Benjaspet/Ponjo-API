import {Request, Response} from "express";
import {Canvacord, Util} from "canvacord";

export default class GayRoute {

    public static async gayImage(req: Request, res: Response) {

        try {
            const image = "https://cdn.discordapp.com/attachments/766461626940915722/875709507488059473/Mew.jpg";
            const result = await Canvacord.rainbow(image);
            const data = result.toString("base64");
            const img = Buffer.from(data, "base64");

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });

            return res.end(img);
        } catch (error) {
            if (res.status(403)) {
                return res.status(403).json({
                    status: 403,
                    message: "An error occurred."
                });
            }
        }
    }
}