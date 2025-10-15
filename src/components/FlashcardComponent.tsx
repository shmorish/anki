import { useState } from 'react';
import type { Flashcard } from '../types/flashcard';
import './FlashcardComponent.css';

interface FlashcardComponentProps {
  card: Flashcard;
}

export default function FlashcardComponent({ card }: FlashcardComponentProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <div className="category-badge">{card.category}</div>
          <div className="card-content">
            <p>{card.front}</p>
          </div>
          <div className="flip-hint">Click to reveal answer</div>
        </div>
        <div className="flashcard-back">
          <div className="category-badge">{card.category}</div>
          <div className="card-content">
            <p>{card.back}</p>
          </div>
          <div className="flip-hint">Click to see question</div>
        </div>
      </div>
    </div>
  );
}
