export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

export interface FlashcardData {
  cards: Flashcard[];
}
