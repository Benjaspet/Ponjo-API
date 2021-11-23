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

import Requests from "../../models/Requests";

export default class APIUtil {

    /*
     Get the current timestamp as a Locale Time String.
     @return string
     */

    public static getTimestamp(): string {
        return new Date().toLocaleTimeString();
    }

    public static getTimestamps(): object {
        return {
            date: new Date().toLocaleString(),
            unix: Math.round(+ new Date() / 1000)
        }
    }

    /*
     Generate a unique ID.
     @return string
     */

    public static generateUniqueId(): string {
        return "yxxx-4xx-xxxxxx".replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /*
     Init a promise-based delay.
     @param ms: number
     @return Promise<any>
     */

    public static async sleep(ms): Promise<any> {
        new Promise(res => setTimeout(res, ms));
    }

    /*
     Obtain multiple elements from the provided array.
     @param array: string[]
     @param amount: number
     @return string[]
     */

    public static getMultipleElementsFromArray(array: string[], amount: number): string[] {
        return array.slice(0, amount)
    }

    /*
     Get the total amount of API requests.
     @return Promise<object>
     */

    public static async getTotalApiRequests(): Promise<object> {
        try {
            const requests = await Requests.findOne({});
            return {
                total: requests.total,
                gets: requests.gets,
                posts: requests.posts
            };
        } catch (error) {
            return {
                total: 0,
                gets: 0,
                posts: 0
            };
        }
    }

    public static shuffleArray(array) {
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

    public static replaceAll(str: string, find, replace) {
        return str.replace(new RegExp(find, "g"), replace);
    }

    public static setCharAt(str, index, chr) {
        if (index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
}