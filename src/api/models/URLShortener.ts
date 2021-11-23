/*
 * Copyright © 2021 Ben Petrillo. All rights reserved.
 *
 *  Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import * as id from "shortid";
import {Schema} from "mongoose";
import DatabaseConnection from "../database/DatabaseConnection";

const URLShortenerSchema = new Schema(
    {
        full: {
            type: String,
            required: true
        },
        short: {
            type: String,
            required: true,
            default: id.generate()
        },
        clicks: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ShortURL = new DatabaseConnection().ponjoDatabase.model("shortURLs", URLShortenerSchema);
export default ShortURL;