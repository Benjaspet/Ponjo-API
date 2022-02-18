/*
 * Copyright 2022 Ben Petrillo. All rights reserved.
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

import Tags from "../database/models/roboeerie/TagSchema";

export default class DatabaseUtil {

    /**
     * Fetch a collection of RoboEerie tags.
     * @param ?count number
     * @return Promise<any>
     */

    public static async fetchTags(count?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if (count) {
                    Tags.find().then(result => {
                        const tags: object[] = [];
                        result.forEach(key => {
                            tags.push({
                                tag: key.tag,
                                content: key.content,
                                author: key.author,
                                guild: key.guild,
                                createdAt: key.createdAt,
                                updatedAt: key.updatedAt
                            });
                        });
                        const sliced = tags.slice(0, count);
                        resolve(sliced);
                    });
                } else {
                    Tags.find().then(result => {
                        const tags: object[] = [];
                        result.forEach(key => {
                            tags.push({
                                tag: key.tag,
                                content: key.content,
                                author: key.author,
                                guild: key.guild,
                                createdAt: key.createdAt,
                                updatedAt: key.updatedAt
                            });
                        });
                        resolve(tags);
                    });
                }
            } catch (error) {
                reject({});
            }
        });
    }
}