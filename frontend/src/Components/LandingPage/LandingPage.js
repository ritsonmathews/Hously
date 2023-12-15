import * as React from "react";
import "./LandingPage.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField, Button, Link, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  return (
    <div className="landingpage">
      <Grid container spacing={2}>
        <Grid className="landing-container" item xs={4} md={7}>
          <h1 className="landing-heading">
            We'll help you find Job you are looking for. You are just one step
            away
          </h1>
          <Button className="landing-button" href="/">
            Login
          </Button>
          
          
        </Grid>
        <Grid item xs={6} md={4}>
          <img
            class="img-fluid w-10"
            src="/img/landingpage.gif"
            style={{ width: 400 }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
