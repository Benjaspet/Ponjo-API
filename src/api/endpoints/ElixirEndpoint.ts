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
import APIUtil from "../util/api/APIUtil";
import ErrorUtil from "../util/ErrorUtil";
import axios from "axios";
import Constants from "../../Constants";
import Logger from "../../Logger";

export default class ElixirEndpoint {

    /**
     * Get info on the currently playing track in a guild.
     * @method GET
     * @header Authentication: token
     * @uri /v1/elixir/nowplaying?guild=9837624923642894376&bot=838118537276031006
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async getNowPlayingTrackInGuild(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        Logger.info(Constants.ELIXIR_API_PORT)
        Logger.info(Constants.ELIXIR_PREMIUM_API_PORT)
        Logger.info(Constants.ELIXIR_TWO_API_PORT)
        Logger.info(Constants.ELIXIR_BLUE_API_PORT)
        try {
            await axios.get(`http://${host}:${port}/player?guildId=${guild}&action=nowplaying`)
                .then(data => {
                    return res.status(200).json({
                        status: 200,
                        nowplaying: JSON.parse(APIUtil.base64Decode(data.data)),
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status === 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "Unable to fetch the queue.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
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
     * @uri /v1/elixir/queue?guild=9837624923642894376&bot=838118537276031006
     * @param guild: string
     * @param query: base64 string
     * @return Promise<Express.Response|any>
     */

