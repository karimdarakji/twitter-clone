import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({
  children,
  userInfo,
}: {
  children: JSX.Element;
  userInfo?: object;
}) => {
  let location = useLocation();

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
