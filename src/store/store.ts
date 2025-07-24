import { makeAutoObservable } from "mobx";
import type { ITask } from "../tasks";
import api from "../api";

class TaskStore {
  items: ITask[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadTasks(); 
  }


  loadTasks = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const tasks = await api.getAllTasks();
      this.items = tasks;
    } catch (error) {
      this.error = "Failed to load tasks";
      console.error("Error loading tasks:", error);
    } finally {
      this.isLoading = false;
    }
  };

  createTask = async (taskData: Omit<ITask, 'id' | 'date'>) => {
    this.isLoading = true;
    this.error = null;
    try {
      const newTask = await api.createTask(taskData);
      this.items.push(newTask);
      return newTask;
    } catch (error) {
      this.error = "Failed to create task";
      console.error("Error creating task:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  deleteTask = async (id: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      const success = await api.deleteTask(id);
      if (success) {
        this.items = this.items.filter((item) => item.id !== id);
      }
      return success;
    } catch (error) {
      this.error = "Failed to delete task";
      console.error("Error deleting task:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  deleteAllTasks = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const deletePromises = this.items.map(task => api.deleteTask(task.id));
      await Promise.all(deletePromises);
      this.items = [];
    } catch (error) {
      this.error = "Failed to delete all tasks";
      console.error("Error deleting all tasks:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  updateTask = async (updatedTask: ITask) => {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await api.updateTask(updatedTask.id, updatedTask);
      if (result) {
        const index = this.items.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          this.items[index] = result;
        }
        return true;
      }
      return false;
    } catch (error) {
      this.error = "Failed to update task";
      console.error("Error updating task:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  searchTasks = async (criteria: { title?: string; date?: Date }) => {
    this.isLoading = true;
    this.error = null;
    try {
      const results = await api.searchTasks(criteria);
      return results;
    } catch (error) {
      this.error = "Failed to search tasks";
      console.error("Error searching tasks:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };
}

export default TaskStore;