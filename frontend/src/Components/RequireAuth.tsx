import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { auth }: any = useAuth();
  const location = useLocation();

  return !auth?.accessToken ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
