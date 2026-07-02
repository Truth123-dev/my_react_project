import { todos, TodoRecord } from "../config/db";

export async function createTodo(
  userId: string,
  title: string,
  description?: string,
) {
  const todo: TodoRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    title,
    description: description ?? null,
    completed: false,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(todo);
  return todo;
}

export async function getTodosByUser(userId: string) {
  return todos
    .filter((todo) => todo.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getTodoById(id: string) {
  return todos.find((todo) => todo.id === id) ?? null;
}

export async function updateTodo(
  id: string,
  data: {
    title?: string;
    description?: string | null;
    completed?: boolean;
  },
) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  const current = todos[index];
  const updated: TodoRecord = {
    ...current,
    title: data.title ?? current.title,
    description:
      data.description === undefined ? current.description : data.description,
    completed:
      data.completed === undefined ? current.completed : data.completed,
    updatedAt: new Date().toISOString(),
  };

  todos[index] = updated;
  return updated;
}

export async function deleteTodo(id: string) {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  const [deleted] = todos.splice(index, 1);
  return deleted;
}
