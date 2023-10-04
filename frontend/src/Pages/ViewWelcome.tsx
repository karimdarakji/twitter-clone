import { useState } from "react";

import SignupModal from "../Components/Modals/SignupModal/SignupModal";

import welcome from "../public/welcome.png";
import logo from "../public/logo.png";
import { Divider, Grid, Typography } from "@mui/material";
import CustomButton from "../Components/CustomButton";
import GoogleButton from "../Components/Buttons/GoogleButton";
import LoginModal from "../Components/Modals/LoginModal";

export default function Welcome() {
  const [modals, setModals] = useState({
    login: false,
    signup: false
  })

  return (
    <>
      <Grid container>
        <Grid item md={6} sx={{ backgroundImage: `url(${welcome})`, backgroundRepeat: "no-repeat", height: "100vh", backgroundSize: "cover" }} />
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
            <Divider sx={{ width: "18rem"}}>or</Divider>
            <br />
            <CustomButton onClick={() => setModals((modal) => ({...modal, signup: true}))}>
              Create account
            </CustomButton>
            <br />
            <br />
            <Typography fontWeight={"bold"}>Already have an Account?</Typography>
            <br />
            <CustomButton
              variant={"outlined"}
              onClick={() => setModals((modal) => ({...modal, login: true}))}
            >
              Sign in
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
      <LoginModal open={modals.login} setModal={setModals} />
      <SignupModal show={modals.signup} onHide={() => setModals((modal) => ({...modal, signup: false}))} />
    </>
  );
}
