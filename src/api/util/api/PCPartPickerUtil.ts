/*
 * Copyright © 2022 Ben Petrillo. All rights reserved.
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

import {PCPart} from "../../structs/PCPart";
import * as cheerio from "cheerio";
import axios from "axios";

export default class PCPartPickerUtil {

    /**
     * Fetch PC parts from a specific PCPartPicker list.
     * @param id
     * @return Promise<PCPart[]|object>
     */

    public static async fetchPCParts(id: string): Promise<PCPart[]|object> {
        const response = await axios.get(`https://pcpartpicker.com/list/${id}`);
        const $ = cheerio.load(response.data);
        let parts: PCPart[] = [];
        $("#partlist tbody > .tr__product").each((i, row) => {
            let $ = cheerio.load(row)
            let item = {
                "type": $("td.td__component > a").text().trim().length > 0 ? $("td.td__component > a").text().trim() : "Custom",
                "image": $("img").attr("src").includes("no-image") ? null : $("img").attr("src"),
                "name": $("td.td__name > a").text().length > 0 ? $("td.td__name > a").text() : null,
                "price": $("td.td__price > a").text().length > 0 ? $("td.td__price > a").text() : null
            }
            parts.push(item)
        });
        return parts;
    }
}