import scraper from "scp-scraper";

export default class SCPScraper {

    public static async scrapeScp(scp: string) {
        return await scraper(`https://www.scpwiki.com/scp-${scp}`)
            .then(async result => {
                return {
                    item: result.index,
                    class: result.class,
                    procedures: result.procedures
                }
            });
    }
}