    public static async getGuildMusicQueue(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            await axios.get(`http://${host}:${port}/queue?guildId=${guild}&action=queue`)
                .then(data => {
                    if (data.status === 200) {
                        return res.status(200).json({
                            status: 200,
                            queue: JSON.parse(Buffer.from(data.data, "base64url").toString()),
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                }).catch(error => {
                    if (error.response.data.status === 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "Unable to fetch the queue.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
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
     * @uri /v1/elixir/pause?guild=9837624923642894376&bot=838118537276031006
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async pausePlayer(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            await axios.get(`http://${host}:${port}/player?guildId=${guild}&action=pause`)
                .then(data => {
                    if (data.status === 200) {
                        return res.status(200).json({
                            status: 200,
                            message: "Successfully paused the player.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "Unable to pause the player.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
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
     * @uri /v1/elixir/resume?guild=9837624923642894376&bot=838118537276031006
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async resumePlayer(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            await axios.get(`http://${host}:${port}/player?guildId=${guild}&action=resume`)
                .then(data => {
                    if (data.status === 200) {
                        return res.status(200).json({
                            status: 200,
                            message: "Successfully resumed the player.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "Unable to resume the player.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
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
     * @uri /v1/elixir/skip?guild=9837624923642894376&bot=838118537276031006
     * @return Promise<Express.Response|any>
     */

    public static async skipToNextTrack(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            await axios.get(`http://${host}:${port}/player?guildId=${guild}&action=skip`)
                .then(data => {
                    if (data.status === 200) {
                        return res.status(200).json({
                            status: 200,
                            message: "Successfully skipped to the next track.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "Unable to skip to the next track.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
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
     * @uri /v1/elixir/shuffle?guild=9837624923642894376&bot=838118537276031006
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async shufflePlayer(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            await axios.get(`http://${host}:${port}/queue?guildId=${guild}&action=shuffle`)
                .then(() => {
                    return res.status(200).json({
                        status: 200,
                        message: "Successfully shuffled the queue.",
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "There is no queue in that guild.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
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
     * @uri /v1/elixir/play?guild=9837624923642894376&query=aHR0cHM6Ly93d3cueW9&bot=838118537276031006
     * @param guild: string
     * @param query: base64 string
     * @return Promise<Express.Response|any>
     */

    public static async playTrackInGuild(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        let searchQuery: string = req.query.query as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot || !searchQuery) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            if (Buffer.from(searchQuery, "base64").toString("base64") !== searchQuery) {
                searchQuery = APIUtil.base64Encode(decodeURIComponent(searchQuery));
            } else {
                searchQuery = decodeURIComponent(searchQuery);
            }
            await axios.get(`http://${host}:${port}/player?guildId=${guild}&action=play&query=${searchQuery}`)
                .then(data => {
                    return res.status(200).json({
                        status: 200,
                        data: JSON.parse(APIUtil.base64Decode(data.data)),
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "The bot may not be in a voice channel.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Fetch a playlist by ID.
     * @method GET
     * @header Authentication: token
     * @uri /v1/elixir/playlist/fetch?id=eeries-playlist
     * @param id: string
     * @return Promise<Express.Response|any>
     */

    public static async fetchPlaylist(req: Request, res: Response): Promise<any> {
        const id: string = req.query.id as string;
        if (!id) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = Constants.ELIXIR_API_PORT;
        try {
            if (!id) return ErrorUtil.send400Status(req, res);
            await axios.get(`http://${host}:${port}/playlist?playlistId=${id}&action=fetch`)
                .then(response => {
                    return res.status(200).json({
                        status: 200,
                        data: JSON.parse(APIUtil.base64Decode(response.data)),
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Custom playlist not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "The bot may not be in a voice channel.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Queue a playlist by ID.
     * @method GET
     * @header Authentication: token
     * @uri /v1/elixir/playlist/queue?id=eeries-playlist&guild=9837624923642894376&channel=6428943769837624923
     * @param id: string
     * @return Promise<Express.Response|any>
     */

    public static async queuePlaylist(req: Request, res: Response): Promise<any> {
        const id: string = req.query.id as string;
        const guild: string = req.query.guild as string;
        const channel: string = req.query.channel as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot || !channel || !id) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            if (!id || !guild || !channel) {
                return ErrorUtil.send400Status(req, res);
            }
            await axios.get(`http://${host}:${port}/playlist?guildId=${guild}&action=queue&playlistId=${id}&channelId=${channel}`)
                .then(() => {
                    return res.status(200).json({
                        status: 200,
                        messages: "Successfully queued the custom playlist.",
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Custom playlist or guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "The bot may not be in a voice channel.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }
                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Have Elixir join a voice channel.
     * @method POST
     * @header Authentication: token
     * @uri /v1/elixir/join?guild=9837624923642894376&channel=887526479360065601&bot=838118537276031006
     * @param guild: string
     * @return Promise<Express.Response|any>
     */

    public static async joinChannel(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const channel: string = req.query.channel as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot || !channel) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            await axios.get(`http://${host}:${port}/player/join?guildId=${guild}&channelId=${channel}`)
                .then(() => {
                    return res.status(200).json({
                        status: 200,
                        message: "Successfully joined the voice channel.",
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "Unable to join the voice channel.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }

                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }

    public static async stopQueue(req: Request, res: Response): Promise<any> {
        const guild: string = req.query.guild as string;
        const channel: string = req.query.channel as string;
        const bot: string = req.query.bot as string;
        if (!guild || !bot || !channel) return ErrorUtil.send400Status(req, res);
        const host: string = Constants.HOST_ADDRESS;
        const port: string = APIUtil.getPortByBotID(bot);
        try {
            await axios.get(`http://${host}:${port}/player/stop?guildId=${guild}&action=stop`)
                .then(() => {
                    return res.status(200).json({
                        status: 200,
                        message: "Successfully stopped the queue and left the voice channel.",
                        timestamps: APIUtil.getTimestamps()
                    });
                }).catch(error => {
                    console.log(error);
                    if (error.response.data.status == 404) {
                        return res.status(410).json({
                            status: 410,
                            message: "Guild not found.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    } else {
                        return res.status(410).json({
                            status: 410,
                            message: "Unable to stop the queue.",
                            timestamps: APIUtil.getTimestamps()
                        });
                    }

                });
        } catch (error) {
            console.log(error);
            return ErrorUtil.sent500Status(req, res);
        }
    }
}