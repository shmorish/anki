import './CardNavigation.css';

interface CardNavigationProps {
  currentIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CardNavigation({
  currentIndex,
  totalCards,
  onPrevious,
  onNext
}: CardNavigationProps) {
  return (
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
  );
}
