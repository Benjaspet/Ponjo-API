import {Schema} from "mongoose";
import DatabaseConnection from "../database/DatabaseConnection";

const ImageSchema = new Schema(
    {
        filePath: String,
        imageId: String
    },
    {
        timestamps: true,
        versionKey: false
    },
);

const Image = new DatabaseConnection().ponjoDatabase.model("uploads", ImageSchema);
export default Image;