export interface ITask {
  id: number;
  title: string;
  description: string;
  category: "bug" | "feature" | "documentation" | "refactor" | "test";
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  date?:string;
}
export enum PriorityColor {
  High = "red",
  Medium = "orange",
  Low = "green",
}

export enum StatusColor {
  "To Do" = "#7eb8d1",
  "In Progress" = "#108ee9",
  "Done" = "#87d068",
}

export enum CategoryColor {
  bug = "red",
  feature = "green",
  documentation = "blue",
  refactor = "purple",
  test = "cyan",
}

const tasks: ITask[] = [
  {
    id: 1,
    title: "Исправить баг в авторизации",
    description: "При логине иногда выдает 500 ошибку",
    category: "bug",
    status: "To Do",
    priority: "High",
  },
  {
    id: 2,
    title: "Добавить фильтры в таблицу",
    description: "Реализовать фильтрацию по дате и статусу",
    category: "feature",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 3,
    title: "Обновить документацию API",
    description: "Добавить новые endpoints в Swagger",
    category: "documentation",
    status: "Done",
    priority: "Low",
  },
  {
    id: 4,
    title: "Рефакторинг модуля платежей",
    description: "Разделить на подмодули для лучшей поддержки",
    category: "refactor",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 5,
    title: "Написать тесты для корзины",
    description: "Покрыть тестами основные сценарии",
    category: "test",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 6,
    title: "Реализовать темную тему",
    description:
      "Добавить переключение между светлой и темной темой интерфейса",
    category: "feature",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 7,
    title: "Исправить баг с кэшированием",
    description: "Данные не обновляются после изменения настроек профиля",
    category: "bug",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 8,
    title: "Оптимизировать загрузку изображений",
    description: "Реализовать lazy loading для галереи",
    category: "refactor",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 9,
    title: "Добавить FAQ раздел",
    description: "Создать страницу с часто задаваемыми вопросами",
    category: "documentation",
    status: "Done",
    priority: "Low",
  },
  {
    id: 10,
    title: "Тестирование на мобильных устройствах",
    description: "Проверить адаптивность на iOS и Android",
    category: "test",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 11,
    title: "Интеграция с платежной системой",
    description: "Добавить поддержку Apple Pay и Google Pay",
    category: "feature",
    status: "To Do",
    priority: "High",
  },
  {
    id: 12,
    title: "Исправить баг с таймзонами",
    description: "Время в отчетах отображается неверно для некоторых регионов",
    category: "bug",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 13,
    title: "Рефакторинг API авторизации",
    description: "Перевести на JWT токены вместо сессий",
    category: "refactor",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 14,
    title: "Обновить руководство для новых разработчиков",
    description: "Добавить раздел по настройке окружения",
    category: "documentation",
    status: "Done",
    priority: "Low",
  },
  {
    id: 15,
    title: "Написать e2e тесты для главной страницы",
    description: "Проверить основные пользовательские сценарии",
    category: "test",
    status: "To Do",
    priority: "Medium",
  },
];

export default tasks;
