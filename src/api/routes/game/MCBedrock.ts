import {NextFunction, Request, Response} from "express";
import QueryUtil from "minecraft-server-util";
import ErrorUtil from "../../util/ErrorUtil";

export default class MCBedrock {

    public static queryBedrockServer(req: Request, res: Response, next: NextFunction) {
        const host = req.query.host as string;
        const port = req.query.port as string;
        const parsedPort = parseInt(port);
        try {
            QueryUtil.queryFull(host, {port: parsedPort || 19132, enableSRV: true})
                .then(response => {
                    return res.status(200).json({
                        status: 200,
                        host: response.host || null,
                        port: response.port || null,
                        srvRecord: response.srvRecord || null,
                        gameType: response.gameType || null,
                        version: response.version || null,
                        software: response.software || null,
                        plugins: response.plugins || null,
                        levelName: response.levelName || null,
                        latency: response.roundTripLatency || null,
                        players: {
                            online: response.onlinePlayers || null,
                            max: response.maxPlayers || null,
                            list: response.players || null
                        },
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                }).catch(() => {
                    return ErrorUtil.sent504Status(req, res);
                });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}