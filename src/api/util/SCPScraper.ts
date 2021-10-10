import scraper from "scp-scraper";

export default class SCPScraper {

    public static async scrapeScp(scp: string) {
        return await scraper(`https://www.scpwiki.com/scp-${scp}`)
            .then(async result => {
                const procedures = result.procedures;
                for (let i = 0; i < procedures.length; i++) {
                    procedures[i] = procedures[i]
                        .replace(/█/g, 'X')
                        .replace(/\\\\/g, "")
                        .replace(/u2019/g, "'")
                        .replace(/\\/g, "");
                }
                return {
                    item: result.index,
                    class: result.class,
                    procedures: procedures
                }
            });
    }
}