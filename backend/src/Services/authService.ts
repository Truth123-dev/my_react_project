import bcrypt from "bcrypt";
import { users, UserRecord } from "../config/db";

export async function registerUser(email: string, password: string) {
  const existing = users.find((user) => user.email === email);

  if (existing) {
    throw new Error("Email is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    email,
    password: hashedPassword,
    role: "user",
  };

  users.push(newUser);
  return newUser;
}

export async function authenticateUser(email: string, password: string) {
  const user = users.find((item) => item.email === email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password.");
  }

  return user;
}

export async function getUserById(id: string) {
  return users.find((item) => item.id === id) ?? null;
}
