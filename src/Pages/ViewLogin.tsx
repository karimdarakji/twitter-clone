import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
//import { loginUser } from "../redux/auth/actions";

import "../Styles/login.scss";

import logo from "../public/logo.png";
import CustomButton from "../Components/CustomButton";
import { useAppDispatch } from "../redux/hooks";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const login = () => dispatch(loginUser({ email, password }));

  const result = useSelector((state: any) => state.auth);

  return (
    <Grid className="login-contents">
      <img alt="twitter" src={logo} className="logo" />
      <h1>Log in to Twitter</h1>
      <Grid item mt={5}>
        <TextField
          className="input-form "
          sx={{ marginBottom: 3 }}
          label="Email, or Username"
          variant="outlined"
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          className="input-form"
          label="Password"
          variant="outlined"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        {result?.message && result.message !== "success" && (
          <p style={{ color: "red", marginBottom: 0 }}>
            Incorrect username or password
          </p>
        )}
        {/* <CustomButton onClick={login} sx={{ marginTop: 3 }}>
          Login
        </CustomButton> */}

        <p className="text-center">
          <Link to="">Forgot Password?</Link> .{" "}
          <Link to="/welcome">Sign Up for Twitter</Link>
        </p>
      </Grid>
    </Grid>
  );
}
