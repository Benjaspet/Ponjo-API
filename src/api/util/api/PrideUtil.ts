import path from "path";

export default class PrideUtil {

    public static async getFlag(type: string, displayAll?: boolean) {
        let filePath;
        if (displayAll) {
            return {
                abrosexual: "https://app.ponjo.club/v1/pride/flags?query=abrosexual",
                agender: "https://app.ponjo.club/v1/pride/flags?query=agender",
                aromantic: "https://app.ponjo.club/v1/pride/flags?query=aromantic",
                asexual: "https://app.ponjo.club/v1/pride/flags?query=asexual",
                bigender: "https://app.ponjo.club/v1/pride/flags?query=bigender",
                bisexual: "https://app.ponjo.club/v1/pride/flags?query=bisexual",
                demiboy: "https://app.ponjo.club/v1/pride/flags?query=demiboy",
                demigirl: "https://app.ponjo.club/v1/pride/flags?query=demogirl",
                gay: "https://app.ponjo.club/v1/pride/flags?query=abrosexual",
                genderfluid: "https://app.ponjo.club/v1/pride/flags?query=genderfluid",
                genderflux: "https://app.ponjo.club/v1/pride/flags?query=genderflux",
                genderqueer: "https://app.ponjo.club/v1/pride/flags?query=genderqueer",
                intersex: "https://app.ponjo.club/v1/pride/flags?query=intersex",
                lesbian: "https://app.ponjo.club/v1/pride/flags?query=lesbian",
                nonbinary: "https://app.ponjo.club/v1/pride/flags?query=nonbinary",
                omnisexual: "https://app.ponjo.club/v1/pride/flags?query=omnisexual",
                pansexual: "https://app.ponjo.club/v1/pride/flags?query=pansexual",
                polyamorous: "https://app.ponjo.club/v1/pride/flags?query=polyamorous",
                polysexual: "https://app.ponjo.club/v1/pride/flags?query=polysexual",
                pride: "https://app.ponjo.club/v1/pride/flags?query=pride",
                sapphic: "https://app.ponjo.club/v1/pride/flags?query=sapphic",
                transgender: "https://app.ponjo.club/v1/pride/flags?query=transgender",
                xenogender: "https://app.ponjo.club/v1/pride/flags?query=xenogender"
            }
        } else {
            switch (type.toLowerCase()) {
                case "abro":
                case "abrosexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Abrosexual.png");
                    break;
                case "agender":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Agender.png");
                    break;
                case "aro":
                case "aromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Aromantic.png");
                    break;
                case "ace":
                case "asexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Asexual.png");
                    break;
                case "bigender":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Bigender.png");
                    break;
                case "bi":
                case "bisexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Bisexual.png");
                    break;
                case "demiboy":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Demiboy.png");
                    break;
                case "demigirl":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Demigirl.png");
                    break;
                case "demiro":
                case "demiromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Demiromantic.png");
                    break;
                case "demisexual":
                case "demi":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Demisexual.png");
                    break;
                case "gay":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Gay.png");
                    break;
                case "genderfluid":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Genderfluid.png");
                    break;
                case "genderflux":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Genderflux.png");
                    break;
                case "genderqueer":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Genderqueer.png");
                    break;
                case "intersex":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Intersex.png");
                    break;
                case "lesbian":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Lesbian.png");
                    break;
                case "enby":
                case "nonbinary":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Nonbinary.png");
                    break;
                case "omni":
                case "omnisexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Omnisexual.png");
                    break;
                case "pan":
                case "pansexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Pansexual.png");
                    break;
                case "polyamorous":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Polyamorous.png");
                    break;
                case "polysexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Polysexual.png");
                    break;
                case "pride":
                case "progresspride":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/ProgressPride.png");
                    break;
                case "sapphic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Sapphic.png");
                    break;
                case "trans":
                case "transgender":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Transgender.png");
                    break;
                case "xenogender":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Xenogender.png");
                    break;
                default:
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/ProgressPride.png")
            }
            return filePath;
        }
    }
}