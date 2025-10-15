import { useState, useEffect } from 'react';
import './CardNavigation.css';

interface CardNavigationProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
  currentCardId: number;
  onCheckboxChange?: () => void;
}

const STORAGE_KEY = 'flashcard-checked-ids';

export default function CardNavigation({
  currentIndex,
  totalCards,
  onPrevious,
  onNext,
  currentCardId,
  onCheckboxChange
}: CardNavigationProps) {
  const [isChecked, setIsChecked] = useState(false);

  // Load checked state from localStorage
  useEffect(() => {
    const storedIds = localStorage.getItem(STORAGE_KEY);
    if (storedIds) {
      const checkedIds: number[] = JSON.parse(storedIds);
      setIsChecked(checkedIds.includes(currentCardId));
    } else {
      setIsChecked(false);
    }
  }, [currentCardId]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    // Update localStorage
    const storedIds = localStorage.getItem(STORAGE_KEY);
    let checkedIds: number[] = storedIds ? JSON.parse(storedIds) : [];

    if (checked) {
      // Add card ID if not already present
      if (!checkedIds.includes(currentCardId)) {
        checkedIds.push(currentCardId);
      }
    } else {
      // Remove card ID
      checkedIds = checkedIds.filter(id => id !== currentCardId);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));

    // Notify parent component about checkbox change
    if (onCheckboxChange) {
      onCheckboxChange();
    }
  };

  return (
    <div className="card-navigation-wrapper">
      <div className="card-navigation">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="nav-button"
        >
          Previous
        </button>

        <div className="card-counter">
          {currentIndex + 1} / {totalCards}
        </div>

        <button
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
          className="nav-button"
        >
          Next
        </button>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span>チェック</span>
        </label>
      </div>
    </div>
  );
}
