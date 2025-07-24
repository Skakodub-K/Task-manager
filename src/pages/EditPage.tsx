import { useStore } from "../store/store-context";
import { Flex, Spin, Form, message } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../features/TaskForm";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";

const EditPage: React.FC = observer(() => {
  const params = useParams<{ taskId: string }>();
  const [form] = Form.useForm();
  const isCreateMode = params.taskId === "new";
  const taskStore = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskStore.items.length === 0) {
      taskStore.loadTasks();
    }
  }, [taskStore]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (isCreateMode) {
        await taskStore.createTask(values);
        message.success("Задача создана");
      } else if (params.taskId) {
        await taskStore.updateTask({
          ...values,
          id: params.taskId,
          date: new Date(),
        });
        message.success("Задача обновлена");
      }
      navigate("/");
    } catch (error) {
      message.error("Ошибка сохнанения");
      console.error("Error saving task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!isCreateMode && params.taskId) {
    const task = taskStore.items.find((task) => task.id === params.taskId);
    if (!task && !taskStore.isLoading) {
      return <NotFound />;
    }
  }

  const initialValues = isCreateMode
    ? {
        title: "",
        description: "",
        category: "bug",
        status: "To Do",
        priority: "Medium",
      }
    : taskStore.items.find((task) => task.id === params.taskId);

  return (
    <Flex justify="center" align="center">
      {loading ? (
        <Spin style={{top:'30vh'}} size="large"></Spin>
      ) : (
        <TaskForm
          form={form}
          init={initialValues}
          onOk={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </Flex>
  );
});

export default EditPage;
