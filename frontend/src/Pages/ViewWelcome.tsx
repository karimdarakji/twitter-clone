import { useState } from "react";

import SignupModal from "../Components/SignupModal/SignupModal";

import welcome from "../public/welcome.png";
import logo from "../public/logo.png";
import { Button, Divider, Grid, Typography } from "@mui/material";
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../Components/Buttons/GoogleButton";

export default function Welcome() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const googleAuthUrl = (state: string) => `
  https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_API_URL}google/oauth2callback&response_type=code&include_granted_scopes=true&state=${state}&scope=https://www.googleapis.com/auth/userinfo.email
`;

  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <img
            src={welcome}
            alt="welcome"
            className="w-100"
            style={{
              objectFit: "cover",
              height: "95vh",
            }}
          />
        </Grid>
        <Grid
          item
          md={6}
          p={5}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
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
            <GoogleButton prompt="Sign in" href={googleAuthUrl("signin")} />
            <Divider sx={{ width: "18rem"}}>or</Divider>
            <br />
            <CustomButton onClick={() => setShowModal(true)}>
              Create account
            </CustomButton>
            <br />
            <br />
            <Typography fontWeight={"bold"}>Already have an Account?</Typography>
            <br />
            <CustomButton
              variant={"outlined"}
              onClick={() => navigate("/login")}
            >
              Sign in
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
      <SignupModal show={showModal} onHide={() => setShowModal(!showModal)} />
    </>
  );
}
