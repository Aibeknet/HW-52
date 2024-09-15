import Card from './Card';

class CardDeck {
    private deck: Card[];

    constructor() {
        this.deck = [];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.deck.push(new Card(rank, suit));
            }
        }
    }

    getCard(): Card {
        if (this.deck.length === 0) {
            throw new Error('No deck found');
        }
        const randomIndex = Math.floor(Math.random() * this.deck.length);

        return this.deck.splice(randomIndex, 1)[0];
    }

    getCards(howMany: number): Card[] {
        if (howMany > this.deck.length) {
            throw new Error('Not enough cards left in the deck');
        }
        const cards: Card[] = [];
        for (let i = 0; i < howMany; i++) {
            cards.push(this.getCard());
        }
        return cards;
    }
}

export default CardDeck;