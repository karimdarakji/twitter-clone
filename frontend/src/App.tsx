import { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { Logout } from "./Pages/Logout/Logout";
import { IAuth } from "./global";
import RequireAuth from "./Components/RequireAuth";

import Welcome from "./Pages/ViewWelcome";
import Login from "./Pages/ViewLogin";
import ViewAccountActivation from "./Pages/ViewAccountActivation";
import PersistLogin from "./Components/PersistLogin";

const Home = lazy(() => import("./Pages/ViewHome"));
const Profile = lazy(() => import("./Pages/ViewProfile"));
const TweetPage = lazy(() => import("./Pages/Tweet"));

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<ViewAccountActivation />} />

        <Route path="/" element={<Navigate replace to="/welcome" />} />
        <Route element={<PersistLogin />}>
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/:username/tweet/:id"
            element={
              <RequireAuth>
                <TweetPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
