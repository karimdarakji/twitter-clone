import React from "react";
import {
  Menu,
  MenuItem,
  Stack,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { RiMoreFill } from "react-icons/ri";
import { useLogoutMutation } from "../../redux/auth/authApi";
import CustomAlert from "../Alert";
import { useNavigate } from "react-router-dom";

const SidebarAccount = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logoutFunction, { error }] = useLogoutMutation();

  if (error) {
    <CustomAlert severity="error">
      Something went wrong, Please try again!
    </CustomAlert>;
  }

  const logout = async () => {
    logoutFunction()
      .unwrap()
      .then(() => navigate(0));
  };

  return (
    <>
      <IconButton
        size="large"
        onClick={handleClick}
        sx={{ mt: "auto" }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Stack
          display={"flex"}
          direction={"row"}
          alignItems={"center"}
          width={"100%"}
          spacing={1}
        >
          <Avatar
            alt={user?.name}
            src={!!user?.image ? user.image : "/defaultProfile.png"}
          />

          <Stack display={"flex"} direction={"column"}>
            <Typography fontWeight={"bold"}>{user?.name}</Typography>
            <Typography>@{user?.username}</Typography>
          </Stack>
          <Stack style={{ marginLeft: "auto" }}>
            <RiMoreFill />
          </Stack>
        </Stack>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: -8,
            width: "18rem",
            borderRadius: "1rem",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "& .MuiMenuItem-root": {
              my: 1,
              fontWeight: "bold",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: "7rem",
              right: "45%",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
      >
        <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
        <MenuItem onClick={() => logout()}>Log out @{user?.username}</MenuItem>
      </Menu>
    </>
  );
};

export default SidebarAccount;
