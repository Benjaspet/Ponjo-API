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
import orientations from "../data/lgbtq/Orientations";
import AvatarUtil from "../util/api/AvatarUtil";
import ErrorUtil from "../util/ErrorUtil";
import PrideUtil from "../util/api/PrideUtil";
import APIUtil from "../util/api/APIUtil";

export default class LGBTQEndpoint {

    /**
     * Send a pride flag image.
     * @method GET
     * @header none
     * @uri /v1/pride/flags?type=asexual
     * @uri /v1/pride/flags/asexual
     * @param type: string
     * @return Promise<Express.Reponse|void>
     */

    public static async sendPrideFlag(req: Request, res: Response): Promise<Response|void> {
        const query = req.query.type || req.params.type as string;
        if (!query) {
            return res.status(200).json({
                status: res.statusCode,
                message: res.statusMessage,
                data: await PrideUtil.getFlag("pride", true),
                timestamps: APIUtil.getTimestamps()
            });
        } else {
            try {
                return res.status(200).sendFile(await PrideUtil.getFlag(<string> query));
            } catch (error) {
                return ErrorUtil.sent500Status(req, res);
            }
        }
    }

    /**
     * Search for a sexual or romantic orientation.
     * @method GET
     * @header none
     * @uri /v1/pride/orientations?type=sexual&q=asexual
     * @param type: string
     * @param q: string
     * @return Promise<Express.Response>
     */

