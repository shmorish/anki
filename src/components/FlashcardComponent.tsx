import { useState } from 'react'
import { Badge, Box, Text, Stack } from '@chakra-ui/react'
import type { Flashcard } from '../types/flashcard'

interface FlashcardComponentProps {
  card: Flashcard
}

export default function FlashcardComponent({ card }: FlashcardComponentProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Reset flip state when card changes
  const [prevCardId, setPrevCardId] = useState(card.id)
  if (prevCardId !== card.id) {
    setIsFlipped(false)
    setPrevCardId(card.id)
  }

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
    <Box
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      cursor="pointer"
      w="full"
      maxW="600px"
      h="400px"
      mx="auto"
      style={{ perspective: '1000px' }}
    >
      <Box
        position="relative"
        w="full"
        h="full"
        transition="transform 0.6s"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <Stack
          position="absolute"
          w="full"
          h="full"
          borderRadius="16px"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
          p={8}
          bgGradient="to-br"
          gradientFrom="purple.400"
          gradientTo="purple.600"
          color="white"
          style={{ backfaceVisibility: 'hidden' }}
          gap={4}
          justify="space-between"
        >
          <Badge
            alignSelf="flex-start"
            bg="whiteAlpha.300"
            color="white"
            px={4}
            py={2}
            borderRadius="20px"
            fontSize="sm"
            fontWeight="600"
          >
            {card.category}
          </Badge>
          <Box flex={1} display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" lineHeight="1.6" textAlign="center">
              {card.front}
            </Text>
          </Box>
          <Text fontSize="sm" opacity={0.8} textAlign="center">
            Click to reveal answer
          </Text>
        </Stack>

        {/* Back of card */}
        <Stack
          position="absolute"
          w="full"
          h="full"
          borderRadius="16px"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
          p={8}
          bgGradient="to-br"
          gradientFrom="pink.300"
          gradientTo="red.400"
          color="white"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          gap={4}
          justify="space-between"
        >
          <Badge
            alignSelf="flex-start"
            bg="whiteAlpha.300"
            color="white"
            px={4}
            py={2}
            borderRadius="20px"
            fontSize="sm"
            fontWeight="600"
          >
            {card.category}
          </Badge>
          <Box flex={1} display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="2xl" lineHeight="1.6" textAlign="center">
              {card.back}
            </Text>
          </Box>
          <Text fontSize="sm" opacity={0.8} textAlign="center">
            Click to see question
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}
