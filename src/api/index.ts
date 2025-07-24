import type { ITask } from "../tasks";

class FakeAPI {
  private storageKey: string;
  private delay: number;

  constructor(storageKey: string = 'tasks', delay: number = 300) {
    this.storageKey = storageKey;
    this.delay = delay;
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.delay));
  }

  private getTasksFromStorage(): ITask[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  private saveTasksToStorage(tasks: ITask[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async getAllTasks(): Promise<ITask[]> {
    await this.simulateDelay();
    return this.getTasksFromStorage();
  }

  async getTaskById(id: string): Promise<ITask | undefined> {
    await this.simulateDelay();
    const tasks = this.getTasksFromStorage();
    return tasks.find(task => task.id === id);
  }

  async createTask(taskData: Omit<ITask, 'id' | 'date'>): Promise<ITask> {
    await this.simulateDelay();
    const tasks = this.getTasksFromStorage();
    const newTask: ITask = {
      ...taskData,
      id: this.generateId(),
      date: new Date(),
    };
    tasks.push(newTask);
    this.saveTasksToStorage(tasks);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<ITask>): Promise<ITask | undefined> {
    await this.simulateDelay();
    const tasks = this.getTasksFromStorage();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return undefined;
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
    };
    
    tasks[taskIndex] = updatedTask;
    this.saveTasksToStorage(tasks);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    await this.simulateDelay();
    const tasks = this.getTasksFromStorage();
    const initialLength = tasks.length;
    const filteredTasks = tasks.filter(task => task.id !== id);
    this.saveTasksToStorage(filteredTasks);
    return filteredTasks.length !== initialLength;
  }

  async searchTasks(criteria: { title?: string; date?: Date }): Promise<ITask[]> {
    await this.simulateDelay();
    const tasks = this.getTasksFromStorage();
    
    return tasks.filter(task => {
      const matchesTitle = criteria.title 
        ? task.title.toLowerCase().includes(criteria.title.toLowerCase())
        : true;
      
      const matchesDate = criteria.date
        ? new Date(task.date).toDateString() === criteria.date.toDateString()
        : true;
      
      return matchesTitle && matchesDate;
    });
  }
}

const api = new FakeAPI();
export default api;