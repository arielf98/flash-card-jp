import { create } from "zustand";

interface CardsT {
  cards: Record<string, string>[];
  learned: number[];
  setLearned: (id: number) => void;
  setClearLearned: () => void;
}

export const cardsStore = create<CardsT>()((set) => ({
  cards: [],
  learned: [],
  setLearned: (id) => set((state) => ({ learned: [...state.learned, id] })),
  setClearLearned: () => set({ learned: [] }),
}));
