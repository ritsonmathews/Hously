import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../../../auth";
import { BsCloudArrowUpFill, BsFillCloudArrowDownFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEditOutline, MdClose } from "react-icons/md";
import {
  getApplicationApi,
  getApplicationStatusApi,
  updateApplicationApi,
  getProgramApi,
  deleteApplicationApi,
} from "../../JobProvider/JobProviderApi";
import "./ManageApplications.css";
import { API } from "../../../config";
import axios from "axios";
import { RiDeleteBinFill } from "react-icons/ri";
import moment from "moment";
import { BiErrorCircle } from "react-icons/bi";

const ManageApplications = (props) => {
  const { history } = props;
  const userId = props.match.params.userId;
  const programId = props.match.params.programId;
  const applicationId = props.match.params.applicationId;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [edit, setEdit] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  let formData = new FormData();
  const [applicationData, setApplicationData] = useState({
    applicationNumber: "",
    name: "",
    domain: "",
    email: "",
    mobile: "",
    status: "",
    description: "",
    error: "",
    success: "",
    loading: false
  });
  const {
    applicationNumber,
    name,
    domain,
    email,
    mobile,
    status,
    description,
    error,
    success,
    loading
  } = applicationData;
  const [programData, setProgramData] = useState({
    programNumber: "",
    companyName: "",
    duration: "",
    type: "",
    place: "",
    feesType: "",
    feesDetails: null,
    perks: "",
    requiredSkills: "",
    workType: "",
    programStatus: "",
    time: "",
  });
  const {
    programNumber,
    companyName,
    duration,
    type,
    place,
    feesType,
    feesDetails,
    perks,
    requiredSkills,
    workType,
    programStatus,
    time,
  } = programData;

  useEffect(() => {
    loadStatus();
    loadProgram();
    loadApplication();
  }, []);

  const handleChange = (name) => (event) => {
    setApplicationData({
      ...applicationData,
      error: "",
      [name]: event.target.value,
    });
    // const value =
    //   name === "resume" ? event.target.files[0] : event.target.value;
    //   formData.append(name,value)
    // setApplicationData({
    //   ...applicationData,
    //   [name]: value,
    // });
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true)
  };

  const loadApplication = () => {
    getApplicationApi(adminId, applicationId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setApplicationData({
        ...applicationData,
        applicationNumber: data.applicationNumber,
        name: data.name,
        domain: data.companyDetails.domain,
        email: data.email,
        mobile: data.mobile,
        status: data.status,
        description: data.description,
      });
      setPageLoading(false);
    });
  };

  const loadProgram = () => {
    getProgramApi(token, userId, programId, adminId).then((res) => {
      const { data } = res;
      console.log(data);
      setProgramData({
        ...programData,
        programNumber: data.programNumber,
        companyName: data.companyName,
        duration: data.duration,
        feesType: data.feesType,
        feesDetails: data.feesDetails,
        place: data.place,
        perks: data.perks,
        requiredSkills: data.requiredSkills,
        type: data.type,
        workType: data.workType,
        programStatus: data.status,
        time: data.createdAt,
      });
    });
  };

  const loadStatus = () => {
    getApplicationStatusApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setApplicationStatus(data);
    });
  };

  const clickUpdate = () => {
    setApplicationData({
      ...applicationData,
      error: "",
      success: "",
      loading: true
    })
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("description", description);
    formData.append("status", status);
    if (isFilePicked) {
      formData.append("resume", selectedFile)
    }
    updateApplicationApi(token, adminId, applicationId, formData).then(
      (res) => {
        console.log(res.status);
        if (res.status === 200) {
          setApplicationData({
            ...applicationData,
            loading: false,
            success: "Application updated succesfully",
          });
          setEdit(!edit)
          handleClick();
        }
        else if (res.status !== 200) {
          setApplicationData({
            ...applicationData,
            error: "Error while updating application"
          })
          handleClick();
        }
      }
    );
  };

  const removeApplication = () => {
    if (window.confirm("Are you sure?") === true) {
      deleteApplicationApi(adminId, applicationId).then((res) => {
        const { data } = res;
        console.log(data);
        setApplicationData({
          ...applicationData,
          success: "Program deleted Successfully",
        });
        setTimeout(() => {
          history.push(`/user/applications/${userId}`);
        }, 1000);
      });
    }
  };

  const readResume = (applicationId) => {
    axios({
      method: "GET",
      url: `${API}/admin/read/resume/${applicationId}`,
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${applicationId}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        if (err.response) {
          setApplicationData({
            ...applicationData,
            error: "Resume not found",
          });
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

  //Snackbar functions Starts
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //Snackbar functions Ends
  const showSuccess = () => (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: success && "#003300", color: success && "white" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Stack>
  );

  const RejectionAlert = () => (
    <div className="rejection-alert-main">
      Alert : This Appliction has been rejected.
    </div>
  );

  const selectionAlert = () => (
    <div className="selection-alert-main">
      Info : This Appliction has been Selected for further processing.
    </div>
  );

  const showPageLoading = () =>
    pageLoading && (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <div className="provider-manage-application-main-parent">
      <Container>
        <div className="manage-application-main">
          {status && status === "Rejected" ? RejectionAlert() : null}
          {status && status === "Selected" ? selectionAlert() : null}
          {showPageLoading()}
          {showSuccess()}
          <form encType="multipart/form-data">
            <Grid container>
              <Grid item xs={5} sx={{ mb: 1 }}>
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
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => setEdit(!edit)}
                  endIcon={edit ? <MdClose /> : <MdModeEditOutline />}
                >
                  {edit ? "Cancel" : "Edit    "}
                </Button>
                <Button
                  color="error"
                  sx={{ textTransform: "capitalize", ml: 1 }}
                  onClick={removeApplication}
                >
                  <RiDeleteBinFill fontSize={20} />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <div
                  style={{
                    margin: "0 0 20px 0",
                    textTransform: "uppercase",
                    fontSize: "14px",
                    fontWeight: "600",
                    paddingTop: "10px",
                  }}
                >
                  Application Number :
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: "green",
                    }}
                  >
                    {" "}
                    {applicationNumber}
                  </span>
                </div>
              </Grid>

              <Grid item xs={12}>
                {showError()}
              </Grid>
              </Grid>

              {/* Applicant Name */}
              <Grid container spacing={2}>
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Full Name"
                  style={{
                    width: "100%",
                    pointerEvents: edit ? "" : "none",
                  }}
                  onChange={handleChange("name")}
                  value={name}
                  required
                />
              </Grid>
              {/* Applicant Email */}
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Email"
                  style={{
                    width: "100%",
                    pointerEvents: edit ? "" : "none",
                  }}
                  onChange={handleChange("email")}
                  value={email}
                  required
                />
              </Grid>

              {/* Applicant Mobile */}
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Mobile"
                  style={{
                    width: "100%",
                    pointerEvents: edit ? "" : "none",
                  }}
                  onChange={handleChange("mobile")}
                  value={mobile}
                  required
                />
              </Grid>

              {/* Applicant Desciption */}
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Desciption"
                  style={{
                    width: "100%",
                    pointerEvents: edit ? "" : "none",
                  }}
                  onChange={handleChange("description")}
                  value={description}
                  required
                  multiline
                  rows={3}
                />
              </Grid>

              {/* Resume Mangement */}
              <Grid item xs={12} sm={6}>
                <div className="application-manage-resume-main">
                  <div className="resume-upload-main">
                    <div>
                      <Button
                        onClick={() => readResume(applicationId)}
                        startIcon={<BsFillCloudArrowDownFill />}
                        style={{textTransform:"capitalize",marginRight:"5px"}}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <label htmlFor="contained-button-file">
                      <Input
                        accept="application/pdf"
                        id="contained-button-file"
                        // multiple
                        type="file"
                        name="file"
                        onChange={changeHandler}
                        style={{
                          marginBottom: "10px",
                          marginRight: "10px",
                          width: "100%",
                        }}
                      />
                    </label>
                  </div>
                </div>
              </Grid>

              {/* Application Status */}
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="application-status-label" variant="outlined">
                    Application Status
                  </InputLabel>
                  <Select
                    variant="outlined"
                    labelId="application-status-label"
                    id="application-status"
                    style={{
                      pointerEvents: edit ? "" : "none",
                    }}
                    label="Application Status"
                    onChange={handleChange("status")}
                    value={status}
                    sx={{
                      color:
                        (status === "Rejected" && "red") ||
                        (status === "Selected" && "green") ||
                        (status === "On Hold" && "#ed6c02"),
                    }}
                  >
                    {applicationStatus &&
                      applicationStatus.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText style={{ color: "#ed6c02", margin: "3px" }}>
                    Warning!! Contact the program Provider before changing the
                    status of the application.
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  sx={{
                    margin: "10px 0 20px",
                    width: "100%",
                    textTransform: "capitalize",
                    display: edit ? "" : "none",
                  }}
                  onClick={clickUpdate}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    margin: " 20px 0 20px 0",
                    textTransform: "uppercase",
                    fontSize: "16 px",
                    fontWeight: "600",
                    paddingTop: "10px",
                  }}
                >
                  Program Details
                  <span style={{ color: "#616C6F" }}>
                    {" "}
                    (ID:{programNumber})
                  </span>
                </div>
              </Grid>

              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Company Name"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={companyName}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Domain"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={domain}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Progam type"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={type}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Duration"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={duration}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Location"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={place}
                />
              </Grid>
              <Grid item sx={12} sm={2}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Fees Type"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={feesType}
                />
              </Grid>
              <Grid item sx={12} sm={2}>
                {feesType !== "Free" && (
                  <TextField
                    variant="filled"
                    size="small"
                    label="Fees"
                    style={{
                      width: "100%",
                      pointerEvents: "none",
                    }}
                    value={feesDetails}
                  />
                )}
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Status"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                    color: programStatus === "Active" ? "green" : null,
                  }}
                  value={programStatus}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Work type"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={workType}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Program posted"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={moment(time).calendar()}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Perks"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={perks}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item sx={12} md={6} lg={4}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Skills required"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={requiredSkills}
                  multiline
                  rows={3}
                />
              </Grid>
              {/* <Grid item sx={12} sm={6}>
                <TextField
                  variant="filled"
                  size="small"
                  label="User ID"
                  style={{
                    width: "100%",
                    pointerEvents: "none",
                  }}
                  value={userId}
                />
              </Grid> */}
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ManageApplications;
