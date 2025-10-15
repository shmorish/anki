import { Button, HStack, Text } from '@chakra-ui/react'

interface NavigationButtonsProps {
  currentIndex: number
  totalCards: number
  onPrevious: () => void
  onNext: () => void
}

export default function NavigationButtons({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
}: NavigationButtonsProps) {
  return (
    <HStack gap={8} justify="center">
      <Button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        colorPalette="purple"
        size="lg"
        px={8}
        boxShadow="md"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        _active={{ transform: 'translateY(0)' }}
        _disabled={{
          opacity: 0.5,
          cursor: 'not-allowed',
          _hover: { transform: 'none' },
        }}
      >
        Previous
      </Button>

      <Text fontSize="xl" fontWeight="600" color="gray.700" minW="80px" textAlign="center">
        {currentIndex + 1} / {totalCards}
      </Text>

      <Button
        onClick={onNext}
        disabled={currentIndex === totalCards - 1}
        colorPalette="purple"
        size="lg"
        px={8}
        boxShadow="md"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        _active={{ transform: 'translateY(0)' }}
        _disabled={{
          opacity: 0.5,
          cursor: 'not-allowed',
          _hover: { transform: 'none' },
        }}
      >
        Next
      </Button>
    </HStack>
  )
}
