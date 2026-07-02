import axios from "./axios";
import type { LoginData, RegisterData, User } from "../types/auth";
import { getStored, setStored } from "../utils/storage";

const USERS_KEY = "auth_users";
const TOKEN_KEY = "auth_token";

type StoredUser = {
  id: string;
  email: string;
  password: string;
  role?: "admin" | "user";
};

function loadUsers(): StoredUser[] {
  return getStored<StoredUser[]>(USERS_KEY) ?? [];
}

function saveUsers(users: StoredUser[]) {
  setStored(USERS_KEY, users);
}

function createToken(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

type AuthResponse = {
  success: boolean;
  user: User;
};

export async function loginRequest(data: LoginData): Promise<User> {
  if (import.meta.env.VITE_API_URL) {
    const response = await axios.post<AuthResponse>("/auth/login", data);
    return response.data.user;
  }

  const users = loadUsers();
  const match = users.find(
    (user) => user.email === data.email && user.password === data.password,
  );

  if (!match) {
    throw new Error("Invalid email or password");
  }

  const token = createToken();
  setStored(TOKEN_KEY, token);

  return {
    id: match.id,
    email: match.email,
    token,
    role: match.role,
  };
}

export async function registerRequest(data: RegisterData): Promise<User> {
  if (import.meta.env.VITE_API_URL) {
    const response = await axios.post<AuthResponse>("/auth/register", data);
    return response.data.user;
  }

  const users = loadUsers();
  const existing = users.some((user) => user.email === data.email);

  if (existing) {
    throw new Error("Email is already registered");
  }

  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const newUser: StoredUser = {
    id,
    email: data.email,
    password: data.password,
    role: "user",
  };

  users.push(newUser);
  saveUsers(users);

  const token = createToken();
  setStored(TOKEN_KEY, token);

  return {
    id: newUser.id,
    email: newUser.email,
    token,
    role: newUser.role,
  };
}
