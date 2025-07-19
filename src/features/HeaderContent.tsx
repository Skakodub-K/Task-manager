import { useNavigate, useSearchParams } from "react-router-dom";
import { Flex, Typography, Dropdown, Button, Grid, Menu, Drawer } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

const { useBreakpoint } = Grid;
const { Text } = Typography;

interface FilterItem {
  key: string;
  label: string;
}

type FilterType = "category" | "status" | "priority";
type FilterMenuItems = (FilterItem | { type: "divider" })[];

interface FilterConfig {
  type: FilterType;
  items: FilterMenuItems;
  displayText: (value?: string) => string;
}

interface MobileFiltersProps {
  currentFilters: Record<FilterType, string | undefined>;
  filterConfigs: FilterConfig[];
  updateFilters: (filterType: FilterType, value?: string) => void;
}

const HeaderContent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const screens = useBreakpoint();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentFilters = {
    category: searchParams.get("category") || undefined,
    status: searchParams.get("status") || undefined,
    priority: searchParams.get("priority") || undefined,
  };

  const updateFilters = (filterType: FilterType, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }

    navigate({ search: params.toString() });
    setMobileMenuOpen(false);
  };

  const filterConfigs: FilterConfig[] = [
    {
      type: "category",
      items: [
        { key: "all-category", label: "all" },
        { type: "divider" },
        { key: "bug", label: "bug" },
        { key: "feature", label: "feature" },
        { key: "documentation", label: "documentation" },
        { key: "refactor", label: "refactor" },
        { key: "test", label: "test" },
      ],
      displayText: (value) => `Категория: ${value || "all"}`,
    },
    {
      type: "status",
      items: [
        { key: "all-status", label: "all" },
        { type: "divider" },
        { key: "to-do", label: "To Do" },
        { key: "in-progress", label: "In Progress" },
        { key: "done", label: "Done" },
      ],
      displayText: (value) =>
        `Статус: ${value ? value.replace("-", " ") : "all"}`,
    },
    {
      type: "priority",
      items: [
        { key: "all-priority", label: "all" },
        { type: "divider" },
        { key: "high", label: "High" },
        { key: "medium", label: "Medium" },
        { key: "low", label: "Low" },
      ],
      displayText: (value) => `Приоритет: ${value || "all"}`,
    },
  ];

  const handleFilterClick =
    (filterType: FilterType) => (e: { key: string }) => {
      updateFilters(
        filterType,
        e.key === `all-${filterType}` ? undefined : e.key
      );
    };

  const DesktopFilters = () => (
    <Flex gap="middle" align="center">
      {filterConfigs.map((config) => (
        <Dropdown
          key={config.type}
          menu={{
            items: config.items,
            onClick: handleFilterClick(config.type),
          }}
          trigger={["click"]}
        >
          <Button>
            {config.displayText(currentFilters[config.type])} <DownOutlined />
          </Button>
        </Dropdown>
      ))}
    </Flex>
  );

  const MobileFilters: React.FC<MobileFiltersProps> = ({
    currentFilters,
    filterConfigs,
    updateFilters,
  }) => {
    const mobileMenuItems: MenuProps["items"] = filterConfigs.map((config) => {
      const items = config.items.map((item) => {
        if ("type" in item && item.type === "divider") {
          return { type: "divider" } as const;
        }

        const filterItem = item as FilterItem;
        const isAllItem = filterItem.key.startsWith("all-");
        const isSelected = isAllItem
          ? !currentFilters[config.type]
          : filterItem.key === currentFilters[config.type];

        return {
          key: filterItem.key,
          label: filterItem.label,
          onClick: () =>
            updateFilters(config.type, isAllItem ? undefined : filterItem.key),
          style: isSelected ? { backgroundColor: "#e6f7ff" } : undefined,
        };
      });

      return {
        key: config.type,
        label: config.displayText(currentFilters[config.type]),
        children: items,
      };
    });

    return (
      <Menu
        mode="inline"
        items={mobileMenuItems}
        style={{ width: "100%", border: "none" }}
        selectable={false}
      />
    );
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ position: "relative", top: 15 }}
    >
      <Text
        style={{ color: "#fff", fontSize: "24px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Task Manager
      </Text>

      {screens.md ? (
        <DesktopFilters />
      ) : (
        <>
          <Button
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
          />

          <Drawer
            title="Фильтры"
            placement="right"
            onClose={() => setMobileMenuOpen(false)}
            open={mobileMenuOpen}
            width={250}
          >
            <MobileFilters
              currentFilters={currentFilters}
              filterConfigs={filterConfigs}
              updateFilters={updateFilters}
            />
          </Drawer>
        </>
      )}
    </Flex>
  );
};

export default HeaderContent;
