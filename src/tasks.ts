export interface ITask {
  id: number;
  title: string;
  description: string;
  category: "bug" | "feature" | "documentation" | "refactor" | "test";
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  date:Date;
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
    date: new Date(),
  },
];

export default tasks;
