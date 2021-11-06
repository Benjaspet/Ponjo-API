import mongoose, {Schema} from "mongoose";
import DatabaseConnection from "../database/DatabaseConnection";

const DeckSchema = new Schema(
    {
        deck: Array,
        deckId: String,
    }, {
        timestamps: true
    }
);

const Deck = new DatabaseConnection().ponjoDatabase.model("decks", DeckSchema);
export default Deck;