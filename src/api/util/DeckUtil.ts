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
        let currentIndex = deck.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [deck[currentIndex], deck[randomIndex]] = [
                deck[randomIndex], deck[currentIndex]];
        }
        return deck;
    }

    public static evaluateHand(deck: string[]) {
        return PokerEvaluator.evalHand(deck);
    }

}