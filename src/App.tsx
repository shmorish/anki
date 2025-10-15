import { useMemo, useState } from 'react'
import AddCardForm from './components/AddCardForm'
import CardNavigation from './components/CardNavigation'
import FlashcardComponent from './components/FlashcardComponent'
import flashcardsData from './data/flashcards.json'
import type { Flashcard, FlashcardData } from './types/flashcard'
import './App.css'

const STORAGE_KEY = 'flashcard-checked-ids'

function App() {
  const initialData = flashcardsData as FlashcardData

  // Shuffle cards on initial load
  const shuffleCards = (cardsToShuffle: Flashcard[]) => {
    const shuffled = [...cardsToShuffle]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const [cards, setCards] = useState<Flashcard[]>(() => shuffleCards(initialData.cards))
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showOnlyChecked, setShowOnlyChecked] = useState(false)
  const [_refreshTrigger, setRefreshTrigger] = useState(0)

  // Filter cards based on showOnlyChecked
  const displayedCards = useMemo(() => {
    if (!showOnlyChecked) {
      return cards
    }
    const storedIds = localStorage.getItem(STORAGE_KEY)
    if (!storedIds) {
      return []
    }
    const checkedIds: number[] = JSON.parse(storedIds)
    return cards.filter((card) => checkedIds.includes(card.id))
  }, [cards, showOnlyChecked])

  const handleNext = () => {
    if (currentCardIndex < displayedCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const handleAddCard = (newCard: Omit<Flashcard, 'id'>) => {
    const newId = cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1
    const cardWithId: Flashcard = { ...newCard, id: newId }
    setCards([...cards, cardWithId])
  }

  const handleToggleFilter = () => {
    setShowOnlyChecked(!showOnlyChecked)
    setCurrentCardIndex(0)
  }

  const handleCheckboxChange = () => {
    // Trigger re-render when checkbox state changes
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Network Flashcards</h1>
        <p>Click on a card to flip it and see the answer</p>
        <div className="header-actions">
          <button
            type="button"
            onClick={handleToggleFilter}
            className={`btn-filter ${showOnlyChecked ? 'active' : ''}`}
          >
            {showOnlyChecked ? '全ての問題を表示' : 'チェックした問題のみ'}
          </button>
          <button type="button" onClick={() => setShowAddForm(true)} className="btn-add">
            + Add Card
          </button>
        </div>
      </header>

      <main className="app-main">
        {displayedCards.length > 0 ? (
          <>
            <FlashcardComponent card={displayedCards[currentCardIndex]} />

            <CardNavigation
              currentIndex={currentCardIndex}
              totalCards={displayedCards.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              currentCardId={displayedCards[currentCardIndex].id}
              onCheckboxChange={handleCheckboxChange}
            />
          </>
        ) : (
          <div className="no-cards">
            <p>
              {showOnlyChecked
                ? 'チェックした問題はまだありません。'
                : 'No flashcards yet. Add your first card to get started!'}
            </p>
          </div>
        )}
      </main>

      {showAddForm && (
        <AddCardForm onAddCard={handleAddCard} onClose={() => setShowAddForm(false)} />
      )}
    </div>
  )
}

export default App
