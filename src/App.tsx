import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import AddCardForm from './components/AddCardForm'
import CardNavigation from './components/CardNavigation'
import FlashcardComponent from './components/FlashcardComponent'
import flashcardsData from './data/flashcards.json'
import type { Flashcard, FlashcardData } from './types/flashcard'

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
    <Container maxW="container.xl" minH="100vh" py={8}>
      <Stack gap={8} align="stretch">
        <Box as="header" textAlign="center" py={4}>
          <Heading
            size="2xl"
            bgGradient="to-r"
            gradientFrom="purple.400"
            gradientTo="purple.600"
            backgroundClip="text"
            mb={3}
          >
            Network Flashcards
          </Heading>
          <Text color="gray.600" fontSize="lg" mb={4}>
            Click on a card to flip it and see the answer
          </Text>
          <Flex gap={4} justify="center" mt={4}>
            <Button
              onClick={handleToggleFilter}
              colorPalette={showOnlyChecked ? 'cyan' : 'pink'}
              size="lg"
              boxShadow="md"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              _active={{ transform: 'translateY(0)' }}
            >
              {showOnlyChecked ? '全ての問題を表示' : 'チェックした問題のみ'}
            </Button>
            <Button
              onClick={() => setShowAddForm(true)}
              colorPalette="purple"
              size="lg"
              boxShadow="md"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              _active={{ transform: 'translateY(0)' }}
            >
              + Add Card
            </Button>
          </Flex>
        </Box>

        <Flex as="main" flex={1} direction="column" justify="center" align="center" w="full">
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
            <Box textAlign="center" py={12}>
              <Text color="gray.600" fontSize="xl">
                {showOnlyChecked
                  ? 'チェックした問題はまだありません。'
                  : 'No flashcards yet. Add your first card to get started!'}
              </Text>
            </Box>
          )}
        </Flex>

        {showAddForm && (
          <AddCardForm onAddCard={handleAddCard} onClose={() => setShowAddForm(false)} />
        )}
      </Stack>
    </Container>
  )
}

export default App
