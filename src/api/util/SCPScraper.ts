import request from "request";
import cheerio from "cheerio";

export default class SCPScraper {

    public static async getScpData(scp: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            request("https://www.scpwiki.com/scp-" + scp, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    if (scp === "001") {
                        const name = "SCP-" + scp;
                        const warning = $(".content-panel").find("p").first().text()
                            .replace(/█/g, "X");
                        resolve({
                            item: name,
                            content: {
                                warning: warning
                            }
                        });
                    } else {
                        const item = $("#page-title").first().text().replace(/\s\s+/g, "");
                        const objectClass = $('p:contains("Object Class:")').text().replace(/█/g, 'X');
                        const procedures = [
                            $('p:contains("Special Containment Procedures:")').text().replace(/█/g, 'X'),
                            $('p:contains("Special Containment Procedures:")').next().text().replace(/█/g, 'X')
                        ];
                        const description = $('p:contains("Description:")').text().replace(/█/g, 'X');
                        resolve({
                            item: item,
                            class: objectClass,
                            description: description,
                            procedures: procedures
                        });
                    }
                }
            });
        });
    }
}