import { useStore } from "../store/store-context";
import TaskList from "../features/TaskList";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Badge, Card, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = observer(() => {
  const taskStore = useStore();
  const navigate = useNavigate()
  return (
    <Flex gap="middle" align="start" justify="space-around" wrap>
      <Badge.Ribbon text="NEW">
        <Card style={{ width: 300 }} onClick={()=>navigate('/task/new')}>
          <center>
            <PlusCircleTwoTone style={{ fontSize: "60px" }} />
            <p style={{ fontSize: "16px" }}>
              <b>Добавить задачу!</b>
            </p>
          </center>
        </Card>
      </Badge.Ribbon>
      <TaskList tasks={taskStore.items}></TaskList>
    </Flex>
  );
});

export default MainPage;
