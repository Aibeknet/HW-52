interface Card {
    rank: string;
    suit: string;
}

class PokerHand {
    private cards: Card[];

    constructor(cards: Card[]) {
        if (cards.length !== 5) {
            throw new Error('Poker hand must contain exactly 5 cards');
        }
        this.cards = cards;
    }

    getOutcome(): string {
        const rankCount = this.countRanks();
        const suitCount = this.countSuits();
        const isFlushResult = this.isFlush(suitCount);
        const isStraightResult = this.isStraight();

        if (isFlushResult && isStraightResult) {
            if (this.isRoyalFlush()) {
                return 'Royal flush';
            }
            return 'Straight flush';
        }
        if (this.isFourOfAKind(rankCount)) {
            return 'Four of a kind';
        }
        if (this.isFullHouse(rankCount)) {
            return 'Full house';
        }
        if (this.isFlush(suitCount)) {
            return 'Flush';
        }
        if (isStraightResult) {
            return 'Straight';
        }
        if (this.isThreeOfAKind(rankCount)) {
            return 'Three of a kind';
        }
        if (this.isTwoPairs(rankCount)) {
            return 'Two pairs';
        }
        if (this.isOnePair(rankCount)) {
            return 'One pair';
        }

        return 'High card';
    }

    private countRanks(): { [key: string]: number } {
        const rankCount: { [key: string]: number } = {};
        this.cards.forEach(card => {
            rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;
        });
        return rankCount;
    }

    private countSuits(): { [key: string]: number } {
        const suitCount: { [key: string]: number } = {};
        this.cards.forEach(card => {
            suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
        });
        return suitCount;
    }

    private isFlush(suitCount: { [key: string]: number }): boolean {
        return Object.values(suitCount).some(count => count === 5);
    }

    private isStraight(): boolean {
        const ranks = this.cards.map(card => this.rankToNumber(card.rank)).sort((a, b) => a - b);
        return this.isConsecutive(ranks) || this.isLowAceStraight(ranks);
    }

    private rankToNumber(rank: string): number {
        const rankMap: { [key: string]: number } = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
            '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11,
            'Q': 12, 'K': 13, 'A': 14
        };
        return rankMap[rank];
    }

    private isConsecutive(ranks: number[]): boolean {
        for (let i = 1; i < ranks.length; i++) {
            if (ranks[i] !== ranks[i - 1] + 1) {
                return false;
            }
        }
        return true;
    }

    private isLowAceStraight(ranks: number[]): boolean {
        return ranks.join() === '2,3,4,5,14';
    }

    private isRoyalFlush(): boolean {
        const requiredRanks = ['10', 'J', 'Q', 'K', 'A'];
        return this.isFlush(this.countSuits()) && this.cards.every(card => requiredRanks.includes(card.rank));
    }

    private isFullHouse(rankCount: { [key: string]: number }): boolean {
        const counts = Object.values(rankCount);
        return counts.includes(3) && counts.includes(2);
    }

    private isFourOfAKind(rankCount: { [key: string]: number }): boolean {
        return Object.values(rankCount).includes(4);
    }

    private isThreeOfAKind(rankCount: { [key: string]: number }): boolean {
        return Object.values(rankCount).includes(3);
    }

    private isTwoPairs(rankCount: { [key: string]: number }): boolean {
        const pairs = Object.values(rankCount).filter(count => count === 2);
        return pairs.length === 2;
    }

    private isOnePair(rankCount: { [key: string]: number }): boolean {
        return Object.values(rankCount).includes(2);
    }
}

export default PokerHand;
