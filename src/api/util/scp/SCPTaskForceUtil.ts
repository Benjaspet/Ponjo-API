import request from "request";
import cheerio from "cheerio";

export default class SCPTaskForceUtil {

    public static async getTaskForceData(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            request("https://www.scpwiki.com/task-forces", (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const taskForces = [];
                    const descriptions = [];
                    const images = [];
                    $(".content-panel").each((index, el) => {
                        const taskForce = $(el).find("h1").find("span").text();
                        const description = $(el).find("p").first().text();
                        if (taskForce == "" || description == "") {
                            index++;
                        } else {
                            taskForces.push(taskForce);
                            descriptions.push(description);
                        }
                    });
                    $(".image-container").each((index, el) => {
                        const link = $(el).find("img").attr("src");
                        images.push(link);
                    });
                    const dictionary = [];
                    for (let i = 0; i < taskForces.length; i++) {
                        const resolved = taskForces[i].split("(");
                        resolved.pop();
                        const joined = resolved.join("");
                        const fixed = joined.slice(0, -1);
                        dictionary.push({
                            [fixed]: {
                                name: taskForces[i],
                                description: descriptions[i],
                                logo: images[i]
                            }
                        });
                    }
                    dictionary.pop();
                    resolve({
                        data: dictionary
                    });
                } else {
                    reject({
                        status: 400,
                        message: "An SCP by that item number was not found."
                    });
                }
            });
        }).catch(error => {
            console.log(error);
        });
    }
}