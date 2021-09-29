import * as PokerEvaluator from "poker-evaluator-ts";

export default class DeckUtil {

    public static createDeck(): string[] {

        const suits: string[] = ["h", "c", "d", "s"];
        const ranks: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        const deck: string[] = [];

        for (let suitCounter: number = 0; suitCounter < 4; suitCounter++) {
            for (let rankCounter: number = 0; rankCounter < 13; rankCounter++) {
                deck.push(ranks[rankCounter] + suits[suitCounter])
            }
        }
        return deck;
    }

    public static shuffleDeck(deck: string[]) {
        for (let i = 0; i < 52; i++) {
            const tempCard = deck[i];
            const randomIndex = Math.floor(Math.random() * 52);
            deck[i] = deck[randomIndex];
            deck[randomIndex] = tempCard;
        }
    }

    public static evaluateHand(deck: string[]) {
        return PokerEvaluator.evalHand(deck);
    }

}