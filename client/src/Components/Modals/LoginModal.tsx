import { Button, Dialog, DialogContent, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ModalHeader from './HeaderModal'
import GoogleButton from '../Buttons/GoogleButton'
import CustomButton from '../CustomButton'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useLoginMutation } from '../../redux/auth'
import { useNavigate } from 'react-router-dom'
import CustomAlert from '../Alert'

interface ILoginModal {
  open: boolean,
  onHide: () => void,
  showSignup: () => void,
}


const LoginModal = ({ open = false, onHide, showSignup }: ILoginModal) => {
  const navigate = useNavigate();
  const [loginMutation, { error }] = useLoginMutation();
  const [LoginModal, setLoginModal] = useState({
    oauth: true,
    auth: false
  });
  const formik = useFormik({
    initialValues: {
      emailorUsername: '',
      password: ''
    },
    validationSchema: Yup.object({
      emailorUsername: Yup.string().email('Invalid email address').required('Required'),
      ...(LoginModal.auth ? { password: Yup.string().required('Required') } : {})
    }),
    onSubmit: (values) => {
      loginMutation(values).unwrap().then(() => navigate(0));
    }
  });

  return (
    <>
      {error?.data?.message && <CustomAlert id={`error-${Date.now()}`} severity="error">{error.data.message}</CustomAlert>}
      <Dialog open={open} onClose={() => {
        formik.resetForm();
        setLoginModal({ oauth: true, auth: false });
        onHide();
      }}>
          <ModalHeader />
          <DialogContent sx={{ width: "32rem", margin: "0 auto", padding: "20px 10rem"}}>
            <form onSubmit={formik.handleSubmit}>
              {
                LoginModal.auth &&
                <>
                <Typography fontWeight={"bold"} variant='h5'>Enter your password</Typography>
                <br />
                <TextField 
                  label="Email or Username"
                  value={formik.values.emailorUsername}
                  disabled={true}
                  sx={{ width: "18rem" }}
                />
                <br />
                <br />
                <TextField 
                  type='password'
                  variant="outlined"
                  name="password"
                  label="Password"
                  placeholder='Enter your password' 
                  sx={{ width: "18rem" }} 
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.password)}
                  helperText={formik.errors.password}
                />
                <br />
                <br />
                <CustomButton 
                  type="submit"
                  disabled={!formik.values.password || !!formik.errors.password}
                >
                  Sign in
                </CustomButton>
                </>
              }
              {
                LoginModal.oauth &&
                <>
                  <Typography fontWeight={"bold"} variant='h5'>Sign in to Twitter</Typography>
                  <br />
                  <GoogleButton prompt="Sign in" state="signin" />
                  <br />
                  <br />
                  <Divider sx={{ width: "18rem"}}>or</Divider>
                  <br />
                  <TextField 
                    variant="outlined"
                    name="emailorUsername"
                    label="Email Address or Username"
                    placeholder='Enter your email or username' 
                    sx={{ width: "18rem" }} 
                    value={formik.values.emailorUsername}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.emailorUsername)}
                    helperText={formik.errors.emailorUsername}
                  />
                  <br />
                  <br />
                  <CustomButton 
                    onClick={() => setLoginModal({ oauth: false, auth: true })}
                    disabled={!formik.values.emailorUsername || !!formik.errors.emailorUsername}
                  >
                    Next
                  </CustomButton>
                  <br />
                  <br />
                  <CustomButton variant='outlined'>Forgot password?</CustomButton>
                  <br />
                  <br />
                  <Typography>Don't have an account? <Button variant='text' onClick={showSignup}>Sign up</Button></Typography>
                </>
              }
            </form>
          </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginModal