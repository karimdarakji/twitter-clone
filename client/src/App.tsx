import { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import NonProtectedRoutes from "./components/NonProtectedRoutes";
import { UserActivation, Home, Profile, Welcome } from "./pages";
import TweetPage from "./pages/Tweet";
import SidebarLayout from "./components/Layouts/SidebarLayout";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { accessToken } = useAuth();
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin />}>
          {accessToken && (
            <Route element={<SidebarLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/:username/tweet/:id" element={<TweetPage />} />
            </Route>
          )}
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
