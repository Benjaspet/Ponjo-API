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

import Tags from "../models/roboeerie/TagSchema";

export default class RoboEerieUtil {

    /**
     * Fetch a collection of RoboEerie tags.
     * @param ?count number
     * @return Promise<any>
     */

    public static async fetchTags(count?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (count) {
                    Tags.find()
                        .then(result => {
                            const array = [];
                            result.forEach(key => {
                                array.push({
                                    tag: key.tag,
                                    content: key.content,
                                    author: key.author,
                                    guild: key.guild,
                                    createdAt: key.createdAt,
                                    updatedAt: key.updatedAt
                                });
                            });
                            const sliced = array.slice(0, count);
                            resolve(sliced);
                        });
                } else {
                    Tags.find()
                        .then(result => {
                            const array = [];
                            result.forEach(key => {
                                array.push({
                                    tag: key.tag,
                                    content: key.content,
                                    author: key.author,
                                    guild: key.guild,
                                    createdAt: key.createdAt,
                                    updatedAt: key.updatedAt
                                });
                            });
                            resolve(array);
                        });
                }
            } catch (error) {
                reject({
                    msg: "An error occurred."
                });
            }
        });
    }
}