import { createContext } from "react";
import type { Todo } from "../types/Todo";

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string, priority: string, dueDate: string) => void;
  deleteTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);
