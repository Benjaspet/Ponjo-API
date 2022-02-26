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

import {APITimestamps} from "../../structs/APIResponses";
import {APIData} from "../../structs/database/APIData";
import Models from "../../database/Models";
import Constants from "../../../Constants";

export default class APIUtil {

    public static getTimestamp(): string {
        return new Date().toLocaleTimeString();
    }

    public static getTimestamps(): APITimestamps {
        return {
            date: new Date().toLocaleString(),
            unix: Math.round(+ new Date() / 1000)
        }
    }

    public static generateUniqueId(): string {
        return "yxxx-4xx-xxxxxx".replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static async sleep(ms): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public static getMultipleElementsFromArray(array: string[], amount: number): string[] {
        return array.slice(0, amount)
    }

    public static async getTotalApiRequests(): Promise<APIData> {
        try {
            const result: any = await Models.Requests.findOne();
            return {
                requests: {
                    total: result.total,
                    gets: result.gets,
                    posts: result.posts,
                    patches: result.patches,
                    puts: result.puts,
                    deletes: result.deletes
                }
            };
        } catch (error) {}
    }

    public static shuffleArray(array: any[]): any[] {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }

    public static getDate(): string {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }

    public static getPortByBotID(bot: string): string {
        if (bot == Constants.ELIXIR_BOT_ID) {
            return Constants.ELIXIR_API_PORT;
        } else if (bot === Constants.ELIXIR_PREMIUM_BOT_ID) {
            return Constants.ELIXIR_PREMIUM_API_PORT;
        } else if (bot == Constants.ELIXIR_TWO_BOT_ID) {
            return Constants.ELIXIR_TWO_API_PORT;
        } else if (bot == Constants.ELIXIR_BLUE_BOT_ID) {
            return Constants.ELIXIR_BLUE_API_PORT;
        } else {
            return Constants.ELIXIR_API_PORT;
        }
    }

    public static replaceAll(str: string, find: string, replace: string): string {
        return str.replace(new RegExp(find, "g"), replace);
    }

    public static base64Encode(str: string): string {
        return Buffer.from(str).toString("base64url");
    }

    public static base64Decode(str: string): string {
        return Buffer.from(str, "base64url").toString("utf-8");
    }

    public static hexToHexadecimal(hex: string): string {
        return parseInt(hex, 16).toString(16);
    }
}