import React from 'react';

interface ICardProps {
    rank: string;
    suit: string;
}

const Card: React.FC<ICardProps> = ({ rank, suit}) => {
    const suitsObj: { [key: string]: string } = {
        diams: '♦',
        hearts: '♥',
        clubs: '♣',
        spades: '♠'
    };

    const suitSymbol = suitsObj[suit];

    return (
        <span className={`card rank-${rank} ${suit}`}>
            <span className="rank">{rank}</span>
            <span className="suit">{suitSymbol}</span>
        </span>
    );
};

export default Card;