import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

import "../Styles/login.scss";

import logo from "../public/logo.png";
import CustomButton from "../Components/CustomButton";
import { useLoginMutation } from "../redux/auth";
import Box from "@mui/material/Box/Box";
import CustomAlert from "../Components/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [loginFunction, { isLoading, error }] = useLoginMutation();

  const [loginCredentials, setLoginCredentials] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  }

  const login = async () => {
    loginFunction(loginCredentials)
      .unwrap()
      .then(() => navigate(0))
      .catch((err) => console.log(err));
  };

 
  return (
    <>
      { error?.status === 403 &&
        <CustomAlert severity="error">You need to activate your account.</CustomAlert>
      }
      <Grid className="login-contents">
        <img alt="twitter" src={logo} className="logo" />
        <h1>Log in to Twitter</h1>
        <Grid item mt={5}>
          <TextField
            name="usernameOrEmail"
            className="input-form "
            sx={{ marginBottom: 3 }}
            label="Email, or Username"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />

          <TextField
            name="password"
            className="input-form"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => handleChange(e)}
          />

          {error?.status === 404 && error?.data?.message && (
            <Box style={{ color: "red", marginBottom: 0 }}>
              Incorrect username or password
            </Box>
          )}
          <CustomButton
            onClick={login}
            sx={{ marginTop: 3 }}
            disabled={isLoading}
          >
            Login
          </CustomButton>

          <p className="text-center">
            <Link to="">Forgot Password?</Link> .{" "}
            <Link to="/welcome">Sign Up for Twitter</Link>
          </p>
        </Grid>
      </Grid>
    </>
  );
}
