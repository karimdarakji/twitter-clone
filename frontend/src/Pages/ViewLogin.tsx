import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

import "../Styles/login.scss";

import logo from "../public/logo.png";
import CustomButton from "../Components/CustomButton";
import { useLoginMutation } from "../redux/auth";

export default function Login() {
  const navigate = useNavigate();
  const [loginFunction, { data, isLoading, error }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await loginFunction({ username, password });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/home", { replace: true });
    }
  }, [data]);
  console.log(data);

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
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          className="input-form"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error?.message && (
          <p style={{ color: "red", marginBottom: 0 }}>
            Incorrect username or password
          </p>
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
  );
}
