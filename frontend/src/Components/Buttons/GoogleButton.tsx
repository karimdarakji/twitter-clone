import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { Button, styled } from '@mui/material';

interface IGoogleButton {
    variant?: string,
    prompt: string,
    href: string
}

const GoogleButton = ({ variant = "primary", prompt, href }: IGoogleButton) => {
    const CButton = styled(Button)(`
    font-weight: bold;
    width: 18rem;
    padding: 10px;
    border-radius: 30px;
    background-color: ${
      variant ? "transparent" : "rgb(29, 155, 240)"
    } !important;
    color: ${variant ? "rgb(29, 155, 240)" : "white"};
    border: ${variant && "1px solid rgb(207, 217, 222)"};
    `);
  return (
    <a href={href} style={{ marginBottom: "1rem" }}>
        <CButton variant="outlined" startIcon={<GoogleIcon />}>
            {prompt} with Google
        </CButton>
    </a>
  )
}

export default GoogleButton