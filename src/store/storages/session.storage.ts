import { createJSONStorage, StateStorage } from "zustand/middleware";

// Custom storage object => storageApi
const storageApi: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): void | Promise<void> {
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("remove item", name);
  },
};

export const customSessionStorage = createJSONStorage(() => storageApi);
