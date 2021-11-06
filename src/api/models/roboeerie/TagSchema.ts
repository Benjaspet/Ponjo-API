import mongoose from "mongoose";
import DatabaseConnection from "../../database/DatabaseConnection";

const TagSchema = new mongoose.Schema(
    {
        id: String,
        tag: String,
        content: String,
        author: String,
        guild: String
    }, {
        timestamps: true,
        versionKey: false
    }
);

const Tags = new DatabaseConnection().roboEerieDatabase.model("tags", TagSchema);
export default Tags;