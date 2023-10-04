import { useCallback, useState } from "react";

import {
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  debounce,
} from "@mui/material";

import { useFormik } from "formik";

import { years, days, months } from "../../../Services/getDates";

import SecondSignup from "../SecondStepSignupModal/SecondSignup";

import CustomButton from "../../CustomButton";
import { signupSchema } from "../../../Yup/Schemas";
import ModalHeader from "../ModalHeader";
import GoogleButton from "../../Buttons/GoogleButton";
import { useGetUserEmailMutation } from "../../../redux/auth";

interface ISignUpModal {
  show: boolean;
  onHide: () => void
}

const SignupModal = ({ show, onHide }: ISignUpModal) => {
  const [getUserEmail, { error }] = useGetUserEmailMutation();
  console.log(error)
  const [models, setModels] = useState({
    oauth: true,
    create: false,
    additionalCreate: false
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      month: "",
      day: "",
      year: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => setModels((model) => ({...model, create: false, additionalCreate: true})),
  });

  // Debounce the mutation call
  const debouncedUpdate = useCallback(
    debounce((data) => {
      getUserEmail(data);
    }, 500),
    [getUserEmail]
  );

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
      <Dialog
        open={show}
        onClose={() => {
          onHide();
          setModels({oauth: true, create: false, additionalCreate: false});
          formik.resetForm()
        }
        }
        PaperProps={{ style: { overflowX: "hidden" } }}
      >
        <ModalHeader />
        <DialogContent>
          <h2>Create your account</h2>

          {
            models.oauth && <>
            <GoogleButton prompt="Sign up" state="signin" />
            <br />
            <br />
            <Divider sx={{ width: "18rem"}}>or</Divider>
            <br />
            <CustomButton onClick={() => setModels((model) => ({...model, oauth: false, create: true}))}>Create account</CustomButton>
            </>
          }
          {
            models.create &&
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
                onChange={(e) => {
                  formik.handleChange(e);
                  debouncedUpdate(e.target.value);
                }}
                error={Boolean(formik.errors.email) || !!error?.data}
                helperText={formik.errors.email ? "Email Required" : error?.data}
              />

              <h2>Date of birth</h2>
              <div>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </div>
              <Grid container spacing={2} style={{ margin: "5% 0" }}>
                <Grid item xs={4}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Month</InputLabel>
                    <Select
                      name="month"
                      value={formik.values.month}
                      label="Month *"
                      onChange={formik.handleChange}
                      MenuProps={MenuProps}
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                    Object.keys(formik.errors).length > 0 ||
                    error?.data
                  }
                >
                  Continue
                </CustomButton>
              </div>
            </form>
          }
        </DialogContent>
      </Dialog>
      <SecondSignup
        show={models.additionalCreate}
        onHide={() => {
          onHide();
          setModels((model) => ({...model, additionalCreate: false, oauth: true}));
        }}
        data={formik.values}
      />
    </>
  );
};

export default SignupModal;
