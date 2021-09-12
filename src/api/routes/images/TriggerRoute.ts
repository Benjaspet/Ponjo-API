import {Request, Response} from "express";
import {Canvacord, Util} from "canvacord";

export default class TriggerRoute {

    public static async triggerImage(req: Request, res: Response) {

        const image = "https://cdn.discordapp.com/attachments/766461626940915722/875709507488059473/Mew.jpg";
        const result = await Canvacord.trigger(image);
        const data = result.toString("base64");
        const img = Buffer.from(data, "base64");

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });

        return res.end(img);

    }
}