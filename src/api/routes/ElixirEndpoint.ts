/*
 * Copyright © 2022 Ben Petrillo. All rights reserved.
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
import Config from "../config/Config";
import APIUtil from "../util/api/APIUtil";
import ErrorUtil from "../util/ErrorUtil";
import fetch from "node-fetch";

export default class ElixirEndpoint {

    /**
     * Get info on the currently playing track in a guil.d
     * @method GET
     * @header Authentication: token
     * @uri /v1/elixir/nowplaying?guild=9837624923642894376
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async getNowPlayingTrackInGuild(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const host: string = Config.get("ELIXIR-API-HOST");
        const port: string = Config.get("ELIXIR-API-PORT");
        if (!guild) {
            return ErrorUtil.send400Status(req, res);
        }
        try {
            await fetch(`http://${host}:${port}/player?guildId=${guild}&action=nowplaying`)
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode === 404) {
                        return res.status(404).json({
                            status: 404,
                            message: "No song is currently playing.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        nowplaying: data,
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Get the music queue for a guild.
     * @method GET
     * @header Authentication: token
     * @uri /v1/elixir/queue?guild=9837624923642894376
     * @param guild: string
     * @param query: base64 string
     * @return Promise<Express.Response|any>
     */

    public static async getGuildMusicQueue(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const host: string = Config.get("ELIXIR-API-HOST");
        const port: string = Config.get("ELIXIR-API-PORT");
        if (!guild) {
            return ErrorUtil.send400Status(req, res);
        }
        try {
            await fetch(`http://${host}:${port}/queue?guildId=${guild}&action=queue`)
                .then(response => response.text())
                .then(data => {
                    return res.status(200).json({
                        status: 200,
                        queue: JSON.parse(Buffer.from(data, "base64url").toString()),
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Pause the currently playing track in a guild queue.
     * @method POST
     * @header Authentication: token
     * @uri /v1/elixir/pause?guild=9837624923642894376
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async pausePlayer(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const host: string = Config.get("ELIXIR-API-HOST");
        const port: string = Config.get("ELIXIR-API-PORT");
        if (!guild) {
            return ErrorUtil.send400Status(req, res);
        }
        try {
            await fetch(`http://${host}:${port}/player?guildId=${guild}&action=pause`)
                .then(response => response.text())
                .then(data => {
                    if (data.statusCode === 404) {
                        return res.status(404).json({
                            status: 404,
                            message: "There is no queue in that guild.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: "Successfully paused the player.",
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Resume the currently paused track in a guild.
     * @method POST
     * @header Authentication: token
     * @uri /v1/elixir/resume?guild=9837624923642894376
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async resumePlayer(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const host: string = Config.get("ELIXIR-API-HOST");
        const port: string = Config.get("ELIXIR-API-PORT");
        if (!guild) {
            return ErrorUtil.send400Status(req, res);
        }
        try {
            await fetch(`http://${host}:${port}/player?guildId=${guild}&action=resume`)
                .then(response => response.text())
                .then(data => {
                    if (data.statusCode === 404) {
                        return res.status(404).json({
                            status: 404,
                            message: "There is no queue in that guild.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: "Successfully resumed the player.",
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Shuffle the music queue in a guild.
     * @method POST
     * @header Authentication: token
     * @uri /v1/elixir/shuffle?guild=9837624923642894376
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async shufflePlayer(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const host: string = Config.get("ELIXIR-API-HOST");
        const port: string = Config.get("ELIXIR-API-PORT");
        if (!guild) {
            return ErrorUtil.send400Status(req, res);
        }
        try {
            await fetch(`http://${host}:${port}/player?guildId=${guild}&action=shuffle`)
                .then(response => response.text())
                .then(data => {
                    if (data.statusCode === 404) {
                        return res.status(404).json({
                            status: 404,
                            message: "There is no queue in that guild.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: "Successfully shuffled the music queue.",
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Skip to the next track in a guild's queue.
     * @method POST
     * @header Authentication: token
     * @uri /v1/elixir/skip?guild=9837624923642894376
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async skipPlayer(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const host: string = Config.get("ELIXIR-API-HOST");
        const port: string = Config.get("ELIXIR-API-PORT");
        if (!guild) {
            return ErrorUtil.send400Status(req, res);
        }
        try {
            await fetch(`http://${host}:${port}/player?guildId=${guild}&action=skip`)
                .then(response => response.text())
                .then(data => {
                    if (data.statusCode === 404) {
                        return res.status(404).json({
                            status: 404,
                            message: "No song is currently playing.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                    return res.status(200).json({
                        status: 200,
                        message: "Successfully skipped to the next track.",
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Play a music track in a guild.
     * @method POST
     * @header Authentication: token
     * @uri /v1/elixir/play?guild=9837624923642894376&query=aHR0cHM6Ly93d3cueW9
     * @param guild: string
     * @param query: base64 string
     * @return Promise<Express.Response|any>
     */

    public static async playTrackInGuild(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const searchQuery: string = req.query.query as string;
        const host: string = Config.get("ELIXIR-API-HOST");
        const port: string = Config.get("ELIXIR-API-PORT");
        if (!guild || !searchQuery) {
            return ErrorUtil.send400Status(req, res);
        }
        try {
            await fetch(`http://${host}:${port}/player?guildId=${guild}&action=play&query=${APIUtil.base64Encode(decodeURIComponent(searchQuery))}`)
                .then(response => response.text())
                .then(data => {
                    return res.status(200).json({
                        status: 200,
                        data: JSON.parse(Buffer.from(data, "base64url").toString()),
                        timestamps: APIUtil.getTimestamps()
                    });
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }
}