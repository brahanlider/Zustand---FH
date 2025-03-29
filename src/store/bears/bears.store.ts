import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  totalBears: () => number;

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  doNothing: () => void;
  addBears: () => void;
  cleanBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,

      bears: [{ id: 1, name: "jugueton" }],

      //! __get__ => es de JS - NO de ZUSTAND
      totalBears: () => {
        return (
          get().blackBears +
          get().polarBears +
          get().pandaBears +
          get().bears.length
        );
      },

      increaseBlackBears: (by: number) =>
        set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by: number) =>
        set((state) => ({ polarBears: state.polarBears + by })),
      increasePandaBears: (by: number) =>
        set((state) => ({ pandaBears: state.pandaBears + by })),
      // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      // removeAllBears: () => set({ bears: 0 }),
      // updateBears: (newBears) => set({ bears: newBears }),

      doNothing: () => set((state) => ({ bears: [...state.bears] })),
      addBears: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `Oso #${state.bears.length + 1}`,
            },
          ],
        })),
      cleanBears: () => set({ bears: [] }),
    }),
    {
      name: "bears-storage",
    }
  )
);
