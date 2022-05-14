import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import logo from "../../public/logo.png";

import "../../Styles/SignupModal.scss";
import { secondSignupSchema } from "../../Yup/Schemas";
import CustomButton from "../CustomButton";
import { useSecondSignUpMutation } from "../../redux/auth";
import CustomAlert from "../Alert";
import { validatePassword } from "../../Services/password-validator";

interface ISecondSignup {
  show: boolean;
  onHide: () => void;
  data: any;
}

export default function SecondSignup({ show, onHide, data }: ISecondSignup) {
  const [secondRegister, { data: secondRegisterData, error, isSuccess }] =
    useSecondSignUpMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: secondSignupSchema,
    onSubmit: (values) => add_user(values),
  });

  useEffect(() => {
    if (secondRegisterData) {
      onHide();
    }
  }, [secondRegisterData]);

  const add_user = async (values: any) => {
    const userObject = {
      username: values.username,
      email: data.email,
      password: values.password,
    };

    await secondRegister(userObject);
    //axios
    // .post("http://localhost:5000/register/update", userObject)
    //  .then((res) => {
    //if(res.data.errors && res.data.errors.username === "User Name already exists")
    //setErrors({username: "Username already exists"})
    //else if(res.data === '"password" length must be at least 6 characters long')
    //setErrors({password: "Password must be more than 6 characters"})
    //else {
    //    onHide()
    //    navigate('/login')
    // }
    //  })
    //  .catch((error: any) => {
    //   console.log(error);
    // });
  };

  return (
    <>
      {error?.data && <CustomAlert severity="error">{error?.data}</CustomAlert>}
      {isSuccess && (
        <CustomAlert
          severity="success"
          action={
            <Link className="alert__success--link" to={"/login"}>
              Login
            </Link>
          }
        >
          An Email has been sent for verification, please check your inbox or
          spam folder!
        </CustomAlert>
      )}
      <Dialog
        fullWidth
        open={show}
        PaperProps={{ style: { overflowX: "hidden" } }}
      >
        <DialogTitle className="text-center">
          <img
            className="justify-content-center"
            src={logo}
            alt="twitter"
            style={{
              objectFit: "contain",
              margin: "0 auto",
            }}
            width={40}
          />
        </DialogTitle>
        <DialogContent>
          <h4 className="fw-bold">Create your account</h4>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              style={{ marginBottom: "3%" }}
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.username)}
              helperText={formik.errors.username}
            />
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
              error={
                Boolean(formik.errors.password) ||
                validatePassword(formik.values.password)
              }
              helperText={
                (formik.errors.password && "Password is required") ||
                (validatePassword(formik.values.password) &&
                  "Password must contain at least: one lowercase letter, one uppercase letter, one number and one special character")
              }
            />
            <div className="text-center">
              <CustomButton
                type="submit"
                disabled={
                  Object.values(formik.values).every((v) => v.length === 0) ||
                  Object.keys(formik.errors).length > 0 ||
                  validatePassword(formik.values.password)
                }
              >
                Sign up
              </CustomButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
