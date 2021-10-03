import mongoose, {Schema} from "mongoose";

const KeySchema = new Schema(
    {
        key: String,
        user: String,
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Key = mongoose.model("keys", KeySchema);
export default Key;