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

import axios from "axios";
import APIUtil from "./APIUtil";

export default class MemeUtil {

    public static async fetchRedditMeme(limit: number, shuffled: boolean): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await axios({
                method: "get",
                url: `https://www.reddit.com/r/meme.json?sort=top&t=daily`
            }).then(async response => {
                const data = <any> response.data;
                if (!limit) {
                    limit = 3;
                } else if (limit === 0) {
                    limit = 1;
                }
                let packet = [];
                for (let i = 1; i < limit + 1; i++) {
                    let alldata = data.data.children[i].data;
                    let title = alldata.title;
                    let img = alldata.url;
                    let link = "https://www.reddit.com" + alldata.permalink;
                    let thumbsup = alldata.ups;
                    let thumbsdown = alldata.downs;
                    let nsfw = alldata.over_18;
                    let comment = alldata.num_comments;
                    let linkFrom = alldata.subreddit_name_prefixed;
                    let authorUser = alldata.author;
                    let subreddit = alldata.subreddit;
                    let id = alldata.id;
                    let voteRatio = alldata.upvote_ratio;
                    let finalObject = {
                        title: title,
                        image: img,
                        link: link,
                        stats: {
                            author: authorUser,
                            comments: comment,
                            likes: thumbsup,
                            dislikes: thumbsdown,
                            nsfw: nsfw,
                            subreddit: subreddit,
                            subredditName: linkFrom,
                            id: id,
                            voteRatio: voteRatio
                        }
                    }
                    packet.push(finalObject);
                }
                let final;
                if (shuffled) { final = APIUtil.shuffleArray(packet) } else { final = packet }
                resolve({data: final});
                reject({msg: "Something went wrong."});
            });
        });
    }
}