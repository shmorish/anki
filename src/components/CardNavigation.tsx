import { useEffect, useState } from 'react'
import { Button, Checkbox, Flex, HStack, Text, Stack } from '@chakra-ui/react'

interface CardNavigationProps {
  currentIndex: number
  totalCards: number
  onPrevious: () => void
  onNext: () => void
  currentCardId: number
  onCheckboxChange?: () => void
}

const STORAGE_KEY = 'flashcard-checked-ids'

export default function CardNavigation({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
  currentCardId,
  onCheckboxChange,
}: CardNavigationProps) {
  const [isChecked, setIsChecked] = useState(false)

  // Load checked state from localStorage
  useEffect(() => {
    const storedIds = localStorage.getItem(STORAGE_KEY)
    if (storedIds) {
      const checkedIds: number[] = JSON.parse(storedIds)
      setIsChecked(checkedIds.includes(currentCardId))
    } else {
      setIsChecked(false)
    }
  }, [currentCardId])

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)

    // Update localStorage
    const storedIds = localStorage.getItem(STORAGE_KEY)
    let checkedIds: number[] = storedIds ? JSON.parse(storedIds) : []

    if (checked) {
      // Add card ID if not already present
      if (!checkedIds.includes(currentCardId)) {
        checkedIds.push(currentCardId)
      }
    } else {
      // Remove card ID
      checkedIds = checkedIds.filter((id) => id !== currentCardId)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds))

    // Notify parent component about checkbox change
    if (onCheckboxChange) {
      onCheckboxChange()
    }
  }

  return (
    <Stack gap={4} mt={8}>
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

      <Flex justify="center">
        <label style={{ cursor: 'pointer' }}>
          <Flex
            align="center"
            gap={2}
            bg="gray.100"
            px={4}
            py={2}
            borderRadius="md"
            _hover={{ bg: 'gray.200' }}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: 'var(--chakra-colors-purple-500)'
              }}
            />
            <Text fontWeight="500">チェック</Text>
          </Flex>
        </label>
      </Flex>
    </Stack>
  )
}
