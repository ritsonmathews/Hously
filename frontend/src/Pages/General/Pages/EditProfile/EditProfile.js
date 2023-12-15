import {
  Alert,
  Button,
  Container,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { EditAdminApi, getUserApi } from "./EditProfileAPI";
import { isAuthenticated } from "./../../../../auth";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  cpTextField: {
    marginTop: "1rem",
    backgroundColor: "whitesmoke",
  },
  btn: {
    textTransform: "none",
    marginTop: "2.3rem",
    fontSize: "1rem",
    // color:"#196e1f",
    // borderColor:"#196e1f",
    // "&:hover":{
    //   color:"white",
    //   backgroundColor:"#196e1f",
    //   borderColor:"#196e1f",
    // }
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



const EditProfile = ({ history }) => {
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [nameErr, setNameErr] = useState({});
  const [usernameErr, setusernameErr] = useState({});
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    username: "",
    error: "",
    success: "",
    loading: false,
  });
  const { name, username, error, success, loading } = values;

    useEffect(() => {
    // Fetch user details when the component mounts
    getUserApi(adminId, token)
      .then((res) => {
        if (res.data) {
          setValues({
            ...values,
            name: res.data.name || '',
            username: res.data.username || '',
            // Add other fields as needed
          });
        }
      })
      .catch((err) => {
        console.log('Error fetching user details:', err);
      });
  }, []); 

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
        loading: true,
      });
      EditAdminApi(adminId, token, {
        name: name,
        username: username,
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
            name: "",
            username: "",
            success: "Profile updated successfully",
            loading: false,
          });
          handleClick();
        }
      });
    }
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
        letterSpacing: "1px"
      }}
    >
      <BiErrorCircle style={{ margin: "0 5px -2px 0" }} />
      {error}
    </div>
  );

  const formValidation = () => {
    const nameErr = {};
    const usernameErr = {};
    let isValid = true;
    if (name === "") {
      nameErr.nameRequired = "Name is required";
      isValid = false;
    }
    if (username === "") {
      usernameErr.usernameRequired = "Username is required";
      isValid = false;
    }
    setNameErr(nameErr);
    setusernameErr(usernameErr);
    return isValid;
  };

  const classes = useStyles();
  return (
    <div className="ep-main-container">
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: '#fffefe',
          padding: '1rem',
          borderRadius: '10px',
          marginTop: 10,
        }}
      >
        <div>
          <h1 className="ep-title">
            Edit Profile
            <Link to="/general">
              <Button variant="outlined" className={classes.cancelBtn}>
                Cancel
              </Button>
            </Link>
          </h1>
        </div>
        <div className="ep-form-container">
          <form>
            {showError()}
            {showSuccess()}
            <TextField
              label="Name"
              variant="outlined"
              className={classes.cpTextField}
              value={name}
              onChange={handleChange('name')}
              type="text"
              fullWidth
            />
            <TextField
              label="Username"
              variant="outlined"
              className={classes.cpTextField}
              value={username}
              onChange={handleChange("username")}
              type="text"
              fullWidth
            />
            <div style={{ textAlign: 'right' }}>
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                onClick={clickUpdate}
                className={classes.btn}
              >
                {loading ? 'Saving Changes..' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default EditProfile;
