import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

import classNames from "classnames";

import { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./SingleTask";
import { useTasks } from "../../hooks/useTasks";

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
  //
  const {
    isDragging,

    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
    onDragOver,
  } = useTasks({ status });

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        "border-4  !text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-blue-500 border-dotted": isDragging,
          "border-green-500 border-dotted": isDragging && onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center bg-indigo-100 rounded-full h-9 w-9">
            <span className="flex items-center justify-center w-6 h-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="w-full h-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
