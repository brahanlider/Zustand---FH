import { create, StateCreator } from "zustand";
import { v4 as uuidv4 } from "uuid";

// import { produce } from "immer";
import { devtools } from "zustand/middleware";
import type { Task, TaskStatus } from "../../interfaces";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>; //{[key:string]:Task}

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removeDragginTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

// interface Actions {
// }

const storeApi: StateCreator<
  TaskState,
  [["zustand/devtools", never], ["zustand/immer", never]]
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "done" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "in-progress" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title: title, status: status };

    //? Middleware immer
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    //? Requiere => npm i immer
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })
    // );

    //? Forma nativa de zustand  (...)
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },
  removeDragginTaskId: () => {
    set({ draggingTaskId: undefined });
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    //? Middleware immer
    const task = { ...get().tasks[taskId] };
    task.status = status;

    set((state) => {
      state.tasks[taskId] = {
        ...task,
        // ...state.tasks[taskId],
        // status,
      };
    });

    //? Forma nativa de zustand  (...)
    // const task = ...get().tasks[taskId];
    // task.status = status;

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }));
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDragginTaskId;
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    immer(
      storeApi
      // // persist(
      // (...a) => ({
      //   ...storeApi(...a),
      // })
      // // )
    )
  )
);
