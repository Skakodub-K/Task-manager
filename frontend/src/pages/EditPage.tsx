import { useStore } from "../store/store-context";
import { Flex, Form } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import type { ITask } from "../tasks";
import TaskForm from "../features/TaskForm";
import NotFound from "./NotFound";
const EditPage: React.FC = observer(() => {
  const params = useParams();
  const [form] = Form.useForm();
  const isCreateMode = params.taskId === "new";
  const { createTask, updateTask, getID, items } = useStore();
  const navigate = useNavigate();

  let item:  Omit<ITask,'date'> | undefined;
  let editForm = <NotFound />;
  const handleOk = (id: number): void => {
    if (!item) return;

    form
      .validateFields()
      .then((values) => {
        if (isCreateMode) {
          createTask({ ...values, id: id });
        } else {
          updateTask({ ...values, id: id });
        }
        navigate("/");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  if (isCreateMode) {
    item = {
      id: getID,
      title: "",
      description: "",
      category: "bug",
      status: "To Do",
      priority: "Medium",
    };

    editForm = (
      <TaskForm
        form={form}
        init={item}
        onOk={() => handleOk(getID)}
        onCancel={() => navigate("/")}
      />
    );
  } else {
    item = items.find((task) => task.id === Number(params.taskId));

    if (item) {
      const itemId = item.id;
      editForm = (
        <TaskForm
          form={form}
          init={item}
          onOk={() => handleOk(itemId)}
          onCancel={() => navigate("/")}
        />
      );
    }
  }

  return (
    <Flex justify="center" align="center">
      {editForm}
    </Flex>
  );
});

export default EditPage;
