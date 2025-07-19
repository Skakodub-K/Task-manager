import { Form, Input, Select, type FormInstance } from "antd";
import type { ITask } from "../tasks";
import { PriorityColor, StatusColor, CategoryColor } from "../tasks";
import { observer } from "mobx-react-lite";
interface TaskFormProps {
  init: Omit<ITask, "id">;
  form: FormInstance;
}
const TaskForm: React.FC<TaskFormProps> = observer(({ init, form }) => {
  return (
    <Form form={form} initialValues={init} layout="vertical">
      <Form.Item
        name="title"
        label="Заголовок"
        rules={[{ required: true, message: "Пожалуйста введите заголовок!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="category" label="Категория">
        <Select>
          {Object.keys(CategoryColor).map((cat) => (
            <Select.Option key={cat} value={cat}>
              {cat}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Статус">
        <Select>
          {Object.keys(StatusColor).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="priority" label="Приоритет">
        <Select>
          {Object.keys(PriorityColor).map((priority) => (
            <Select.Option key={priority} value={priority}>
              {priority}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default TaskForm;
