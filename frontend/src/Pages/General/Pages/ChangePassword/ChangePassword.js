import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../../auth";
import "./ChangePassword.css";
import { updatePasswordAPI } from "./ChangePasswordAPI/ChangePassword";

const useStyles = makeStyles({
  cpTextField: {
    marginTop: "1rem",
    backgroundColor: "whitesmoke",
  },
  btn: {
    textTransform: "none",
    marginTop: "2.3rem",
    fontSize: "1rem",
    // color: "#196e1f",
    // borderColor: "#196e1f",
    // "&:hover": {
    //   color: "white",
    //   backgroundColor: "#196e1f",
    //   borderColor: "#196e1f",
    // },
  },
  cancelBtn: {
    float: "right",
    textTransform: "none",
    fontSize: "1rem",
    color: "#c73a3a",
    borderColor: "#c73a3a",
    "&:hover": {
      color: "white",
      backgroundColor: "#c73a3a",
      borderColor: "#c73a3a",
    },
  },
});

const ChangePassword = () => {
  const username = isAuthenticated().admin.username;
  const token = isAuthenticated();

  const [values, setValues] = useState({
    pcurrentPassword: "",
    pnewPassword: "",
    pconfirmPassword: "",
    error: "",
    loading: false,
    success: ""
  });

  const { pcurrentPassword, pnewPassword, pconfirmPassword, error, loading, success } = values;

  const [currentPasswordErr, setCurrentPasswordErr] = useState({});
  const [newPasswordErr, setNewPasswordErr] = useState({});
  const [confirmPasswordErr, setConfirmPasswordErr] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    });
  };

  const clickUpdate = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      setValues({
        ...values,
        loading: true
      })
      updatePasswordAPI(token, {
        username: username,
        password: pcurrentPassword,
        newPassword: pnewPassword,
      }).then((res) => {
        if (res.response) {
          console.log("ress", res.response.data.error);
          setValues({
            ...values,
            error: res.response.data.error,
          });
        } else if (res.data) {
          console.log(res);
          setValues({
            pcurrentPassword: "",
            pnewPassword: "",
            pconfirmPassword: "",
            success: "Password updated successfully",
            loading: false
          });
          handleClick()
        }
      });
    }
  };

  const showError = () => (
    <div
      style={{
        display: error ? "" : "none",
        color: "red",
        margin: "0 0 5px 0",
        textAlign: "left",
        letterSpacing: "1px",
      }}
    >
      <BiErrorCircle style={{ margin: "0 5px -2px 0" }} />
      {error}
    </div>
  );

  //Snackbar functions Starts
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //Snackbar functions Ends
  const showSuccess = () => (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#003300", color: "white" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Stack>
  );

  const formValidation = () => {
    const currentPasswordErr = {};
    const newPasswordErr = {};
    const confirmPasswordErr = {};
    let isValid = true;
    if (pcurrentPassword === "") {
      currentPasswordErr.currentPasswordRequired = "Current password is required";
      isValid = false;
    }
    if (pnewPassword === "") {
      newPasswordErr.newPasswordRequired = "Please enter new Password";
      isValid = false;
    }
    if (pconfirmPassword === "") {
      confirmPasswordErr.confirmPasswordRequired = "Please re-enter new Password";
      isValid = false;
    } else if (!(pconfirmPassword === pnewPassword)) {
      confirmPasswordErr.confirmPasswordInvalid = "Passwords do not match";
      isValid = false;
    }
    setCurrentPasswordErr(currentPasswordErr);
    setNewPasswordErr(newPasswordErr);
    setConfirmPasswordErr(confirmPasswordErr);
    return isValid;
  };

  const classes = useStyles();
  return (
    <div className="cp-main-container">
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#fffefe",
          padding: "1rem",
          borderRadius: "10px",
          marginTop: 10
        }}
      >
        <div>
          <h1 className="cp-title">
            Change Password
            <Link to="/general">
              <Button variant="outlined" className={classes.cancelBtn}>
                Cancel
              </Button>
            </Link>
          </h1>
        </div>
        <div className="cp-form-container">
          <form>
            {showError()}
            {showSuccess()}
            <TextField
              label="Enter Current Password"
              variant="outlined"
              className={classes.cpTextField}
              value={pcurrentPassword}
              onChange={handleChange("pcurrentPassword")}
              type={showPassword ? "text" : "password"} //password shown and hide
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            {Object.keys(currentPasswordErr).map((key) => {
              return (
                <p
                  style={{
                    color: "#dc3545",
                    marginLeft: "0.5rem",
                    fontSize: ".9rem",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {currentPasswordErr[key]}
                </p>
              );
            })}
            <TextField
              label="Enter New Password"
              variant="outlined"
              className={classes.cpTextField}
              value={pnewPassword}
              onChange={handleChange("pnewPassword")}
              type={showPassword ? "text" : "password"} //password shown and hide
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            {Object.keys(newPasswordErr).map((key) => {
              return (
                <p
                  style={{
                    color: "#dc3545",
                    marginLeft: "0.5rem",
                    fontSize: ".9rem",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {newPasswordErr[key]}
                </p>
              );
            })}
            <TextField
              label="Confirm New Password"
              variant="outlined"
              className={classes.cpTextField}
              value={pconfirmPassword}
              onChange={handleChange("pconfirmPassword")}
              type={showPassword ? "text" : "password"} //password shown and hide
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            {Object.keys(confirmPasswordErr).map((key) => {
              return (
                <p
                  style={{
                    color: "#dc3545",
                    marginLeft: "0.5rem",
                    fontSize: ".9rem",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {confirmPasswordErr[key]}
                </p>
              );
            })}
            <div style={{ textAlign: "right" }}>
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                onClick={clickUpdate}
                className={classes.btn}
              >
                {loading ? "Saving Changes.." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ChangePassword;
