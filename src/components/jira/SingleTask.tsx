import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../interfaces";

interface Props {
  task: Task;
}

export const SingleTask = ({ task }: Props) => {
  return (
    <div className="flex items-center justify-between p-2 mt-5">
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span className="w-6 h-6 cursor-pointer text-navy-700">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};
