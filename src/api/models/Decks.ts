import mongoose, {Schema} from "mongoose";

const DeckSchema = new Schema(
    {
        deck: Array,
        deckId: String,
        expireAt: {
            type: Date,
            default: Date.now,
            index: {
                expires: "48h"
            }
        }
    },
    {
        timestamps: true,
    }
);

const Deck = mongoose.model("decks", DeckSchema);
export default Deck;