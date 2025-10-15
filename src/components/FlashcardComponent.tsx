import { useState } from 'react'
import type { Flashcard } from '../types/flashcard'
import './FlashcardComponent.css'

interface FlashcardComponentProps {
  card: Flashcard
}

export default function FlashcardComponent({ card }: FlashcardComponentProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }

  return (
    <div
      className="flashcard-container"
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
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
  )
}
