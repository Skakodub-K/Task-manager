import TaskItem from "./TaskItem";
import type { TaskI } from "../tasks";
import { Flex } from "antd";
interface TaskListProps {
  tasks: TaskI[];
}
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <Flex gap="middle" align="start" justify="space-around" wrap>
      {tasks.map((task) => (
        <TaskItem
          id={task.id}
          title={task.title}
          description={task.description}
          category={task.category}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </Flex>
  );
};
export default TaskList;
