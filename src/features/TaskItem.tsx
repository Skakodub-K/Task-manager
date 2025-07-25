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

  const taskDate = typeof date === 'string' ? new Date(date) : date;
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    await deleteTask(id);
    navigate("/");
  };

  return (
    <>
      <Badge.Ribbon
        text={item.priority}
        color={PriorityColor[priority]}
        style={{ top: " -6px" }}
      >
        <Card
          title={title}
          style={{ width: 300, cursor: "pointer"}}
          onClick={() => navigate(`/task/${id}`)}
        >
          <div style={{ overflowWrap: "break-word", position:'relative', bottom:16 }}>
            <Tag icon={<CalendarOutlined />} color="default">
              {taskDate.toLocaleDateString()}
            </Tag>
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
          </div>
        </Card>
      </Badge.Ribbon>
    </>
  );
});

export default TaskItem;