    public static async searchForOrientation(req: Request, res: Response): Promise<Response> {
        const type = req.query.type || "sexual" as string;
        const query = req.query.q as string;
        try {
            switch (type) {
                case "sexual":
                    const filtered = orientations[0].filter(type => type.name.toLowerCase().startsWith(query));
                    return res.status(200).json({
                        status: res.statusCode,
                        filterType: type,
                        data: filtered,
                        timestamps: APIUtil.getTimestamps()
                    });
                case "romantic":
                    const filtered2 = orientations[1].filter(type => type.name.toLowerCase().startsWith(query));
                    return res.status(200).json({
                        status: res.statusCode,
                        filterType: type,
                        data: filtered2,
                        timestamps: APIUtil.getTimestamps()
                    });
                default:
                    const filtered3 = orientations[0].filter(type => type.name.toLowerCase().startsWith(query));
                    return res.status(200).json({
                        status: res.statusCode,
                        filterType: type,
                        data: filtered3,
                        timestamps: APIUtil.getTimestamps()
                    });
            }
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }

    /**
     * Add pride flairs to an avatar.
     * @method POST
     * @header none
     * @uri /pride/avatar?flair=abrosexual&avatar=<url-encoded>&format=png
     * @param flair: string
     * @param avatar: <uri-encoded> string
     * @param format?: string
     * @return Promise<Express.Response>
     */

    public static async sendFlairedAvatar(req: Request, res: Response): Promise<Response> {
        const flair: string = req.query.flair as string;
        const avatar: string = req.query.avatar as string;
        const format: string = req.query.format as string;
        if (!flair || !avatar) return ErrorUtil.send400Status(req, res);
        let result;
        if (format === "base64") {
            switch (flair.toLowerCase()) {
                case "abro":
                case "abrosexual":
                    result = await AvatarUtil.getFlairedAvatar("Abrosexual", avatar, true);
                    break;
                case "agender":
                    result = await AvatarUtil.getFlairedAvatar("Agender", avatar, true);
                    break;
                case "alloromantic":
                    result = await AvatarUtil.getFlairedAvatar("Alloromantic", avatar, true);
                    break;
                case "aro":
                case "aromantic":
                    result = await AvatarUtil.getFlairedAvatar("Aromantic", avatar, true);
                    break;
                case "aroace":
                    result = await AvatarUtil.getFlairedAvatar("AroAce", avatar, true);
                    break;
                case "ace":
                case "asexual":
                    result = await AvatarUtil.getFlairedAvatar("Asexual", avatar, true);
                    break;
                case "bigender":
                    result = await AvatarUtil.getFlairedAvatar("Bigender", avatar, true);
                    break;
                case "biromantic":
                    result = await AvatarUtil.getFlairedAvatar("Biromantic", avatar, true);
                    break;
                case "bi":
                case "bisexual":
                    result = await AvatarUtil.getFlairedAvatar("Bisexual", avatar, true);
                    break;
                case "ceterosexual":
                    result = await AvatarUtil.getFlairedAvatar("Ceterosexual", avatar, true);
                    break;
                case "demiboy":
                    result = await AvatarUtil.getFlairedAvatar("Demiboy", avatar, true);
                    break;
                case "demigirl":
                    result = await AvatarUtil.getFlairedAvatar("Demigirl", avatar, true);
                    break;
                case "demiro":
                case "demiromantic":
                    result = await AvatarUtil.getFlairedAvatar("Demiromantic", avatar, true);
                    break;
                case "demisexual":
                case "demi":
                    result = await AvatarUtil.getFlairedAvatar("Demisexual", avatar, true);
                    break;
                case "gay":
                    result = await AvatarUtil.getFlairedAvatar("Gay", avatar, true);
                    break;
                case "genderfluid":
                    result = await AvatarUtil.getFlairedAvatar("Genderfluid", avatar, true);
                    break;
                case "genderflux":
                    result = await AvatarUtil.getFlairedAvatar("Genderflux", avatar, true);
                    break;
                case "genderqueer":
                    result = await AvatarUtil.getFlairedAvatar("Genderqueer", avatar, true);
                    break;
                case "heterosexual":
                case "straight":
                    result = await AvatarUtil.getFlairedAvatar("Heterosexual", avatar, true);
                    break;
                case "intersex":
                    result = await AvatarUtil.getFlairedAvatar("Intersex", avatar, true);
                    break;
                case "lgbt":
                case "lgbtq":
                    result = await AvatarUtil.getFlairedAvatar("LGBT", avatar, true);
                    break;
                case "lesbian":
                    result = await AvatarUtil.getFlairedAvatar("Lesbian", avatar, true);
                    break;
                case "enby":
                case "nonbinary":
                    result = await AvatarUtil.getFlairedAvatar("Nonbinary", avatar, true);
                    break;
                case "lesbiromantic":
                    result = await AvatarUtil.getFlairedAvatar("Lesbiromantic", avatar, true);
                    break;
                case "monoromantic":
                    result = await AvatarUtil.getFlairedAvatar("Monoromantic", avatar, true);
                    break;
                case "multisexual":
                    result = await AvatarUtil.getFlairedAvatar("Multisexual", avatar, true);
                    break;
                case "neptunic":
                    result = await AvatarUtil.getFlairedAvatar("Neptunic", avatar, true);
                    break;
                case "omniromantic":
                    result = await AvatarUtil.getFlairedAvatar("Omniromantic", avatar, true);
                    break;
                case "omni":
                case "omnisexual":
                    result = await AvatarUtil.getFlairedAvatar("Omnisexual", avatar, true);
                    break;
                case "panromantic":
                    result = await AvatarUtil.getFlairedAvatar("Panromantic", avatar, true);
                    break;
                case "pan":
                case "pansexual":
                    result = await AvatarUtil.getFlairedAvatar("Pansexual", avatar, true);
                    break;
                case "polyamorous":
                    result = await AvatarUtil.getFlairedAvatar("Polyamorous", avatar, true);
                    break;
                case "polyromantic":
                    result = await AvatarUtil.getFlairedAvatar("Polyromantic", avatar, true);
                    break;
                case "polysexual":
                    result = await AvatarUtil.getFlairedAvatar("Polysexual", avatar, true);
                    break;
                case "pride":
                case "progresspride":
                    result = await AvatarUtil.getFlairedAvatar("ProgressPride", avatar, true);
                    break;
                case "sapphic":
                    result = await AvatarUtil.getFlairedAvatar("Sapphic", avatar, true);
                    break;
                case "trans":
                case "transgender":
                case "transmasc":
                case "transfemme":
                    result = await AvatarUtil.getFlairedAvatar("Transgender", avatar, true);
                    break;
                case "twospirit":
                    result = await AvatarUtil.getFlairedAvatar("TwoSpirit", avatar, true);
                    break;
                case "xenogender":
                    result = await AvatarUtil.getFlairedAvatar("Xenogender", avatar, true);
                    break;
                default:
                    result = await AvatarUtil.getFlairedAvatar("ProgressPride", avatar, true);
                    break;
            }
            return res.status(200).json({
                status: 200,
                timestamps: APIUtil.getTimestamps(),
                image: {
                    flair: flair,
                    input: avatar,
                    output: result
                }
            });
        } else {
            switch (flair.toLowerCase()) {
                case "abro":
                case "abrosexual":
                    result = await AvatarUtil.getFlairedAvatar("Abrosexual", avatar);
                    break;
                case "agender":
                    result = await AvatarUtil.getFlairedAvatar("Agender", avatar);
                    break;
                case "alloromantic":
                    result = await AvatarUtil.getFlairedAvatar("Alloromantic", avatar);
                    break;
                case "aro":
                case "aromantic":
                    result = await AvatarUtil.getFlairedAvatar("Aromantic", avatar);
                    break;
                case "aroace":
                    result = await AvatarUtil.getFlairedAvatar("AroAce", avatar);
                    break;
                case "ace":
                case "asexual":
                    result = await AvatarUtil.getFlairedAvatar("Asexual", avatar);
                    break;
                case "bigender":
                    result = await AvatarUtil.getFlairedAvatar("Bigender", avatar);
                    break;
                case "biromantic":
                    result = await AvatarUtil.getFlairedAvatar("Biromantic", avatar);
                    break;
                case "bi":
                case "bisexual":
                    result = await AvatarUtil.getFlairedAvatar("Bisexual", avatar);
                    break;
                case "demiboy":
                    result = await AvatarUtil.getFlairedAvatar("Demiboy", avatar);
                    break;
                case "demigirl":
                    result = await AvatarUtil.getFlairedAvatar("Demigirl", avatar);
                    break;
                case "demiro":
                case "demiromantic":
                    result = await AvatarUtil.getFlairedAvatar("Demiromantic", avatar);
                    break;
                case "demisexual":
                case "demi":
                    result = await AvatarUtil.getFlairedAvatar("Demisexual", avatar);
                    break;
                case "gay":
                    result = await AvatarUtil.getFlairedAvatar("Gay", avatar);
                    break;
                case "genderfluid":
                    result = await AvatarUtil.getFlairedAvatar("Genderfluid", avatar);
                    break;
                case "genderflux":
                    result = await AvatarUtil.getFlairedAvatar("Genderflux", avatar);
                    break;
                case "genderqueer":
                    result = await AvatarUtil.getFlairedAvatar("Genderqueer", avatar);
                    break;
                case "intersex":
                    result = await AvatarUtil.getFlairedAvatar("Intersex", avatar);
                    break;
                case "lgbt":
                case "lgbtq":
                    result = await AvatarUtil.getFlairedAvatar("LGBT", avatar);
                    break;
                case "lesbian":
                    result = await AvatarUtil.getFlairedAvatar("Lesbian", avatar);
                    break;
                case "enby":
                case "nonbinary":
                    result = await AvatarUtil.getFlairedAvatar("Nonbinary", avatar);
                    break;
                case "lesbiromantic":
                    result = await AvatarUtil.getFlairedAvatar("Lesbiromantic", avatar);
                    break;
                case "monoromantic":
                    result = await AvatarUtil.getFlairedAvatar("Monoromantic", avatar);
                    break;
                case "omniromantic":
                    result = await AvatarUtil.getFlairedAvatar("Omniromantic", avatar);
                    break;
                case "omni":
                case "omnisexual":
                    result = await AvatarUtil.getFlairedAvatar("Omnisexual", avatar);
                    break;
                case "panromantic":
                    result = await AvatarUtil.getFlairedAvatar("Panromantic", avatar);
                    break;
                case "pan":
                case "pansexual":
                    result = await AvatarUtil.getFlairedAvatar("Pansexual", avatar);
                    break;
                case "polyamorous":
                    result = await AvatarUtil.getFlairedAvatar("Polyamorous", avatar);
                    break;
                case "polyromantic":
                    result = await AvatarUtil.getFlairedAvatar("Polyromantic", avatar);
                    break;
                case "polysexual":
                    result = await AvatarUtil.getFlairedAvatar("Polysexual", avatar);
                    break;
                case "pride":
                case "progresspride":
                    result = await AvatarUtil.getFlairedAvatar("ProgressPride", avatar);
                    break;
                case "sapphic":
                    result = await AvatarUtil.getFlairedAvatar("Sapphic", avatar);
                    break;
                case "trans":
                case "transgender":
                case "transmasc":
                case "transfemme":
                    result = await AvatarUtil.getFlairedAvatar("Transgender", avatar);
                    break;
                case "twospirit":
                    result = await AvatarUtil.getFlairedAvatar("TwoSpirit", avatar);
                    break;
                case "xenogender":
                    result = await AvatarUtil.getFlairedAvatar("Xenogender", avatar);
                    break;
                default:
                    result = await AvatarUtil.getFlairedAvatar("ProgressPride", avatar);
                    break;
            }
            switch (format) {
                case "png":
                    res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Content-Length": result.length
                    });
                    res.end(result);
                    break;
                case "jpg":
                case "jpeg":
                    res.writeHead(200, {
                        "Content-Type": "image/jpg",
                        "Content-Length": result.length
                    });
                    res.end(result);
                    break;
                default:
                    res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Content-Length": result.length
                    });
                    res.end(result);
            }
        }
    }
}