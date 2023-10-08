import { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PersistLogin from "./Components/PersistLogin";
import NonProtectedRoutes from "./Components/NonProtectedRoutes";
import { UserActivation, Home, Profile, Welcome } from "./Pages";
import TweetPage from "./Pages/Tweet";
import SidebarLayout from "./Components/Layouts/SidebarLayout";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { accessToken } = useAuth();
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin />}>
          {
            accessToken && (
            <Route element={<SidebarLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/:username/tweet/:id" element={<TweetPage />} />
            </Route>
            )
          }
          <Route element={<NonProtectedRoutes />}>
            <Route path="/activate" element={<UserActivation />} />
            <Route path="/" element={<Welcome />} />
          </Route>
              
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
