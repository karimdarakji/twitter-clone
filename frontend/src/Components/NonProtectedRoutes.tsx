import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NonProtectedRoutes = () => {
  const { auth }: any = useAuth();
  return !auth?.accessToken ? <Navigate to="/home" replace /> : <Outlet />;
};

export default NonProtectedRoutes;
