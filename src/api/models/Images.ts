import mongoose, {Schema} from "mongoose";

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

const Image = mongoose.model("uploads", ImageSchema);
export default Image;