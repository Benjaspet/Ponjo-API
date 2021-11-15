import {Schema} from "mongoose";
import DatabaseConnection from "../database/DatabaseConnection";

const KeySchema = new Schema(
    {
        key: String,
        user: String,
        requests: Number
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Key = new DatabaseConnection().ponjoDatabase.model("keys", KeySchema);
export default Key;