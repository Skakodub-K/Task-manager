import { useNavigate } from "react-router-dom";
import { Flex, Typography,Switch } from "antd";

const HeaderContent: React.FC = () => {
  const navigate = useNavigate();
  const { Text } = Typography;

  return (
    <Flex justify="space-between" align="center">
      <Text
        style={{ color: "#fff", fontSize: "24px", cursor: "pointer"}}
        onClick={() => navigate("/")}
      >
        Task Manager
      </Text>
      <Text style={{ color: "#fff", fontSize: "18px" }}>
        kanban
        <Switch
          style={{ left: "10px" }}
          onChange={(checked) =>
            checked ? navigate("/kanban") : navigate("/")
          }
        />
      </Text>
    </Flex>
  );
};
export default HeaderContent;