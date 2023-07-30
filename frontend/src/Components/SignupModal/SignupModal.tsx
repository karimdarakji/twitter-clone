import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";

import { years, days, months } from "../../Services/getDates";

import SecondSignup from "../SecondStepSignupModal/SecondSignup";

import logo from "../../public/logo.png";

import CustomButton from "../CustomButton";
import { signupSchema } from "../../Yup/Schemas";
import { useFirstSignUpMutation } from "../../redux/auth";
import moment from "moment";
import CustomAlert from "../Alert";

interface ISignUpModal {
  show: boolean;
  onHide: () => void;
}

const SignupModal = ({ show, onHide }: ISignUpModal) => {
  const [addUser, { data, error }] = useFirstSignUpMutation();
  // second sign up modal
  const [showModal, setShowModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      month: "",
      day: "",
      year: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => add_user(values),
  });

  useEffect(() => {
    if (data) {
      formik.resetForm();
      onHide();
      !data?.code && setShowModal(true);
    }
  }, [data]);

  // add user function
  const add_user = async (values: any) => {
    const copyValues = {
      ...values,
      birthDate: `${values.year}-${moment().month(values.month).format("MM")}-${
        values.day
      }`,
    };
    delete copyValues.year;
    delete copyValues.month;
    delete copyValues.day;

    await addUser(copyValues);
  };


  // Mui select dropdown style
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 130,
      },
    },
  };

  return (
    <>
      {error?.data && <CustomAlert severity="error">{error?.data}</CustomAlert>}
      {data?.code && (
        <CustomAlert severity="success">{data?.message}</CustomAlert>
      )}
      <Dialog
        open={show}
        onBackdropClick={() => {
          onHide();
          formik.resetForm();
        }}
        PaperProps={{ style: { overflowX: "hidden" } }}
      >
        <DialogTitle className="text-center w-100">
          <Grid container>
            <div
              className="ms-auto"
              style={{ cursor: "pointer" }}
              onClick={() => {
                onHide();
                formik.resetForm();
              }}
            >
              X
            </div>

            <img
              className="justify-content-center"
              src={logo}
              alt="twitter"
              style={{
                objectFit: "contain",
                margin: "0 auto",
                paddingRight: "4rem",
              }}
              width={40}
            />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <h2>Create your account</h2>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              style={{ marginBottom: "3%" }}
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              style={{ marginBottom: "3%" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.email)}
              helperText={formik.errors.email && "Email Required"}
            />

            <h2>Date of birth</h2>
            <div>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </div>
            <Grid container spacing={2} style={{ margin: "5% 0" }}>
              <Grid xs={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    name="month"
                    value={formik.values.month}
                    label="Month *"
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.month)}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Day</InputLabel>
                  <Select
                    name="day"
                    onChange={formik.handleChange}
                    value={formik.values.day}
                    label="Day *"
                    MenuProps={MenuProps}
                    error={Boolean(formik.errors.day)}
                  >
                    {days.map((day: any) => (
                      <MenuItem key={`day${day}`} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                    label="Year *"
                    MenuProps={MenuProps}
                    error={Boolean(formik.errors.year)}
                  >
                    {years()
                      .reverse()
                      .map((year: any) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className="text-center">
              <CustomButton
                type="submit"
                disabled={
                  Object.values(formik.values).every((v) => v.length === 0) ||
                  Object.keys(formik.errors).length > 0
                }
              >
                Continue
              </CustomButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <SecondSignup
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        data={data}
      />
    </>
  );
};

export default SignupModal;
