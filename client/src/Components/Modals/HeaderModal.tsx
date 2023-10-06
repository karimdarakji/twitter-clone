import React from 'react'
import { DialogTitle, Grid } from '@mui/material';
import logo from "../../public/logo.png";

const ModalHeader = () => {
  return (
    <DialogTitle className="text-center w-100">
      <Grid container>
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
  )
}

export default ModalHeader