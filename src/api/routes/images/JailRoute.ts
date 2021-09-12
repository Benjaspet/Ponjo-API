import {Request, Response} from "express";
import {Canvacord, Util} from "canvacord";

export default class JailRoute {

    public static async jailImage(req: Request, res: Response) {

        const image = "https://cdn.discordapp.com/attachments/766461626940915722/875709507488059473/Mew.jpg";
        const result = await Canvacord.jail(image, false);
        const data = result.toString("base64");
        const img = Buffer.from(data, "base64");

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });

        return res.end(img);

    }
}