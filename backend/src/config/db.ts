export interface UserRecord {
  id: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface TodoRecord {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const users: UserRecord[] = [];
export const todos: TodoRecord[] = [];
