import type { LoginData, RegisterData, User } from "../types/auth";
import { loginRequest, registerRequest } from "../api/authApi";

export async function login(data: LoginData): Promise<User> {
  return loginRequest(data);
}

export async function register(data: RegisterData): Promise<User> {
  return registerRequest(data);
}
