import { Alert, AlertColor, AlertTitle } from "@mui/material";

interface ICustomAlert {
  severity?: AlertColor;
  children?: any;
  action?: any;
}

const CustomAlert = ({ severity, children, action }: ICustomAlert) => {
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
