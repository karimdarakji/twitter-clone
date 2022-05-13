import { lazy, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import axios from "axios";

import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header";

import { getLocalStorage } from "./decryptLocalStorage";

import { Logout } from "./Pages/Logout/Logout";
import { IAuth } from "./global";
import RequireAuth from "./Components/RequireAuth";

import Welcome from "./Pages/ViewWelcome";
import Login from "./Pages/ViewLogin";
import ViewAccountActivation from "./Pages/ViewAccountActivation";

//const Welcome = lazy(() => import("./Pages/ViewWelcome"));
//const Login = lazy(() => import("./Pages/ViewLogin"));
const Home = lazy(() => import("./Pages/ViewHome"));
const Profile = lazy(() => import("./Pages/ViewProfile"));
const TweetPage = lazy(() => import("./Pages/Tweet"));

export default function App() {
  const userInfo = getLocalStorage("ui");

  const verifyUser = useCallback(() => {
    axios
      .post("http://localhost:5000/register/refreshToken", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("ui", response.data.data);
        }
        // call refreshToken every 5 minutes to renew the authentication token.
        setTimeout(verifyUser, 5 * 60 * 1000);
      })
      .catch((error) => {
        if (error) {
          localStorage.clear();
          if (userInfo) window.location.reload();
        }
      });
  }, [userInfo]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // const Auth = ({
  //   component: Component,
  //   path,
  //   header,
  //   headerTitle,
  //   back,
  // }: IAuth) => {
  //   return (
  //     <Route
  //       path={path}
  //       render={(props) =>
  //         userInfo ? (
  //           <>
  //             <div className="d-flex">
  //               <Sidebar {...props} />
  //               <div className="w-50">
  //                 {header !== false && (
  //                   <Header
  //                     headerTitle={headerTitle}
  //                     back={back}
  //                     history={history}
  //                   />
  //                 )}
  //                 <Component {...props} />
  //               </div>
  //               <div style={{ width: "41%", borderLeft: "1px solid #eff3f4" }}>
  //                 <Logout {...props} />
  //               </div>
  //             </div>
  //           </>
  //         ) : (
  //           <Redirect to="/welcome" />
  //         )
  //       }
  //     />
  //   );
  // };

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<ViewAccountActivation />} />

        <Route path="/" element={<Navigate replace to="/welcome" />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
