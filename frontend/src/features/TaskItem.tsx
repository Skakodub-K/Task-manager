import { Card, Badge, Flex, Tag, Button } from "antd";
import type { ITask } from "../tasks";
import { PriorityColor, StatusColor, CategoryColor } from "../tasks";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store-context";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
interface TaskItemProps {
  item: ITask;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ item }) => {
  const { deleteTask } = useStore();
  const { id, title, description, category, status, priority, date } = item;
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    navigate("/");
    deleteTask(id);
  };

  return (
    <>
      <Badge.Ribbon text={item.priority} color={PriorityColor[priority]}>
        <Card
          title={title}
          style={{ width: 300 }}
          onClick={() => navigate(`/task/${id}`)}
        >
          <Tag icon={<CalendarOutlined />} color="default">{date.toLocaleDateString()}</Tag>
          <p>{description}</p>
          <Flex gap="4px 0" justify="space-between" wrap align="center">
            <div>
              <Tag color={CategoryColor[category]}>{category}</Tag>
              <Tag color={StatusColor[status]}>{status}</Tag>
            </div>
            <Button
              color="default"
              variant="text"
              style={{ fontSize: "22px", zIndex: 2 }}
              onClick={handleDelete}
            >
              <DeleteOutlined />
            </Button>
          </Flex>
        </Card>
      </Badge.Ribbon>
    </>
  );
});

export default TaskItem;
