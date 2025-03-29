import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import classNames from "classnames";
import { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./SingleTask";
import { useTaskStore } from "../../store";

interface Props {
  title: string;
  tasks: Task[];
  value: TaskStatus;
}

export const JiraTasks = ({ title, tasks, value }: Props) => {
  //
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("handleDragOver");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("handleDragLeave");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("handleDrop", value);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classNames(
        "border-4  !text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-blue-500 border-dotted": isDragging,
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

        <button>
          <IoEllipsisHorizontalOutline />
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
