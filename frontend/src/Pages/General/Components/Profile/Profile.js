import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../../auth";
import "./Profile.css";

const useStyles = makeStyles({
  btn: {
    // color:"#5b73c7",
    // borderColor:"#5b73c7",
    textTransform: "none",
    // "&:hover":{
    //     backgroundColor:"#5b73c7",
    //     borderColor:"#5b73c7",
    //     color:"white",
    // }
  },
});

const Profile = () => {
  const role = isAuthenticated().admin.role;
  const classes = useStyles();
  return (
    <div className="profile-container">
      <div className="add-admin-container">
        {role === "Super Admin" ? (
          <Link to="/general/addadmin" className="add-admin">
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              disableTouchRipple
            >
              Add Admin
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            disableTouchRipple
            disabled
          >
            Add Admin
          </Button>
        )}
      </div>
      <div className="edit-profile-container">
        <Link to="/general/editprofile" className="edit-profile">
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            disableTouchRipple
          >
            Edit Profile
          </Button>
        </Link>
      </div>
      <div className="change-password-container">
        <Link to="/change/password" className="change-password">
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            disableTouchRipple
          >
            Change Password
          </Button>
        </Link>
      </div>
      <div className="manage-admins-container">
        {role === "Super Admin" ? (
          <Link to="/admins/list/all" className="manage-admins">
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              disableTouchRipple
            >
              Manage Admins
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            className={classes.btn}
            disableTouchRipple
            disabled
          >
            Manage Admins
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
