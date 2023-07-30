import { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import NonProtectedRoutes from "./Components/NonProtectedRoutes";
import { AccountActivation, Login, MainPage, Profile } from "./Pages";
import TweetPage from "./Pages/Tweet";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<NonProtectedRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/activate" element={<AccountActivation />} />
          </Route>
          <Route path="/" element={<RequireAuth />}>
            <Route path="/:username" element={<Profile />} />
            <Route path="/:username/tweet/:id" element={<TweetPage />} />
            <Route path="/" element={<MainPage />} />
          </Route>
        </Route>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
