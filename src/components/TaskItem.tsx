import {
  Card,
  Badge,
  Flex,
  Tag,
  Modal,
  Button,
  Form,
  Input,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { TaskI } from "../tasks";
import { useState } from "react";

enum PriorityColor {
  High = "red",
  Medium = "orange",
  Low = "green",
}

enum StatusColor {
  "To Do" = "#7eb8d1",
  "In Progress" = "#108ee9",
  "Done" = "#87d068",
}

enum CategoryColor {
  bug = "red",
  feature = "green",
  documentation = "blue",
  refactor = "purple",
  test = "cyan",
}

const TaskItem: React.FC<TaskI> = ({
  title: initialTitle,
  description: initialDescription,
  category: initialCategory,
  status: initialStatus,
  priority: initialPriority,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [taskData, setTaskData] = useState({
    title: initialTitle,
    description: initialDescription,
    category: initialCategory,
    status: initialStatus,
    priority: initialPriority,
  });

  const showModal = () => {
    form.setFieldsValue({
      title: taskData.title,
      description: taskData.description,
      category: taskData.category,
      status: taskData.status,
      priority: taskData.priority,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setTaskData({
          title: values.title,
          description: values.description,
          category: values.category,
          status: values.status,
          priority: values.priority,
        });
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Badge.Ribbon
      text={taskData.priority}
      color={PriorityColor[taskData.priority]}
    >
      <Card title={taskData.title} style={{ width: 300 }}>
        <p>{taskData.description}</p>
        <Flex gap="4px 0" justify="space-between" align="center">
          <div>
            <Tag color={CategoryColor[taskData.category]}>
              {taskData.category}
            </Tag>
            <Tag color={StatusColor[taskData.status]}>{taskData.status}</Tag>
          </div>
          <Button color="default" variant="text" onClick={showModal}>
            <EditOutlined />
          </Button>
          <Modal
            title="Режим редактирования"
            okText="Сохранить"
            cancelText="Отменить"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                title: taskData.title,
                description: taskData.description,
                category: taskData.category,
                status: taskData.status,
                priority: taskData.priority,
              }}
            >
              <Form.Item
                name="title"
                label="Заголовок"
                rules={[
                  { required: true, message: "Пожалуйста введите заголовок!" },
                ]}
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
          </Modal>
        </Flex>
      </Card>
    </Badge.Ribbon>
  );
};

export default TaskItem;
