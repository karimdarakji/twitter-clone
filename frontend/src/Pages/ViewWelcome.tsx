import { useState } from "react";

import SignupModal from "../Components/SignupModal/SignupModal";

import welcome from "../public/welcome.png";
import logo from "../public/logo.png";
import { Grid } from "@mui/material";
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  //bottom links
  const bottomLinks = [
    "About",
    "Help Center",
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Ads info",
    "Blog",
    "Status",
    "Careers",
    "Brand Resources",
    "Advertising",
    "Marketing",
    "Twitter for Business",
    "Developers",
    "Directory",
    "Settings",
    "@ 2022 Twitter, Inc.",
  ];

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

          <Grid item mt={5} direction="column" style={{ display: "flex" }}>
            <CustomButton onClick={() => setShowModal(true)}>
              Sign up
            </CustomButton>
            <CustomButton
              sx={{ marginTop: 4 }}
              variant={"outlined"}
              onClick={() => navigate("/login")}
            >
              Sign in
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        className="footer_info text-center"
        style={{ color: "grey" }}
        my={2}
      >
        {bottomLinks.map((item, index) => (
          <span
            key={`link${index}`}
            style={{
              margin: "0px 10px 10px 10px",
              cursor: `${index !== bottomLinks.length - 1 && "pointer"}`,
            }}
          >
            {item}
          </span>
        ))}
      </Grid>

      <SignupModal show={showModal} onHide={() => setShowModal(!showModal)} />
    </>
  );
}
