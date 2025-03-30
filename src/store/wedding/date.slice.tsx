import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: number; //number, string, PRIMITIVO => for pesist

  eventYYYYMMDD: () => string;
  eventHHMM: () => string;

  setEventDate: (parcialDate: string) => void;
  setEventTime: (parcialTime: string) => void;
}

export const createDateSlice: StateCreator<
  DateSlice,
  [["zustand/devtools", never]]
> = (set, get) => ({
  eventDate: Date.now(), // Valor inicial (fecha actual)

  eventYYYYMMDD: () => {
    try {
      const date = new Date(get().eventDate);
      // Validación extra para asegurar fecha válida
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return date.toISOString().split("T")[0];
    } catch {
      return new Date().toISOString().split("T")[0]; // Fallback a fecha actual
    }
  },
  eventHHMM: () => {
    try {
      const date = new Date(get().eventDate);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch {
      return "00:00"; // Fallback a medianoche
    }
  },

  setEventDate: (partialDate: string) => {
    try {
      // Validación mejorada del input
      if (!partialDate || isNaN(new Date(partialDate).getTime())) return;

      const newDate = new Date(partialDate);
      const currentDate = new Date(get().eventDate);

      // Ajuste de fecha manteniendo hora actual (con +1 para corrección de timezone)
      const adjustedDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate() + 1,
        currentDate.getHours(),
        currentDate.getMinutes()
      );

      // Validación final antes de guardar
      if (!isNaN(adjustedDate.getTime())) {
        set({ eventDate: adjustedDate.getTime() });
      }
    } catch (error) {
      console.error("Error setting date:", error);
    }
  },

  setEventTime: (partialTime: string) => {
    try {
      // Validación del formato HH:MM
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(partialTime)) return;

      const [hours, minutes] = partialTime.split(":").map(Number);
      const currentDate = new Date(get().eventDate);

      // Crear nueva fecha con hora actualizada
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes
      );

      set({ eventDate: newDate.getTime() });
    } catch (error) {
      console.error("Error setting time:", error);
    }
  },
});
