import { Layout } from "antd";
import HeaderContent from "./features/HeaderContent";
import { TaskStoreContext } from "./store/store-context";
import TaskStore from "./store/store";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditPage from "./pages/EditPage";
import NotFound from "./pages/NotFound";

function App() {
  const { Header, Footer, Content } = Layout;
  const taskStore = new TaskStore();
  return (
    <TaskStoreContext.Provider value={taskStore}>
      <BrowserRouter>
        <Layout>
          <Header>
            <HeaderContent />
          </Header>
          <Content style={{ minHeight: "82vh", minWidth: "100vw" }}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/task/:taskId" element={<EditPage />} />
              <Route path="/:filter" element={<MainPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Task Manager ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </BrowserRouter>
    </TaskStoreContext.Provider>
  );
}

export default App;
