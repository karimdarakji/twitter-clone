import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoPersonOutline, IoLogoTwitter } from "react-icons/io5";
import {
  RiHome7Fill,
  RiHome7Line,
  RiHashtag,
  RiUser3Line,
} from "react-icons/ri";
import { GiFeather } from "react-icons/gi";

import styles from "../../Styles/Components/Sidebar.module.scss";

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const location = useLocation();

  // const userInfo = getLocalStorage("ui");

  return (
    <div className={styles.slide}>
      <div className={styles.slide__content}>
        <IoLogoTwitter
          className={styles.slideimage}
          style={{ color: "#00A2F5" }}
          onClick={() => navigate("/home")}
        />
        {location.pathname.includes("home") ? (
          <RiHome7Fill className={styles.slideimage} />
        ) : (
          <RiHome7Line
            className={styles.slideimage}
            onClick={() => navigate("/home")}
          />
        )}
        <RiHashtag className={styles.slideimage} />
        <div
          className={styles.slideimage}
          onClick={() => navigate(`/profile/`)}
        >
          {location.pathname.includes("profile") ? (
            <RiUser3Line className={styles.slideimage} />
          ) : (
            <IoPersonOutline className={styles.slideimage} />
          )}
        </div>
        <div className={styles.tweetIcon}>
          <GiFeather className={styles.feather} />
        </div>
        <div className="profile-icon slideimage">
          <img
            className="profile-image"
            src={
              `http://localhost:5000/` //+ userInfo.picture
            }
            alt="account"
          />
        </div>
      </div>
      {children}
    </div>
  );
};
