import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./AuthContextTypes";

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
