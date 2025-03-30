import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: Date; //number, string, PRIMITIVO

  eventYYYYMMDD: () => string;
  eventHHMM: () => string;

  setEventDate: (parcialDate: string) => void;
  setEventTime: (parcialTime: string) => void;
}

export const createDateSlice: StateCreator<
  DateSlice,
  [["zustand/devtools", never]]
> = (set, get) => ({
  eventDate: new Date(),

  eventYYYYMMDD: () => {
    return get().eventDate.toISOString().split("T")[0];
  },
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, "0");
    const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  },

  setEventDate: (parcialDate: string) =>
    set((state) => {
      const date = new Date(parcialDate);
      // console.log(date);

      const year = date.getFullYear();
      const month = date.getMonth(); // +1
      const day = date.getDate() + 1;

      const newDate = new Date(state.eventDate);
      newDate.setFullYear(year, month, day);
      console.log(newDate);

      return { eventDate: newDate };

      console.log({ year, month, day });
    }),

  setEventTime: (parcialTime: string) =>
    set((state) => {
      const hours = parseInt(parcialTime.split(":")[0]);
      const minutes = parseInt(parcialTime.split(":")[1]);

      const newTime = new Date(state.eventDate);
      newTime.setHours(hours, minutes);
      console.log({ hours, minutes });
      console.log(newTime);

      return { eventDate: newTime };
    }),
  //
});
