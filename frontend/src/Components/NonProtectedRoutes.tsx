import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NonProtectedRoutes = () => {
  const { accessToken } = useAuth();
  if(accessToken) {
    return <Navigate to="/home" replace />
  }
  return <Outlet />
};

export default NonProtectedRoutes;
