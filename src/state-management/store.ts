import { create } from "zustand";
import { LOCAL_STORAGE_KEY } from "../constant";

interface CardsT {
  cards: Record<string, string>[];
  learned: number[];
  setLearned: (id: number) => void;
  setClearLearned: () => void;
}

export const cardsStore = create<CardsT>()((set) => ({
  cards: [],
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
}));
