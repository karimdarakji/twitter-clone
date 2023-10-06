import { Button, Dialog, DialogContent, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import ModalHeader from './HeaderModal'
import GoogleButton from '../Buttons/GoogleButton'
import CustomButton from '../CustomButton'

const LoginModal = ({ open = false, setModal }: { open: boolean, setModal: (modals: any) => void }) => {
  return (
    <Dialog open={open} onClose={setModal}>
        <ModalHeader />
        <DialogContent sx={{ width: "32rem", margin: "0 auto", padding: "20px 10rem"}}>
          <Typography fontWeight={"bold"} variant='h5'>Sign in to Twitter</Typography>
          <br />
          <GoogleButton prompt="Sign in" state="signin" />
          <br />
          <br />
          <Divider sx={{ width: "18rem"}}>or</Divider>
          <br />
          <TextField placeholder='Enter your email' sx={{ width: "18rem" }} />
          <br />
          <br />
          <CustomButton>Next</CustomButton>
          <br />
          <br />
          <CustomButton variant='outlined'>Forgot password?</CustomButton>
          <br />
          <br />
          <Typography>Don't have an account? <Button variant='text' onClick={() => setModal({signup: true, login: false})}>Sign up</Button></Typography>
        </DialogContent>
    </Dialog>
  )
}

export default LoginModal