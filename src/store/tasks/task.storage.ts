import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
// import { devtools, persist } from "zustand/middleware";

interface TaskState {
  tasks: Record<string, Task>; //{[key:string]:Task}

  getTaskByStatus: (status: TaskStatus) => Task[];
}

// interface Actions {
// }

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "done" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "in-progress" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },

  getTaskByStatus: (status: TaskStatus) => {
    // const state = get(); // Obtiene el estado actual
    // const tasksArray = Object.values(state.tasks); // Convierte el Record a array
    // return tasksArray.filter((task) => task.status === status); // Filtra por status

    return Object.values(get().tasks).filter((task) => task.status === status);
  },
});

export const useTaskStore = create<TaskState>()(
  storeApi
  // // devtools(
  // // persist(
  // (...a) => ({
  //   ...storeApi(...a),
  // })
  // // )
  // // )
);
