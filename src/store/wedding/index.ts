import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { devtools, persist } from "zustand/middleware";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";

// Crear el store

type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
  persist(
    devtools((...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
    })),
    {
      name: "wedding-store",
    }
  )
);
