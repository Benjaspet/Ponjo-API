import {NextFunction, Response, Request} from "express";
import QueryUtil from "minecraft-server-util";
import ErrorUtil from "../../util/ErrorUtil";
import APIUtil from "../../util/APIUtil";

export default class MCJava {

    public static async queryJavaServer(req: Request, res: Response, next: NextFunction) {
        const host = req.query.host as string;
        const port = req.query.port as string;
        const parsedPort = parseInt(port);
        try {
            QueryUtil.status(host, {port: parsedPort || 25560, enableSRV: true, timeout: 5000})
                .then(async response => {
                    return res.status(200).json({
                        status: 200,
                        host: response.host || null,
                        port: response.port || null,
                        srvRecord: response.srvRecord || null,
                        version: response.version || null,
                        protocolVersion: response.protocolVersion || null,
                        players: {
                            online: response.onlinePlayers || null,
                            maxOnline: response.maxPlayers || null,
                            list: response.samplePlayers || null
                        },
                        latency: response.roundTripLatency || null,
                        motd: {
                            version: {
                                name: response.rawResponse.version.name || null,
                                protocol: response.rawResponse.version.protocol || null
                            },
                            players: response.rawResponse.players || null,
                            favicon: response.rawResponse.favicon || null
                        },
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                })
                .catch(async error => {
                    console.log(error)
            })
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

}