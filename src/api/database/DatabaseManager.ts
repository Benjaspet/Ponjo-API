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

import {Collection, Db, MongoClient, Document} from "mongodb";
import Constants from "../../Constants";
import Logger from "../../Logger";

export default class DatabaseManager {

    private static ponjoAPICollection: Db;
    private static roboEerieCollection: Db;
    private static readonly database: MongoClient = new MongoClient(Constants.API_URI);
    
    public static async connectToAll(): Promise<void> {
        this.ponjoAPICollection = this.database.db("Ponjo-API");
        this.roboEerieCollection = this.database.db("RoboEerie");
        await this.database.connect().then(async () => Logger.info("Connected to all databases."));
    }
    
    public static getDatabase(): MongoClient {
        return this.database;
    }

    public static getPonjoAPICollection(): Db {
        return this.ponjoAPICollection;
    }

    public static getShortenedURLCollection(): Collection<Document> {
        return this.ponjoAPICollection.collection("shorturls");
    }

    public static getAPIKeyCollection(): Collection<Document> {
        return this.ponjoAPICollection.collection("keys");
    }

    public static getDeckCollection(): Collection<Document> {
        return this.ponjoAPICollection.collection("decks");
    }

    public static getImageUploadCollection(): Collection<Document> {
        return this.ponjoAPICollection.collection("uploads");
    }

    public static getPonjoAPIStatsDocuments(): Collection<Document> {
        return this.ponjoAPICollection.collection("stats");
    }

    public static getRoboEerieCollection(): Db {
        return this.roboEerieCollection;
    }
    
    public static getRoboEerieTagDocuments(): Collection<Document> {
        return this.roboEerieCollection.collection("tags");
    }
}