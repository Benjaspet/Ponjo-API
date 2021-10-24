import request from "request";
import cheerio from "cheerio";
import {rejects} from "assert";

export default class SCPScraper {

    public static async getScpData(scp: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            request("https://www.scpwiki.com/scp-" + scp, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    if (scp === "001") {
                        const item = "SCP-" + scp;
                        const warning = $(".content-panel").find("p").first().text()
                            .replace(/█/g, "X");
                        const imageSrc = $('.scp-image-block').find("img").first().attr("src");
                        resolve({
                            status: 200,
                            item: item,
                            class: null,
                            description: warning,
                            procedures: null,
                            imageSrc: imageSrc || null
                        });
                    } else {
                        if (scp === "000") {
                            resolve({
                                status: 200,
                                item: "SCP-000",
                                class: "#NULL",
                                description: "Internal system error: Field undefined. Please contact system administrator.",
                                procedures: "An error has occurred.",
                                imageSrc: null
                            });
                        } else {
                            const item = $("#page-title")
                                .first()
                                .text()
                                .replace(/\s\s+/g, "");
                            const objectClass = $('p:contains("Object Class:")')
                                .first()
                                .text()
                                .replace(/█/g, 'X')
                                .replace("Object Class:", "")
                                .replace(" ", "");
                            const procedures = $('p:contains("Special Containment Procedures:")')
                                .first()
                                .text()
                                .replace(/█/g, 'X');
                            const description = $('p:contains("Description:")')
                                .first()
                                .text()
                                .replace(/█/g, 'X');
                            const imageSrc = $('.scp-image-block')
                                .find("img")
                                .first()
                                .attr("src");
                            resolve({
                                status: 200,
                                item: item,
                                class: objectClass,
                                description: description,
                                procedures: procedures,
                                imageSrc: imageSrc || null
                            });
                        }
                    }
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

    public static async getTaskForceData(taskforce: string): Promise<any> {
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