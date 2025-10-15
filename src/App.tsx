import { useState } from 'react';
import FlashcardComponent from './components/FlashcardComponent';
import CardNavigation from './components/CardNavigation';
import AddCardForm from './components/AddCardForm';
import flashcardsData from './data/flashcards.json';
import type { Flashcard, FlashcardData } from './types/flashcard';
import './App.css';

function App() {
  const initialData = flashcardsData as FlashcardData;
  const [cards, setCards] = useState<Flashcard[]>(initialData.cards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleAddCard = (newCard: Omit<Flashcard, 'id'>) => {
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    const cardWithId: Flashcard = { ...newCard, id: newId };
    setCards([...cards, cardWithId]);
  };

  const handleExportJSON = () => {
    const dataToExport = { cards };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flashcards.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Flashcard Learning</h1>
        <p>Click on a card to flip it and see the answer</p>
        <div className="header-actions">
          <button onClick={() => setShowAddForm(true)} className="btn-add">
            + Add Card
          </button>
          <button onClick={handleExportJSON} className="btn-export">
            Export JSON
          </button>
        </div>
      </header>

      <main className="app-main">
        {cards.length > 0 ? (
          <>
            <FlashcardComponent card={cards[currentCardIndex]} />

            <CardNavigation
              currentIndex={currentCardIndex}
              totalCards={cards.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </>
        ) : (
          <div className="no-cards">
            <p>No flashcards yet. Add your first card to get started!</p>
          </div>
        )}
      </main>

      {showAddForm && (
        <AddCardForm
          onAddCard={handleAddCard}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
