import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user } = useAuth();
  
  // Check if user is logged in and has admin role
  const isAdmin = user?.user_metadata?.role === 'admin';

  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}; 