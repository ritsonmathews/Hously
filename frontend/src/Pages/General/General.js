import { Button, Container, Divider, Grid } from "@mui/material";
import React from "react";
import "./General.css";
import Profile from "./Components/Profile/Profile";
import ConfigOptions from "./Components/ConfigOptions/ConfigOptions";
import { makeStyles } from "@mui/styles";
import { isAuthenticated } from "../../auth";

const useStyles = makeStyles({
  deletebtn: {
    color: "#d40000",
    borderColor: "#d40000",
    width: "100%",
    "&:hover": {
      backgroundColor: "#d40000",
      borderColor: "#d40000",
      color: "white",
    },
  },
});

const General = () => {
  const name = isAuthenticated().admin.name;
  const username = isAuthenticated().admin.username;

  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f1f2f7",
        padding: "1.5rem",
        height: "91vh",
        marginTop: 60
      }}
    >
      <Container
        maxWidth="md"
        style={{
          backgroundColor: "#fffefe",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <div className="gen-container">
          <div className="gen-pic-container">
            <img
              className="profile-pic"
              src="https://i.pinimg.com/originals/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
              alt="dp"
            />
            <h1 className="profile-name">{name}</h1>
          </div>
          <div className="sub-container-1"></div>
          <div className="sub-container-2">
            <Grid container className="gen-grid-container">
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="details-container"
              >
                {/*  links to add admin, edit admin and change password */}
                <Profile />
                <Divider style={{ margin: "2rem 0" }} />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="configuration-container"
              >
                <ConfigOptions />
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default General;
