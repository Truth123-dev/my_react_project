export interface User {
  id: string;
  email: string;
  token: string;
  role?: "admin" | "user";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}
