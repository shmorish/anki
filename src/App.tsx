import { useState } from 'react';
import FlashcardComponent from './components/FlashcardComponent';
import CardNavigation from './components/CardNavigation';
import flashcardsData from './data/flashcards.json';
import type { FlashcardData } from './types/flashcard';
import './App.css';

function App() {
  const data = flashcardsData as FlashcardData;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNext = () => {
    if (currentCardIndex < data.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Flashcard Learning</h1>
        <p>Click on a card to flip it and see the answer</p>
      </header>

      <main className="app-main">
        <FlashcardComponent card={data.cards[currentCardIndex]} />

        <CardNavigation
          currentIndex={currentCardIndex}
          totalCards={data.cards.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}

export default App;
