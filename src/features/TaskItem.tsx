import { Card, Badge, Form, Flex, Tag, Modal, Button } from "antd";
import type { ITask } from "../tasks";
import { PriorityColor, StatusColor, CategoryColor } from "../tasks";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import TaskForm from "./TaskForm";
import { useStore } from "../store/store-context";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";

interface TaskItemProps {
  item: ITask;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ item }) => {
  const [form] = Form.useForm();
  const params = useParams();
  const isCreateMode = params.taskId === "new";
  const { updateTask, deleteTask, createTask, getID } = useStore();
  const { id, title, description, category, status, priority } = item;
  const navigate = useNavigate();

  const isModalOpen = params.taskId === id.toString() || isCreateMode;

  const handleOk = (): void => {
    form
      .validateFields()
      .then((values: ITask) => {
        if (isCreateMode) {
          createTask({ ...values, id: getID });
        } else {
          updateTask({ ...values, id });
        }
        navigate("/");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    navigate("/");
    deleteTask(id);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    form.setFieldsValue({
      title: title,
      description: description,
      category: category,
      status: status,
      priority: priority,
    });
    navigate("/");
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(item);
    }
  }, [isModalOpen, form, item]);

  return (
    <>
      <Badge.Ribbon text={item.priority} color={PriorityColor[priority]}>
        <Card
          title={title}
          style={{ width: 300 }}
          onClick={() => navigate(`/task/${id}`)}
        >
          <p>{description}</p>
          <Flex gap="4px 0" justify="space-between" align="center">
            <div>
              <Tag color={CategoryColor[category]}>{category}</Tag>
              <Tag color={StatusColor[status]}>{status}</Tag>
            </div>
            <Button
              color="default"
              variant="text"
              style={{ fontSize: "20px", zIndex: 2 }}
              onClick={handleDelete}
            >
              <DeleteTwoTone />
            </Button>
          </Flex>
        </Card>
      </Badge.Ribbon>

      <Modal
        title="Режим редактирования"
        okText="Сохранить"
        cancelText="Отменить"
        open={isModalOpen}
        onOk={handleOk}
        mask={true}
        onCancel={handleCancel}
      >
        <TaskForm init={item} form={form} />
      </Modal>
    </>
  );
});

export default TaskItem;
