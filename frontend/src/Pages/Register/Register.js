import {
  Alert,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import "./Register.css";
//   import { getAdminTypesApi, postAdminAPI } from "./AddAdminAPI";
import { isAuthenticated } from "../../auth";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect } from "react";
import { db } from "../../Pages/Chat/firebase";
import { getAdminTypesApi, postAdminAPI } from "./RegisterAPI";

const useStyles = makeStyles({
  aaTextField: {
    marginTop: "1rem",
    backgroundColor: "whitesmoke",
  },
  btn: {
    textTransform: "none",
    marginTop: "2.3rem",
    fontSize: "1rem",
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

const AddAdmin = ({ history }) => {
  const { token } = isAuthenticated();
  // const adminId = isAuthenticated().admin._id
  const [values, setValues] = useState({
    name: "",
    username: "",
    type: "",
    password: "",
    cpassword: "",
    error: "",
    success: "",
    loading: false,
  });
  const { name, username, type, password, cpassword, error, success, loading } =
    values;
  const [adminType, setAdminType] = useState([]);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    try {
      const res = await getAdminTypesApi();
      const { data } = res;
      setAdminType(data);
      setPageLoading(false);
    } catch (error) {
      console.error("Error while fetching admin types:", error);
      // Handle the error as needed
    }
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (password !== cpassword) {
      setValues({
        ...values,
        error: "Passwords do not match!!",
      });
      return false;
    }
    setValues({
      ...values,
      loading: true,
    });
    postAdminAPI(token, {
      name: name,
      username: username,
      role: type,
      password: password,
    }).then((res) => {
      if (res.response) {
        console.log("res", res.response.data.error);
        setValues({
          ...values,
          error: res.response.data.error,
        });
      } else if (res.data) {
        console.log(res);
        setValues({
          name: "",
          username: "",
          password: "",
          cpassword: "",
          success: "New Admin added succesfully",
          loading: false,
        });
        //   db.collection('users')
        //   .doc(res.data.admin.username)
        //   .set({
        //     name:res.data.admin.name,
        //     id:res.data.admin._id
        //   })
        handleClick();
      }
    });
  };

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

  const showPageLoading = () =>
    pageLoading && (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  const classes = useStyles();
  return (
    <div className="aa-main-container">
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#fffefe",
          padding: "0.5rem",
          borderRadius: "10px",
          marginTop:"100px"
        }}
      >
        <div>
          <h1 className="aa-title">
            Sign Up
            <Link to="/login">
              <Button variant="outlined" className={classes.cancelBtn}>
                login
              </Button>
            </Link>
          </h1>
        </div>
        <div className="aa-form-container">
          <form>
            {showPageLoading()}
            {showError()}
            {showSuccess()}
            <TextField
              label="Name"
              variant="outlined"
              className={classes.aaTextField}
              type="text"
              value={name}
              onChange={handleChange("name")}
              fullWidth
              autoComplete="off"
            />
            <TextField
              label="Username"
              variant="outlined"
              className={classes.aaTextField}
              type="text"
              value={username}
              onChange={handleChange("username")}
              fullWidth
              autoComplete="off"
            />
            <FormControl
              sx={{ minWidth: "100%" }}
              className={classes.aaTextField}
            >
              <InputLabel id="type-label" variant="outlined">
                Type
              </InputLabel>
              <Select
                labelId="type-label"
                id="type-status"
                value={type}
                label="Type"
                onChange={handleChange("type")}
              >
                {adminType &&
                  adminType.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Password"
              variant="outlined"
              className={classes.aaTextField}
              autoComplete="off"
              value={password}
              onChange={handleChange("password")}
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              className={classes.aaTextField}
              autoComplete="off"
              value={cpassword}
              onChange={handleChange("cpassword")}
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
            <div style={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={clickSubmit}
                className={classes.btn}
              >
                {loading ? "Adding..." : "SignUp"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddAdmin;
