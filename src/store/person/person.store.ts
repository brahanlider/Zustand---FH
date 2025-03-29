import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session.storage";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",
  // increase: (by) => set((state) => ({ bears: state.bears + by })),

  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),

  // setLastName,
});

export const usePersonStore = create<PersonState & Actions>()(
  persist(storeApi, {
    name: "personStore",
    storage: firebaseStorage,
  })
);
