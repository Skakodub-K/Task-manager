import TaskItem from "./TaskItem";
import type { ITask } from "../tasks";
import { observer } from "mobx-react-lite";
interface TaskListProps {
  tasks: ITask[];
}
const TaskList: React.FC<TaskListProps> = observer(({ tasks }) => {
  return tasks.map((task) => (
        <TaskItem key={task.id} item={task} />
      )
  );
});
export default TaskList;
