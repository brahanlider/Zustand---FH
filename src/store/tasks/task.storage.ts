import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>; //{[key:string]:Task}

  getTaskByStatus: (status: TaskStatus) => Task[];

  setDraggingTaksId: (taskId: string) => void;
  removeDragginTaskId: () => void;
  changeTaskStatus: (taksId: string, status: TaskStatus) => void;
}

// interface Actions {
// }

const storeApi: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
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
  setDraggingTaksId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },
  removeDragginTaskId: () => {
    set({ draggingTaskId: undefined });
  },
  changeTaskStatus: (taksId: string, status: TaskStatus) => {
    const task = get().tasks[taksId];
    task.status = status;
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taksId]: task,
      },
    }));
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    storeApi
    // // persist(
    // (...a) => ({
    //   ...storeApi(...a),
    // })
    // // )
  )
);
