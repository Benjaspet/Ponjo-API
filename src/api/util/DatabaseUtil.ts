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

import {RoboEerieTag} from "../structs/database/RoboEerieTag";
import {APIData} from "../structs/database/APIData";
import Models from "../database/Models";

export default class DatabaseUtil {

    public static async fetchTags(count?: number): Promise<RoboEerieTag[]> {
        return new Promise(async (resolve, reject) => {
            const parsed: RoboEerieTag[] = [];
            try {
                const result: any = await Models.RoboEerieTags.find();
                if (result) {
                    result.forEach(key => {
                        parsed.push({
                            tag: key.tag,
                            content: key.content,
                            author: key.author,
                            guild: key.guild,
                            timestamps: {
                                createdAt: key.createdAt,
                                updatedAt: key.updatedAt
                            }
                        });
                    });
                } else reject();
                if (count) {
                    const sliced = parsed.slice(0, count);
                    resolve(sliced);
                } else {
                    resolve(parsed);
                }
           } catch (error: any) {
                reject(error);
            }
        });
    }

    public static async fetchAPIStats(): Promise<APIData> {
        return new Promise(async (resolve, reject) => {
            try {
                const result: any = await Models.Requests.findOne();
                if (result) {
                    resolve({
                        requests: {
                            total: result.total,
                            gets: result.gets,
                            posts: result.posts,
                            patches: result.patches,
                            puts: result.puts,
                            deletes: result.deletes
                        }
                    });
                } else reject();
            } catch (error: any) {
                reject(error);
            }
        });
    }


}