import "./App.css";
import { Layout, Typography } from "antd";
import TaskList from "./components/TaskList";
import tasks from "./tasks";
function App() {
  const { Header, Footer, Content } = Layout;
  const { Text } = Typography;
  return (
    <Layout>
      <Header style={{ textAlign: "start" }}>
        <Text style={{ color: "#fff", fontSize: "24px" }}>Task Manager</Text>
      </Header>
      <Content>
        <TaskList tasks={tasks} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Task Manager ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
