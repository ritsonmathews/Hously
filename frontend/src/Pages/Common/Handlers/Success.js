import { Alert, Snackbar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

const Success = (props) => {
  const { msg, state } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleClick()
    return () => {
      setOpen(false);
    };
  }, []);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#003300", color: "white" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Success;
