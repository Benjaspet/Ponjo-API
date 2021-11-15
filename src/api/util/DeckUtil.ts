import * as PokerEvaluator from "poker-evaluator-ts";

export default class DeckUtil {

    /*
     Create a virtual deck of cards.
     @return string[]
     */

    public static createDeck(): string[] {
        const suits: string[] = ["H", "C", "D", "S"];
        const ranks: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        const deck: string[] = [];
        for (let suitCounter: number = 0; suitCounter < suits.length; suitCounter++) {
            for (let rankCounter: number = 0; rankCounter < ranks.length; rankCounter++) {
                deck.push(ranks[rankCounter] + suits[suitCounter])
            }
        }
        return deck as string[];
    }

    /*
     Shuffle a virtual deck of cards.
     @return string[]
     */

    public static shuffleDeck(deck: string[]): string[] {
        let currentIndex: number = deck.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [deck[currentIndex], deck[randomIndex]] = [
                deck[randomIndex], deck[currentIndex]];
        }
        return deck as string[];
    }

    /*
     Evaluate a poker hand.
     @return object
     */

    public static evaluateHand(deck: string[]): object|any {
        return PokerEvaluator.evalHand(deck) as object;
    }

    /*
     Draw a card from a virtual deck.
     @return object
     */

    public static drawCard(deck: string[], amount: number): object|any {
        let drawnCards = [];
        const originalDeckLength = deck.length;
        const drawn = deck.splice(0, amount);
        let index = 0;
        drawn.forEach(card => {
            index++;
            drawnCards.push({
                code: card,
                image: `https://app.ponjo.club/assets/cards/${card}.png`,
                suit: card.split("")[1],
                value: card.split("")[0],
                iteration: index
            });
        });
        return {
            cardsDrawn: drawnCards,
            updatedDeck: deck,
            amountDrawn: amount,
            remainingCards: originalDeckLength - amount
        } as object;
    }
}