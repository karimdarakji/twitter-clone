import { useState } from "react";

import SignupModal from "../Components/Modals/SignupModal";

import welcome from "../public/welcome.png";
import logo from "../public/logo.png";
import { Divider, Grid, Typography } from "@mui/material";
import CustomButton from "../Components/CustomButton";
import GoogleButton from "../Components/Buttons/GoogleButton";
import LoginModal from "../Components/Modals/LoginModal";
import { useLocation } from "react-router-dom";
import CustomAlert from "../Components/Alert";

export default function Welcome() {
  const [modals, setModals] = useState({
    login: false,
    signup: false,
  });
  const location = useLocation();

  return (
    <>
      {location.state?.userActivated && (
        <CustomAlert id={`user-activated-${Date.now()}`} severity="success">
          User successfully activated, please sign in
        </CustomAlert>
      )}
      <Grid container height={"100vh"}>
        <Grid
          item
          md={6}
          sx={{
            backgroundImage: `url(${welcome})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          md={6}
          p={5}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <img
            src={logo}
            alt="twitter"
            width={57}
            height={57}
            style={{ objectFit: "contain" }}
          />

          <h1 style={{ fontSize: 70 }}>Happening now</h1>

          <h2 style={{ fontSize: "35px" }}>Join Twitter today.</h2>

          <Grid container item mt={5} direction="column" display={"flex"}>
            <GoogleButton prompt="Sign in" state="signin" />
            <Divider sx={{ width: "18rem" }}>or</Divider>
            <br />
            <CustomButton
              onClick={() => setModals((modal) => ({ ...modal, signup: true }))}
            >
              Create account
            </CustomButton>
            <br />
            <br />
            <Typography fontWeight={"bold"}>
              Already have an Account?
            </Typography>
            <br />
            <CustomButton
              variant={"outlined"}
              onClick={() => setModals((modal) => ({ ...modal, login: true }))}
            >
              Sign in
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
      <LoginModal
        open={modals.login}
        showSignup={() => setModals({ login: false, signup: true })}
        onHide={() => setModals((modal) => ({ ...modal, login: false }))}
      />
      <SignupModal
        show={modals.signup}
        onHide={() => setModals((modal) => ({ ...modal, signup: false }))}
      />
    </>
  );
}
