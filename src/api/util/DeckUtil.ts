import * as PokerEvaluator from "poker-evaluator-ts";

export default class DeckUtil {

    public static createDeck(): string[] {
        const suits: string[] = ["H", "C", "D", "S"];
        const ranks: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
        const deck: string[] = [];
        for (let suitCounter: number = 0; suitCounter < 4; suitCounter++) {
            for (let rankCounter: number = 0; rankCounter < 13; rankCounter++) {
                deck.push(ranks[rankCounter] + suits[suitCounter])
            }
        }
        return <string[]> deck;
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

    public static drawCard(deck: string[], amount: number) {
        let drawnCards = [];
        const originalDeckLength = deck.length;
        const drawn = deck.splice(0, amount);
        let index = 0;
        drawn.forEach(card => {
            index++;
            drawnCards.push({
                code: card,
                image: `https://app.ponjo.club/public/assets/cards/${card}.png`,
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
        };
    }
}