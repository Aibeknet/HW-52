import React, {useState} from "react";
import Card from './Components/Card';
import CardDeck from './lib/CardDeck';

const App: React.FC = () => {
  const [hand, setHand] = useState<Card[]>([]);

  const dealCards = () => {
    const deck = new CardDeck();
    const cards = deck.getCards(5);
    setHand(cards);
  };

  return (
      <div>
        <button onClick={dealCards}>Distribute cards</button>
        {hand.length > 0 && (
            <div className="playingCards faceImages">
              {hand.map((card, index) => (
                  <Card key={index} rank={card.rank} suit={card.suit}/>
              ))}
            </div>
        )}
      </div>
  );
};

export default App
