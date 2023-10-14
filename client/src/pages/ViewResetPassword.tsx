import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/auth/authApi";
import { replace, useFormik } from "formik";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { passwordSchema } from "../components/Forms/Yup/Schemas";
import logo from "../assets/logo.png";
import CustomAlert from "../components/Alert";
import CustomButton from "../components/CustomButton";
import * as yup from "yup";

const ViewResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // get token from params
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const token = params.get("token");

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: yup.object().shape({
      password: passwordSchema,
    }),
    onSubmit: async (data) =>
      await resetPassword({ token: token as string, password: data.password }),
  });

  const [resetPassword, { error, isSuccess }] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/", {
        state: {
          resetPassword: true,
        },
        replace: true,
      });
    }
  }, [isSuccess]);

  if (!token) {
    navigate("/", {
      replace: true,
    });
  }

  return (
    <>
      {error?.data?.message && (
        <CustomAlert id={`error-${Date.now()}`} severity="error">
          {error.data.message}
        </CustomAlert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          display={"block"}
          md={6}
          margin={"auto"}
          paddingY={"5rem"}
        >
          <Grid textAlign={"center"}>
            <img
              className="justify-content-center"
              src={logo}
              alt="twitter"
              style={{
                objectFit: "contain",
                margin: "0 auto",
                paddingRight: "4rem",
              }}
              width={70}
            />
          </Grid>
          <br />
          <Grid>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id="password"
              style={{ marginBottom: "7%" }}
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.password)}
              helperText={
                !formik.values.password
                  ? "Password is required"
                  : formik.errors.password &&
                    "Password must contain at least: one lowercase letter, one uppercase letter, one number and one special character"
              }
            />
          </Grid>
          <Grid textAlign={"center"}>
            <CustomButton
              type="submit"
              disabled={
                Object.values(formik.values).every((v) => v.length === 0) ||
                Object.keys(formik.errors).length > 0
              }
            >
              Reset Password
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ViewResetPassword;
