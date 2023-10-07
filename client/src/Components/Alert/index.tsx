import React, { useState, useEffect } from 'react';
import { Alert, AlertColor, AlertTitle } from "@mui/material";

interface ICustomAlert {
  severity?: AlertColor;
  children?: any;
  action?: any;
  key?: any;  // Add key prop here
}

const CustomAlert = ({ severity, children, action, key }: ICustomAlert) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);  // Clear timer when component is unmounted or if key changes
  }, [key]);  // Effect dependency on key

  if (!visible) return null;

  return (
    <Alert
      severity={severity}
      action={action}
      style={{
        position: "fixed",
        top: 15,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: 400,
        width: "100%",
        zIndex: 1301,
      }}
    >
      <AlertTitle style={{ textTransform: "capitalize" }}>
        {severity}
      </AlertTitle>
      {children}
    </Alert>
  );
};

export default CustomAlert;
