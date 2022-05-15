import { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";

import { AccountActivation, Login, Welcome, Home, Profile } from "./Pages";
import NonProtectedRoutes from "./Components/NonProtectedRoutes";

const TweetPage = lazy(() => import("./Pages/Tweet"));

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NonProtectedRoutes />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate" element={<AccountActivation />} />
          <Route path="/" element={<Navigate replace to="/welcome" />} />
        </Route>

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
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
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
