import { useEffect, useState } from "react";
import { useFormik } from "formik";
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

import logo from "../../assets/logo.png";

import { secondSignupSchema } from "../Forms/Yup/Schemas";
import CustomButton from "../CustomButton";
import CustomAlert from "../Alert";
import moment from "moment";
import { useCreateUserMutation } from "../../redux/auth/authApi";

interface ISecondSignup {
  show: boolean;
  onHide: () => void;
  data: {
    name: string;
    email: string;
    year: string;
    month: string;
    day: string;
  };
  resetForm: () => void;
}

export default function SecondSignup({
  show,
  onHide,
  data,
  resetForm,
}: ISecondSignup) {
  const [createUser, { error, isSuccess }] = useCreateUserMutation();

  const [showPassword, setShowPassword] = useState(false);

  // formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: secondSignupSchema,
    onSubmit: (values) => addUser(values),
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      resetForm();
      onHide();
    }
  }, [isSuccess]);

  const addUser = async (values: { username: string; password: string }) => {
    const userObject = {
      name: data.name,
      username: values.username,
      email: data.email,
      password: values.password,
      birthDate: `${data.year}-${moment().month(data.month).format("MM")}-${
        data.day
      }`,
    };

    await createUser(userObject);
  };

  return (
    <>
      {error?.data?.message && (
        <CustomAlert id={`error-${Date.now()}`} severity="error">
          {error.data.message}
        </CustomAlert>
      )}
      {isSuccess && (
        <CustomAlert severity="success">
          An Email has been sent for verification, please check your inbox or
          spam folder!
        </CustomAlert>
      )}
      <Dialog
        fullWidth
        open={show}
        onClose={() => {
          onHide();
          formik.resetForm();
        }}
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
              error={Boolean(formik.errors.password)}
              helperText={
                !formik.values.password
                  ? "Password is required"
                  : formik.errors.password &&
                    "Password must contain at least: one lowercase letter, one uppercase letter, one number and one special character"
              }
            />
            <div className="text-center">
              <CustomButton
                type="submit"
                disabled={
                  Object.values(formik.values).every((v) => v.length === 0) ||
                  Object.keys(formik.errors).length > 0
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
