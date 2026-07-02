import { useState, type ReactNode } from "react";
import type { User } from "../types/auth";
import { AuthContext } from "./AuthContextTypes";
import { getStored, removeStored, setStored } from "../utils/storage";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(() => getStored<User>("user"));

  const login = (userData: User) => {
    setStored("user", userData);
    setStored("auth_token", userData.token);
    setUser(userData);
  };

  const logout = () => {
    removeStored("user");
    removeStored("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
