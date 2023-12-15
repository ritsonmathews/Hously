import React, { useState } from "react";
import "./Login.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { adminAuth, clearJwt, loginApi } from "../../auth";
import { Redirect } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Container } from "react-bootstrap";
import { Box } from "@mui/system";
import { green } from "@mui/material/colors";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: false,
    loading: false,
    redirectTo: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const { username, password, error, loading, redirectTo } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (!username && !password) {
      setValues({
        ...values,
        error: "Please enter a valid username and password",
      });
      return false;
    }
    setValues({
      ...values,
      loading: true,
    });
    loginApi({ username, password }).then((res) => {
      if (res) {
        if (res.response) {
          console.log(res.response);
          setValues({
            ...values,
            error: res.response.data.error,
          });
        } else {
          console.log(res.data);
          const { data } = res;
          adminAuth(data, () => {
            if (data.admin.status === "Active") {
              setValues({
                ...values,
                redirectTo: true,
              });
            } else if(data.admin.status==="Blocked") {
              clearJwt();
              setValues({
                ...values,
                loading: false,
                error:"Account Blocked"
              });
              <Redirect to="/login" />;
            }
          });
        }
      }
    });
  };

  const showError = () => (
    <div
      style={{
        display: error ? "" : "none",
        color: "red",
        margin: "0 0 20px 0",
        textAlign: "left",
        letterSpacing: "1px",
      }}
    >
      <BiErrorCircle style={{ margin: "0 5px -2px 0" }} />
      {error}
    </div>
  );

  const redirectUser = () => {
    if (redirectTo) {
      return <Redirect to="/general" />;
    }
  };
  return (
    <div className="login-main-parent">
      <Container style={{marginTop:"100px"}}>
        <div className="login-main-section">
          <div className="login-main-heading">
            <Avatar
              sx={{ backgroundColor: "#166b3a", color: "black" }}
            ></Avatar>
            <h4 style={{ fontSize: "25px", margin: "0" }}>Login</h4>
          </div>

          <div style={{ padding: "5px 25px 25px" }}>
            {showError()}
            {redirectUser()}

            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  variant="filled"
                  style={{
                    backgroundColor: "white",
                    width: "400px",
                    width: "100%",
                  }}
                  label="Username"
                  value={username}
                  onChange={handleChange("username")}
                  sx={{ mb: 2 }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  style={{ backgroundColor: "white", width: "100%" }}
                  variant="filled"
                  label="Password"
                  fullwidth
                  required
                  value={password}
                  onChange={handleChange("password")}
                  sx={{ mb: 2 }}
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
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "fullwidth",
                    margin: "10px 0",
                  }}
                  onClick={clickSubmit}
                >
                  {loading ? (
                    <div
                      style={{ display: "flex", textTransform: "capitalize" }}
                    >
                      <span>Logging In</span>
                      <Box sx={{ display: "flex", height: "10px" }}>
                        <CircularProgress
                          size={16}
                          sx={{
                            color: "darkgreen",
                            ml: 1,
                            mt: 0.5,
                          }}
                        />
                      </Box>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;

{
  /* <Grid className="">
        <Card
          className="first"
          style={{
            maxWidth: 700,
            padding: "20px 5px",
            textAlign: "center",
            margin: "0 auto",
            paddingTop: "40",
            marginTop: "40px",
          }}
        >
          <CardContent className="first">
            <div className="icon-class">
              <BsFillPersonFill />
            </div>
            <Typography
              gutterBottom
              variant="h4"
              fontWeight={400}
              color="white"
              textAlign="center"
            >
              Log in
            </Typography>

            {showError()}
            {redirectUser()}

            <div className="row">
              <div class="row">
                <TextField
                  id="email"
                  type="text"
                  variant="filled"
                  style={{ backgroundColor: "white", width: "400px" }}
                  label="Username"
                  value={username}
                  onChange={handleChange("username")}
                />
              </div>
              <div class="row">
                <TextField
                  id="password"
                  type="password"
                  style={{ backgroundColor: "white", width: "400px" }}
                  variant="filled"
                  label="Password"
                  fullwidth
                  value={password}
                  onChange={handleChange("password")}
                />
              </div>
              <div class="row">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "100px",
                  }}
                  fullwidth
                  onClick={clickSubmit}
                >
                  login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid> */
}
