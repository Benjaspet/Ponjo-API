import {Schema} from "mongoose";
import DatabaseConnection from "../database/DatabaseConnection";

const DeckSchema = new Schema(
    {
        deckId: String,
        deck: Array,
        data: {
            shuffled: Boolean,
            remainingCards: Number
        }
    }, {
        timestamps: true,
        versionKey: false
    }
);

const Deck = new DatabaseConnection().ponjoDatabase.model("decks", DeckSchema);
export default Deck;