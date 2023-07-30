import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoLogoTwitter } from "react-icons/io5";
import {
  RiHome7Fill,
  RiHome7Line,
  RiUser3Line,
  RiSearchLine,
  RiNotificationLine,
  RiMailLine,
  RiFileListLine,
  RiBookmarkLine,
  RiGroupLine,
  RiCheckboxCircleLine,
  RiMoreFill,
  RiUser3Fill,
  RiGroupFill,
  RiBookmarkFill,
  RiFileListFill,
  RiMailFill,
  RiNotificationFill,
  RiSearchFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";

import styles from "./Sidebar.module.scss";
import { Box, IconButton, Grid, Typography } from "@mui/material";
import CustomButton from "../CustomButton";
import { useUserQuery } from "../../redux/user";
import SidebarSkeleton from "./SidebarSkeleton";
import SidebarAccount from "./SidebarAccount";

const SidebarOptions = [
  { name: "Home", icon: RiHome7Fill, iconLine: RiHome7Line, route: "/" },
  {
    name: "Explore",
    icon: RiSearchFill,
    iconLine: RiSearchLine,
    route: "/explore",
  },
  {
    name: "Notifications",
    icon: RiNotificationFill,
    iconLine: RiNotificationLine,
    route: "/notifications",
  },
  {
    name: "Messages",
    icon: RiMailFill,
    iconLine: RiMailLine,
    route: "/messages",
  },
  {
    name: "Lists",
    icon: RiFileListFill,
    iconLine: RiFileListLine,
    route: "/lists",
  },
  {
    name: "Bookmarks",
    icon: RiBookmarkFill,
    iconLine: RiBookmarkLine,
    route: "/bookmarks",
  },
  {
    name: "Communities",
    icon: RiGroupFill,
    iconLine: RiGroupLine,
    route: "/communities",
  },
  {
    name: "Verified",
    icon: RiCheckboxCircleFill,
    iconLine: RiCheckboxCircleLine,
    route: "/verified",
  },
  {
    name: "Profile",
    icon: RiUser3Fill,
    iconLine: RiUser3Line,
    route: "/profile",
  },
  { name: "More", icon: RiMoreFill, iconLine: "", route: "/more" },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { data: user, isLoading, isError } = useUserQuery();

  if (isLoading || !user || isError) {
    return <SidebarSkeleton />;
  }

  return (
    <Box className={styles.slide}>
      <Box className={styles.content}>
        <IconButton
          style={{ width: "3.5rem" }}
          size="large"
          onClick={() => navigate("/")}
        >
          <IoLogoTwitter style={{ color: "#00A2F5" }} />
        </IconButton>
        {SidebarOptions.map((option, index) => (
          <IconButton
            key={option.route}
            className={styles.icon}
            size="large"
            onClick={() => navigate(option.route)}
          >
            <Grid display={"flex"} alignItems={"center"}>
              {location.pathname === option.route ||
              index === SidebarOptions.length - 1
                ? React.createElement(option.icon, { className: styles.icon })
                : React.createElement(option.iconLine, {
                    className: styles.icon,
                  })}
              <Typography
                variant="h5"
                fontWeight={
                  location.pathname === option.route ? "bold" : "normal"
                }
              >
                {option.name}
              </Typography>
            </Grid>
          </IconButton>
        ))}

        <CustomButton width="100%">Tweet</CustomButton>
        <SidebarAccount user={user} />
      </Box>
    </Box>
  );
};
