import { create } from "zustand";
import { LOCAL_STORAGE_KEY } from "../constant";

interface InitialCardsT {
  id: number;
  front: string;
  back: string;
}
interface CardsT {
  cards: InitialCardsT[];
  learned: number[];
  setLearned: (id: number) => void;
  setClearLearned: () => void;
  setShuffleCards: () => void;
}

const initialCards: InitialCardsT[] = [
  { id: 1, front: "What is React?", back: "A JavaScript library for UI." },
  { id: 2, front: "What is JSX?", back: "A syntax extension for JavaScript." },
  { id: 3, front: "What is Tailwind?", back: "A utility-first CSS framework." },
  {
    id: 4,
    front: "What is useState?",
    back: "A React Hook for state management.",
  },
];

export const cardsStore = create<CardsT>()((set) => ({
  cards: initialCards,
  learned:
    (JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY.LEARNED) ?? "[]"
    ) as number[]) ?? [],
  setLearned: (id) => {
    set((state) => {
      if (state.learned.includes(id)) {
        const removeLearnedById = state.learned.filter(
          (learnedId) => learnedId !== id
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEY.LEARNED,
          JSON.stringify(removeLearnedById)
        );
        return { learned: removeLearnedById };
      }
      const updateLearned = [...state.learned, id];
      localStorage.setItem(
        LOCAL_STORAGE_KEY.LEARNED,
        JSON.stringify(updateLearned)
      );
      return { learned: [...state.learned, id] };
    });
  },
  setClearLearned: () => {
    set(() => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.LEARNED);
      return { learned: [] };
    });
  },
  setShuffleCards: () => {
    set((state) => {
      const shuffledCards = state.cards.sort(() => Math.random() - 0.5);
      return { cards: shuffledCards };
    });
  },
}));
