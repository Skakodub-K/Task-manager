import { createContext, useContext } from "react";
import TaskStore from "./store";

export const TaskStoreContext = createContext<TaskStore | null>(null)
export const useStore = () => {
  const context = useContext(TaskStoreContext);
  if (context === null) {
    throw new Error(
      "You have forgotten to wrap your root component with TaskStoreContext"
    );
  }
  return context;
};