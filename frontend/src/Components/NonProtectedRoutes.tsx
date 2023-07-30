import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NonProtectedRoutes = () => {
  const { auth }: any = useAuth();
  console.log(auth);
  if(auth.accessToken) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
};

export default NonProtectedRoutes;
