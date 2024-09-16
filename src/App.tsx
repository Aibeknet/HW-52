import React, { useState } from "react";
import Card, { ICardProps } from './Components/Card';
import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';

const deck = new CardDeck();

const App: React.FC = () => {
    const [hand, setHand] = useState<ICardProps[]>([]);
    const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
    const [handOutcome, setHandOutcome] = useState<string | null>(null);

    const dealCards = () => {
        const dealtCards = deck.getCards(5);
        setHand(dealtCards);

        const pokerHand = new PokerHand(dealtCards);
        setHandOutcome(pokerHand.getOutcome());
    };

    const replaceCards = () => {
        const newCards = hand.map((card, index) => (selectedCards.has(index) ? deck.getCard() : card));
        setHand(newCards);
        setSelectedCards(new Set());

        const pokerHand = new PokerHand(newCards);
        setHandOutcome(pokerHand.getOutcome());
    };

    const handleCardSelect = (index: number) => {
        setSelectedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const renderCards = () => {
        return hand.map((card, index) => (
            <div key={index} onClick={() => handleCardSelect(index)}>
                <Card rank={card.rank} suit={card.suit} />
                {selectedCards.has(index) && <span className="selection-indicator">Selected</span>}
            </div>
        ));
    };

    return (
        <div className="poker-table">
            <button onClick={dealCards}>Distribute cards</button>
            {hand.length > 0 && (
                <div className="playingCards faceImages">
                    {renderCards()}
                </div>
            )}

            {handOutcome && <div className="handOutcome">{handOutcome}</div>}
            <button onClick={replaceCards}>Change cards</button>

        </div>
    );
};

export default App;


