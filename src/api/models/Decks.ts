import mongoose, {Schema} from "mongoose";

const DeckSchema = new Schema(
    {
        deck: Array,
        deckId: String,
        expire_at: {
            type: Date, default: Date.now, expires: 86400
        }
    },
    {
        timestamps: true,
    }
);

const Deck = mongoose.model("decks", DeckSchema);
export default Deck;