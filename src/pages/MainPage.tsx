import { useStore } from "../store/store-context";
import TaskList from "../features/TaskList";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Badge, Card, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ITask } from "../tasks";

const MainPage: React.FC = observer(() => {
  const taskStore = useStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');

  const filteredTasks = taskStore.items.filter((task: ITask) => {
    const categoryMatch = category 
      ? task.category.toLowerCase() === category.toLowerCase() 
      : true;
    
    const statusMatch = status 
      ? task.status.toLowerCase() === status.toLowerCase().replace('-', ' ') 
      : true;
    
    const priorityMatch = priority 
      ? task.priority.toLowerCase() === priority.toLowerCase() 
      : true;

    return categoryMatch && statusMatch && priorityMatch;
  });

  return (
    <Flex gap="middle" align="start" justify="space-around" wrap>
      <Badge.Ribbon text="NEW">
        <Card style={{ width: 300 }} onClick={() => navigate('/task/new')}>
          <center>
            <PlusCircleTwoTone style={{ fontSize: "60px" }} />
            <p style={{ fontSize: "16px" }}>
              <b>Добавить задачу!</b>
            </p>
          </center>
        </Card>
      </Badge.Ribbon>
      <TaskList 
        tasks={filteredTasks}
      />
    </Flex>
  );
});

export default MainPage;