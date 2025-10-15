import { Flex, Stack } from '@chakra-ui/react'
import { useCardCheckbox } from '../hooks/useCardCheckbox'
import CheckboxField from './CheckboxField'
import NavigationButtons from './NavigationButtons'

interface CardNavigationProps {
  currentIndex: number
  totalCards: number
  onPrevious: () => void
  onNext: () => void
  currentCardId: number
  onCheckboxChange?: () => void
}

export default function CardNavigation({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
  currentCardId,
  onCheckboxChange,
}: CardNavigationProps) {
  const { isChecked, handleCheckboxChange } = useCardCheckbox({
    cardId: currentCardId,
    onCheckboxChange,
  })

  return (
    <Stack gap={4} mt={8}>
      <NavigationButtons
        currentIndex={currentIndex}
        totalCards={totalCards}
        onPrevious={onPrevious}
        onNext={onNext}
      />

      <Flex justify="center">
        <CheckboxField checked={isChecked} onChange={handleCheckboxChange} label="チェック" />
      </Flex>
    </Stack>
  )
}
