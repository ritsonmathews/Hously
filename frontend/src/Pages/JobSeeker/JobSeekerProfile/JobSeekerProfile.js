import {
  Container,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import "./JobSeekerProfile.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth";
import {
  getAccStatusApi,
  getUserApi,
  updateUserProfileApi,
} from "../../JobProvider/JobProviderApi";
import { getApplicationsByUser } from "../JobSeekerApi";
import { IoIosArrowBack } from "react-icons/io";
import Success from "../../Common/Handlers/Success";

const JobSeekerProfile = (props) => {
  const { history } = props;
  const userId = props.match.params.userId;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [update, setUpdate] = useState(false);
  const [accStatus, setAccStatus] = useState("");
  const [applications, setApplications] = useState("");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(true);

  const [values, setValues] = useState({
    userNumber: "",
    userName: "",
    userUserName: "",
    userRole: "",
    userStatus: "",
    userError: "",
    userLoading: "",
    userSuccess: "",
    userSuccessStatus: false,
  });

  const {
    userNumber,
    userName,
    userUserName,
    userRole,
    userStatus,
    userError,
    userLoading,
    userSuccess,
    userSuccessStatus,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    loadUser();
    loadAccStatus();
    loadSubmittedApplications();
  }, []);

  const loadUser = () => {
    setPage(true);
    console.log(page);
    getUserApi(userId, adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setValues({
        ...values,
        userNumber: data.userNumber,
        userName: data.name,
        userUserName: data.username,
        userRole: data.role,
        userStatus: data.status,
      });
    });
  };

  const loadAccStatus = () => {
    getAccStatusApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setAccStatus(data);
    });
  };

  const loadSubmittedApplications = () => {
    getApplicationsByUser(userId, adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setApplications(data);
      setPage(false);
    });
  };

  const clickUpdate = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      userLoading: true,
    });
    updateUserProfileApi(token, userId, adminId, {
      name: userName,
      status: userStatus,
    }).then((res) => {
      setUpdate(!update);
      console.log(res);
      setValues({
        ...values,
        userSuccessStatus: true,
        userSuccess: "Profile Updated Succesfully",
        userLoading: false,
      });
      handleClick();
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
          {userSuccess}
        </Alert>
      </Snackbar>
    </Stack>
  );

  const showPageLoading = () =>
    page && (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <div className="seeker-profile-main-parent">
      <Container>
        <Button
          variant="contained"
          color="info"
          sx={{ mb: 1 }}
          onClick={() => history.goBack()}
          startIcon={<IoIosArrowBack />}
          size="small"
        >
          Back
        </Button>
        <div className="seeker-profile-main">
          <div className="seeker-profile-main-top">
            <div className="seeker-profile-main-left">
              {showPageLoading()}
              {showSuccess()}
              {/* {userSuccessStatus&&userSuccessStatus===true&&<Success msg={userSuccess} state={true}/>} */}
              <form>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="seeker-profile-left-heading">
                      Personal Information :
                    </div>
                    <Button
                      variant="outlined"
                      disableElevation
                      onClick={() => setUpdate(!update)}
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {update ? "Cancel" : "Edit"}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        pointerEvents: update ? "none" : "none",
                        width: "100%",
                      }}
                      variant="outlined"
                      label="ID"
                      value={userNumber}
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        pointerEvents: update ? "" : "none",
                        width: "100%",
                      }}
                      variant="outlined"
                      label="Name"
                      onChange={handleChange("userName")}
                      value={userName}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        pointerEvents: update ? "none" : "none",
                        width: "100%",
                      }}
                      variant="outlined"
                      label="Username"
                      onChange={handleChange("userUserName")}
                      value={userUserName}
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        pointerEvents: update ? "none" : "none",
                        width: "100%",
                      }}
                      variant="outlined"
                      label="Role"
                      onChange={handleChange("userRole")}
                      value={userRole === 0 ? "Seeker" : "Provider"}
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ minWidth: "100%" }}>
                      <InputLabel id="account-status-label" variant="outlined">
                        Account Status
                      </InputLabel>
                      <Select
                        labelId="account-status-label"
                        id="account-status"
                        style={{
                          pointerEvents: update ? "" : "none",
                        }}
                        value={userStatus}
                        label="Account Status"
                        onChange={handleChange("userStatus")}
                      >
                        {accStatus &&
                          accStatus.map((data, index) => (
                            <MenuItem key={index} value={data}>
                              {data}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  {update ? (
                    <Button
                      variant="contained"
                      sx={{ marginTop: "10px", maxWidth: "300px" }}
                      onClick={clickUpdate}
                    >
                      {userLoading && userLoading ? "Updating..." : "Update"}
                    </Button>
                  ) : null}
                </Grid>
              </form>
            </div>
            <div className="seeker-profile-main-right">
              <div className="seeker-profile-right-cards">
                <div className="seeker-profile-right-cards-heading">
                  Applications Submitted
                </div>

                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <Grid item xs={6}>
                      <Box className="seeker-profile-box">
                        <h1 className="seeker-profile-box-value">
                          {applications ? applications.length : 0}
                        </h1>
                        <p className="seeker-profile-box-content">Total</p>
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      to={`/user/applications/${userId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          textTransform: "capitalize",
                          mt: 2,
                          letterSpacing: "1px",
                        }}
                      >
                        View Submitted Applications
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      to={`/search/programs/${userId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="info"
                        sx={{
                          textTransform: "none",
                          mt: 0.5,
                          letterSpacing: "1px",
                        }}
                      >
                        Submit an Application
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>

          {/* Bottom start here */}
        </div>
      </Container>
    </div>
  );
};

export default JobSeekerProfile;
