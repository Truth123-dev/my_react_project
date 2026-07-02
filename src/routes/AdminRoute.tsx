import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function AdminRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
