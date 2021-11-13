import personnel from "../../data/foundation/Personnel";
import request from "request";
import cheerio from "cheerio";
import sites from "../../data/foundation/Sites";
import areas from "../../data/foundation/Areas";
import branches from "../../data/foundation/Branches";

export default class SCPFoundationDataUtil {

    public static getScpPersonnel(): object[] {
        return personnel;
    }

    public static getAllSiteData(): object[] {
        return sites;
    }

    public static getAllAreaData(): object[] {
        return areas;
    }

    public static getAllBranchData(): object {
        return branches;
    }

    public static async getSiteCategories(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            request("https://scp-wiki.wikidot.com/secure-facilities-locations", (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const siteTypes: object[] = [];
                    $('div[id="wiki-tab-0-0"]').find("p").each((index, el) => {
                        const siteCategory = $(el).next().text();
                        const siteCategoryDesc = $(el).next().next().text();
                        siteTypes.push({category: siteCategory, description: siteCategoryDesc});
                        siteTypes.splice(17, siteTypes.length)
                    });
                    resolve({
                        siteCategories: siteTypes
                    });
                } else {
                    reject({
                        msg: "An error occurred."
                    });
                }
            });
        });
    }
}