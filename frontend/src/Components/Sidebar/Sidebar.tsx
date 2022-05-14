import React, { useContext } from "react";
import { useLocation } from "react-router";

import logo from "../../public/twitterlogo.png";
import explore from "../../public/hashtag.svg";
import feather from "../../public/feather.svg";
import {
  IoPersonOutline,
  IoPersonSharp,
  IoHomeOutline,
  IoHome,
} from "react-icons/io5";

export default function Sidebar() {
  // const { history } = props;

  // const location = useLocation();

  // const userInfo = getLocalStorage("ui");

  return (
    <div className="slide">
      {/* <div className="slide-content h-100">
        <img
          className="slideimage slidepng"
          src={logo}
          alt="home"
          onClick={() => history.push("/home")}
        />
        {location.pathname.includes("home") ? (
          <IoHome
            className="slideimage slidesvg"
            style={{ width: "27px", height: "27px" }}
            alt="home"
          />
        ) : (
          <IoHomeOutline
            className="slideimage slidesvg"
            style={{ width: "27px", height: "27px" }}
            alt="home"
            onClick={() => history.push("/home")}
          />
        )}
        <img className="slideimage slidesvg" src={explore} alt="explore" />
        <div
          className="slideimage mb-0"
          onClick={() => history.push(`/profile/${userInfo.username}`)}
        >
          {location.pathname.includes("profile") ? (
            <IoPersonSharp
              className="slideimage slidesvg"
              style={{ width: "27px", height: "27px" }}
              alt="profile"
            />
          ) : (
            <IoPersonOutline
              className="slideimage slidesvg"
              style={{ width: "27px", height: "27px" }}
              alt="profile"
            />
          )}
        </div>
        <div className="tweet-icon slideimage">
          <img src={feather} alt="tweet" />
        </div>
        <div className="profile-icon slideimage">
          <img
            className="profile-image"
            src={`http://localhost:5000/` + userInfo.picture}
            alt="account"
          />
        </div>
      </div> */}
    </div>
  );
}
