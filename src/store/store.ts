import { makeAutoObservable } from "mobx";
import type { ITask } from "../tasks";
import tasks from "../tasks";

class TaskStore {
  items: ITask[] = tasks;

  constructor() {
    makeAutoObservable(this);
  }

  createTask = ({
    id,
    title,
    description,
    category,
    status,
    priority,
  }: ITask) => {
    const date = new Date();
    this.items.push({
      id,
      title,
      description,
      category,
      status,
      priority,
      date,
    });
  };
  deleteTask = (id: number) => {
    this.items = this.items.filter((item) => item.id !== id);
  };
  deleteAllTasks = () => {
    this.items = [];
  };
  updateTask = (updatedTask: ITask) => {
    const index = this.items.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updatedTask };
      return true;
    }
    return false;
  };
  get getID() {
    return this.items.length + 1;
  }
}

export default TaskStore;
