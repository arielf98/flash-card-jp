import { create } from "zustand";

interface CardsT {
  cards: Record<string, string>[];
  learned: number[];
  setLearned: (id: number) => void;
  setClearLearned: () => void;
}

export const cardsStore = create<CardsT>()((set) => ({
  cards: [],
  learned:
    (JSON.parse(localStorage.getItem("learned") ?? "[]") as number[]) ?? [],
  setLearned: (id) => {
    set((state) => {
      const updateLearned = [...state.learned, id];
      localStorage.setItem("learned", JSON.stringify(updateLearned));
      return { learned: [...state.learned, id] };
    });
  },
  setClearLearned: () => {
    set(() => {
      localStorage.removeItem("learned");
      return { learned: [] };
    });
  },
}));
