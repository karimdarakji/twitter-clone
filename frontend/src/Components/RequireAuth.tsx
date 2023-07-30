import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Sidebar } from "./Sidebar/Sidebar";
import Container from "@mui/material/Container/Container";

const RequireAuth = () => {
  const { auth }: any = useAuth();
  const location = useLocation();

  return !auth?.accessToken ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Container sx={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </Container>
  );
};

export default RequireAuth;
