import { useShallow } from "zustand/shallow";
import { JiraTasks } from "../../components";
import { useTaskStore } from "../../store";

export const JiraPage = () => {
  // const task = useTaskStore((state) => state.tasks);
  // console.log(task);

  const pedingTasks = useTaskStore(
    useShallow((state) => state.getTaskByStatus("open"))
  );
  const inProgressTasks = useTaskStore(
    useShallow((state) => state.getTaskByStatus("in-progress"))
  );
  const doneTasks = useTaskStore(
    useShallow((state) => state.getTaskByStatus("done"))
  );

  // console.log({ pedingTasks, inProgressTasks, doneTasks });
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <JiraTasks title="Pendientes" tasks={pedingTasks} value="open" />

        <JiraTasks
          title="Avanzando"
          tasks={inProgressTasks}
          value="in-progress"
        />

        <JiraTasks title="Terminadas" tasks={doneTasks} value="done" />
      </div>
    </>
  );
};
