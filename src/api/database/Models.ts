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

import {Schema} from "mongoose"
import * as id from "shortid";
import DatabaseManager from "./DatabaseManager";

const DeckSchema: Schema = new Schema(
    {
        deckId: {
            type: String,
            required: true
        },
        deck: {
            type: Array,
            required: true
        },
        data: {
            shuffled: {
                type: Boolean,
                required: true
            },
            remainingCards: {
                type: Number,
                required: true
            }
        },
    }, {
        timestamps: true,
        versionKey: false
    }
);

const UploadSchema: Schema = new Schema(
    {
        filePath: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        }
    }, {
        timestamps: true,
        versionKey: false
    }
);

const ShortURLSchema: Schema = new Schema(
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

const RequestSchema: Schema = new Schema(
    {
        total: {
            type: Number,
            required: true,
            default: 0
        },
        gets: {
            type: Number,
            required: true,
            default: 0
        },
        posts: {
            type: Number,
            required: true,
            default: 0
        },
        puts: {
            type: Number,
            required: true,
            default: 0
        },
        patches: {
            type: Number,
            required: true,
            default: 0
        },
        deletes: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
);

const KeySchema: Schema = new Schema(
    {
        key: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        requests: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const TagSchema: Schema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        guild: {
            type: String,
            required: true
        },
    }, {
        timestamps: true,
        versionKey: false
    }
)

export default {
    Decks: new DatabaseManager().ponjoAPIDatabase.model("decks", DeckSchema),
    Uploads: new DatabaseManager().ponjoAPIDatabase.model("uploads", UploadSchema),
    ShortURLs: new DatabaseManager().ponjoAPIDatabase.model("shorturls", ShortURLSchema),
    Requests: new DatabaseManager().ponjoAPIDatabase.model("requests", RequestSchema),
    Keys: new DatabaseManager().ponjoAPIDatabase.model("keys", KeySchema),
    RoboEerieTags: new DatabaseManager().roboEerieDatabase.model("tags", TagSchema)
};