/*
 * Copyright © 2021 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import {Request, Response} from "express";
import QueryUtil from "minecraft-server-util";
import ErrorUtil from "../util/ErrorUtil";
import Gamedig from "gamedig";
import APIUtil from "../util/api/APIUtil";
import Logger from "../../Logger";

export default class GameQueryEndpoint {

    /**
     * Returns a query of a Minecraft: Java Edition server.
     * @method GET
     * @header Authorization: token
     * @uri /v1/query/mcjava?host=lunar.gg&port=25565
     * @param host: string
     * @param port?: int
     * @return Promise<Express.Response>
     */

    public static async queryJavaServer(req: Request, res: Response): Promise<Response> {
        const host = req.query.host as string;
        const port = req.query.port as string;
        if (!host) return ErrorUtil.send400Status(req, res);
        const parsedPort = parseInt(port);
        try {
            QueryUtil.status(host, {port: parsedPort || 25560, enableSRV: true, timeout: 5000})
                .then(async response => {
                    return res.status(200).json({
                        status: res.statusCode,
                        message: res.statusMessage,
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
                        timestamps: APIUtil.getTimestamps()
                    });
                })
                .catch(async error => {
                    Logger.error(error.message);
                    return ErrorUtil.sent504Status(req, res);
                });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Returns a query of a Minecraft: Bedrock Edition server.
     * @method GET
     * @header Authorization: token
     * @uri /v1/query/mcbe?host=vasar.land&port=19132
     * @param host: string
     * @param port?: int
     * @return Promise<Express.Response>
     */

    public static async queryBedrockServer(req: Request, res: Response): Promise<Response> {
        const host = req.query.host as string;
        const port = req.query.port as string;
        if (!host) return ErrorUtil.send400Status(req, res);
        const parsedPort = parseInt(port);
        try {
            QueryUtil.queryFull(host, {port: parsedPort || 19132, enableSRV: true})
                .then(response => {
                    return res.status(200).json({
                        status: res.statusCode,
                        message: res.statusMessage,
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
                        timestamps: APIUtil.getTimestamps()
                    });
                })
                .catch(async error => {
                    Logger.error(error.message);
                    return ErrorUtil.sent504Status(req, res);
            });
        } catch (error) {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Query a Fivem server.
     * @header Authorization: token
     * @uri /v1/query/fivem?host=127.0.0.1&port=30210
     * @param host: string
     * @param port: int
     * @return Promise<Express.Response>
     */

    public static async queryFivemServer(req: Request, res: Response): Promise<Response> {
        const host: string = req.query.host as string;
        const port: string = req.query.port as string;
        if (!host || !port) return ErrorUtil.send400Status(req, res);
        await Gamedig.query({
            type: "fivem",
            host: host,
            port: parseInt(port),
            maxAttempts: 1
        }).then(response => {
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                data: {
                    name: response.name,
                    map: response.map,
                    players: {
                        online: response.players.length,
                        max: response.maxplayers,
                        list: response.players
                    },
                    assets: {
                        // @ts-ignore
                        vars: response.raw.info.vars,
                        // @ts-ignore
                        icon: response.raw.info.icon
                    }
                },
                timestamps: APIUtil.getTimestamps()
            });
        }).catch(error => {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        });
    }

    /**
     * Query an ARK: Survival Evolved server.
     * @method GET
     * @header Authorization: token
     * @uri /v1/query/fivem?host=127.0.0.1&port=30210
     * @param host: string
     * @param port: int
     * @return Promise<Express.Response>
     */

    public static async queryArkServer(req: Request, res: Response): Promise<Response> {
        const host: string = req.query.host as string;
        const port: string = req.query.port as string;
        if (!host || !port) return ErrorUtil.send400Status(req, res);
        await Gamedig.query({
            type: "arkse",
            host: host,
            port: parseInt(port),
            maxAttempts: 1
        }).then(response => {
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                data: response,
                timestamps: APIUtil.getTimestamps()
            });
        }).catch(error => {
            Logger.error(error.message);
            return ErrorUtil.sent500Status(req, res);
        });
    }
}