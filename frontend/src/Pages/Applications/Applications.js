import {
  Container,
  Grid,
  TextField,
  Button,
  Input,
  Backdrop,
  CircularProgress,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { isAuthenticated } from "../../auth";
import "./Applications.css";
import { applicationSubmitApi, programDetailsApi } from "./ApplicationsAPI";

const SubmitApplication = (props) => {
  const { history } = props;
  const adminId = isAuthenticated().admin._id;
  const programId = props.match.params.programId;
  const { token } = isAuthenticated();
  const formData = new FormData();
  const [pageLoading, setPageLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const [applicationDetails, setApplicationDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    success: "",
    loading: false,
    error: "",
  });

  const { name, email, mobile, success, loading, error } = applicationDetails;

  const [programDetails, setProgramDetails] = useState({
    programNumber: "",
    title: "",
    place: "",
    domain: "",
    Salary: "",
    language: "",
    gender: "",
    description: "",
  });

  const {
    programNumber,
    title,
    Salary,
    place,
    language,
    domain,
    gender,
    description,
    createdAt
  } = programDetails;

  useEffect(() => {
    displayProgram();
  }, []);

  //application api calling
  const application = () => {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("title", title);
    formData.append("Salary", Salary);
    formData.append("domain", domain);
    formData.append("place", place);
    formData.append("language", language);
    formData.append("resume", selectedFile);
    applicationSubmitApi(token, programId, adminId, formData).then((res) => {
      if (res.response) {
        setApplicationDetails({
          error: res.response.data.error,
        });
      } else if (res.data) {
        setApplicationDetails({
          name: "",
          email: "",
          mobile: "",
          success: "Application submitted successfully",
        });
        handleClick();
        history.push('/user/jobs');
      }
    });
  };

  //program details api calling
  const displayProgram = () => {
    programDetailsApi(token, programId, adminId).then((res) => {
      const { data } = res;
      setProgramDetails({
        ...programDetails,
        programNumber: data.programNumber,
        title: data.title,
        place: data.place,
        domain: data.domain,
        Salary: data.Salary,
        language: data.language,
        gender: data.gender,
        description: data.description,
      });
      setPageLoading(false);
    });
  };

  const handleChange = (name) => (event) => {
    setApplicationDetails({
      ...applicationDetails,
      [name]: event.target.value,
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

  const showPageLoading = () =>
    pageLoading && (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <div className="submit-application-main">
      <Container style={{marginTop:"100px"}}>
        <div className="submit-application-parent">
          <div className="submit-application-program">
            <div className="submit-application-program-details">
              {showPageLoading()}
              {showSuccess()}
              <Grid container>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => history.goBack()}
                    startIcon={<IoIosArrowBack />}
                    size="small"
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
              <div className="submit-application-program-heading">
                <h2
                  className="submit-application-program-head"
                  style={{ margin: "0 0 24px 0" }}
                >
                  Program Details
                </h2>
              </div>
              <form>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Program Number"
                        size="small"
                        value={programNumber}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Job Title"
                        size="small"
                        value={title}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Location"
                        size="small"
                        value={place}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Salary"
                        size="small"
                        value={Salary}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Language Preferred"
                        size="small"
                        value={language}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Preferred Gender"
                        size="small"
                        value={gender}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Service"
                        size="small"
                        value={domain}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className="p-detail">
                      <TextField
                        variant="filled"
                        label="Job Description"
                        size="small"
                        value={description}
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
          {/* submit application */}
          <div className="submit-application-form">
            <div className="submit-application-form-heading">
              <h2 className="submit-application-form-head">Application :</h2>
            </div>
            <div className="submit-application-form-body">
              <div className="submit-application-form-details">
                <form>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <div className="submit-application-form-user-details">
                        <TextField
                          autoComplete="off"
                          variant="outlined"
                          label="Name*"
                          size="small"
                          value={name}
                          onChange={handleChange("name")}
                          style={{
                            marginBottom: "10px",
                            width: "95%",
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className="submit-application-form-user-details">
                        <TextField
                          autoComplete="off"
                          variant="outlined"
                          label="E-mail *"
                          size="small"
                          value={email}
                          onChange={handleChange("email")}
                          style={{
                            marginBottom: "10px",
                            width: "95%",
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className="submit-application-form-user-details">
                        <TextField
                          autoComplete="off"
                          variant="outlined"
                          label="Mobile *"
                          size="small"
                          value={mobile}
                          onChange={handleChange("mobile")}
                          style={{
                            marginBottom: "10px",
                            width: "95%",
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <div className="submit-application-form-user-details">
                        <label htmlFor="contained-button-file">
                          <Input
                            accept="pdf/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            name="file"
                            onChange={changeHandler}
                            style={{
                              marginBottom: "10px",
                              marginRight: "10px",
                              width: "50%",
                            }}
                          />
                          {isFilePicked ? (
                            <div>
                              <p>Filename: {selectedFile.name}</p>
                              <p>Filetype: {selectedFile.type}</p>
                              <p>Size in bytes: {selectedFile.size}</p>
                            </div>
                          ) : (
                            <p>Select a file to show details</p>
                          )}
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Button variant="contained" onClick={application}>
                        Submit Application
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SubmitApplication;
