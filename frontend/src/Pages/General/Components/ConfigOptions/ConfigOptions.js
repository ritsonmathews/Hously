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
// import "./ConfigOptions.css";

import { isAuthenticated } from "./../../../../auth";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getUserApi } from "../../Pages/EditProfile/EditProfileAPI";

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
  const [values, setValues] = useState({
    name: "",
    username: "",
    error: "",
    success: "",
    loading: false,
  });
  const { name, username } = values;

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserApi(adminId, token)
      .then((res) => {
        if (res.data) {
          setValues({
            ...values,
            name: res.data.name || "",
            username: res.data.username || "",
            // Add other fields as needed
          });
        }
      })
      .catch((err) => {
        console.log("Error fetching user details:", err);
      });
  }, []);

  const classes = useStyles();
  return (
    <div className="ep-form-container">
      <form>
        <TextField
          label="Name"
          variant="outlined"
          className={classes.cpTextField}
          value={name}
          disabled
          type="text"
          fullWidth
        />
        <TextField
          label="Username"
          variant="outlined"
          disabled
          className={classes.cpTextField}
          value={username}
          type="text"
          fullWidth
        />
      </form>
    </div>
  );
};

export default EditProfile;
