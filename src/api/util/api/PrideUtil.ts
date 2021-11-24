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

import path from "path";

export default class PrideUtil {

    /*
     Get the file path of the specified pride flag.
     @param type: string
     @param displayAll?: boolean
     @return Promise<any>
     */

    public static async getFlag(type: string, displayAll?: boolean): Promise<any> {
        let filePath;
        if (displayAll) {
            return {
                abrosexual: "https://app.ponjo.club/v1/pride/flags?type=abrosexual",
                agender: "https://app.ponjo.club/v1/pride/flags?type=agender",
                alloromantic: "https://app.ponjo.club/v1/pride/flags?type=alloromantic",
                aromantic: "https://app.ponjo.club/v1/pride/flags?type=aromantic",
                asexual: "https://app.ponjo.club/v1/pride/flags?type=asexual",
                bigender: "https://app.ponjo.club/v1/pride/flags?type=bigender",
                biromantic: "https://app.ponjo.club/v1/pride/flags?type=biromantic",
                bisexual: "https://app.ponjo.club/v1/pride/flags?type=bisexual",
                ceterosexual: "https://app.ponjo.club/v1/pride/flags?type=ceterosexual",
                demiboy: "https://app.ponjo.club/v1/pride/flags?type=demiboy",
                demigirl: "https://app.ponjo.club/v1/pride/flags?type=demogirl",
                demiromantic: "https://app.ponjo.club/v1/pride/flags?type=demiromantic",
                demisexual: "https://app.ponjo.club/v1/pride/flags?type=demisexual",
                gay: "https://app.ponjo.club/v1/pride/flags?type=abrosexual",
                genderfluid: "https://app.ponjo.club/v1/pride/flags?type=genderfluid",
                genderflux: "https://app.ponjo.club/v1/pride/flags?type=genderflux",
                genderqueer: "https://app.ponjo.club/v1/pride/flags?type=genderqueer",
                heterosexual: "https://app.ponjo.club/v1/pride/flags?type=heterosexual",
                intersex: "https://app.ponjo.club/v1/pride/flags?type=intersex",
                lesbian: "https://app.ponjo.club/v1/pride/flags?type=lesbian",
                lesbiromantic: "https://app.ponjo.club/v1/pride/flags?type=lesbiromantic",
                monoromantic: "https://app.ponjo.club/v1/pride/flags?type=monoromantic",
                multisexual: "https://app.ponjo.club/v1/pride/flags?type=multisexual",
                neptunic: "https://app.ponjo.club/v1/pride/flags?type=neptunic",
                nonbinary: "https://app.ponjo.club/v1/pride/flags?type=nonbinary",
                omniromantic: "https://app.ponjo.club/v1/pride/flags?type=omniromantic",
                omnisexual: "https://app.ponjo.club/v1/pride/flags?type=omnisexual",
                panromantic: "https://app.ponjo.club/v1/pride/flags?type=panromantic",
                pansexual: "https://app.ponjo.club/v1/pride/flags?type=pansexual",
                polyamorous: "https://app.ponjo.club/v1/pride/flags?type=polyamorous",
                polysexual: "https://app.ponjo.club/v1/pride/flags?type=polysexual",
                pride: "https://app.ponjo.club/v1/pride/flags?type=pride",
                questioning: "https://app.ponjo.club/v1/pride/flags?type=questioning",
                sapphic: "https://app.ponjo.club/v1/pride/flags?type=sapphic",
                transgender: "https://app.ponjo.club/v1/pride/flags?type=transgender",
                twospirit: "https://app.ponjo.club/v1/pride/flags?type=twospirit",
                xenogender: "https://app.ponjo.club/v1/pride/flags?type=xenogender"
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
                case "alloromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Alloromantic.png");
                    break;
                case "aro":
                case "aromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Aromantic.png");
                    break;
                case "aroace":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/AroAce.png");
                    break;
                case "ace":
                case "asexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Asexual.png");
                    break;
                case "bigender":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Bigender.png");
                    break;
                case "biromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Biromantic.png");
                    break;
                case "bi":
                case "bisexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Bisexual.png");
                    break;
                case "ceterosexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Ceterosexual.png");
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
                case "heterosexual":
                case "straight":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Heterosexual.png");
                    break;
                case "intersex":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Intersex.png");
                    break;
                case "lesbian":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Lesbian.png");
                    break;
                case "lesbiromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Lesbiromantic.png");
                    break;
                case "monoromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Monoromantic.png");
                    break;
                case "multisexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Multisexual.png");
                    break;
                case "neptunic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Neptunic.png");
                    break;
                case "enby":
                case "nonbinary":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Nonbinary.png");
                    break;
                case "omniromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Omniromantic.png");
                    break;
                case "omni":
                case "omnisexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Omnisexual.png");
                    break;
                case "panromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Panromantic.png");
                    break;
                case "pan":
                case "pansexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Pansexual.png");
                    break;
                case "polyamorous":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Polyamorous.png");
                    break;
                case "polyromantic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Polyromantic.png");
                    break;
                case "polysexual":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Polysexual.png");
                    break;
                case "pride":
                case "progresspride":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/ProgressPride.png");
                    break;
                case "questioning":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Questioning.png");
                    break;
                case "sapphic":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Sapphic.png");
                    break;
                case "trans":
                case "transgender":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/Transgender.png");
                    break;
                case "twospirit":
                    filePath = path.join(__dirname, "../../public/assets/lgbtq/flags/TwoSpirit.png");
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