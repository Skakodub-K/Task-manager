export interface ITask {
  id: string;
  title: string;
  description: string;
  category: "bug" | "feature" | "documentation" | "refactor" | "test";
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  date: Date;
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