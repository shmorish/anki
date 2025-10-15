import { useEffect, useState } from 'react'

const STORAGE_KEY = 'flashcard-checked-ids'

interface UseCardCheckboxProps {
  cardId: number
  onCheckboxChange?: () => void
}

export function useCardCheckbox({ cardId, onCheckboxChange }: UseCardCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false)

  // Load checked state from localStorage
  useEffect(() => {
    const storedIds = localStorage.getItem(STORAGE_KEY)
    if (storedIds) {
      const checkedIds: number[] = JSON.parse(storedIds)
      setIsChecked(checkedIds.includes(cardId))
    } else {
      setIsChecked(false)
    }
  }, [cardId])

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)

    // Update localStorage
    const storedIds = localStorage.getItem(STORAGE_KEY)
    let checkedIds: number[] = storedIds ? JSON.parse(storedIds) : []

    if (checked) {
      // Add card ID if not already present
      if (!checkedIds.includes(cardId)) {
        checkedIds.push(cardId)
      }
    } else {
      // Remove card ID
      checkedIds = checkedIds.filter((id) => id !== cardId)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds))

    // Notify parent component about checkbox change
    if (onCheckboxChange) {
      onCheckboxChange()
    }
  }

  return { isChecked, handleCheckboxChange }
}
