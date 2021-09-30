import mongoose, {Schema} from "mongoose";

const DeckSchema = new Schema(
    {
        deck: String,
        deckId: String
    },
    {
        timestamps: true,
    }
);

const Deck = mongoose.model("decks", DeckSchema);
export default Deck;