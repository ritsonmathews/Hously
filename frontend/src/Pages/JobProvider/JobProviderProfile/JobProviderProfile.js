import React, { useEffect, useState } from "react";
import "./JobProviderProfile.css";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import {
  getAccStatusApi,
  providerData,
  isProvider,
  getUserApi,
  updateUserProfileApi,
  getDomainApi,
  getTypeApi,
  getFeesTypeApi,
  getAdStatusApi,
  getWorkTypeApi,
  postInternshipApi,
  listSortedInternshipsApi,
  listSortedTrainingsApi,
  getAllProgramsApi,
} from "../JobProviderApi";
import { isAuthenticated } from "../../../auth";
import { Update } from "@mui/icons-material";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import NoData from "../../Common/NoData/NoData";
import Loading from "../../Common/Loading/Loading";
import moment from "moment";

const JobProviderProfile = (props) => {
  const { history } = props;
  const userId = props.match.params.userId;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [update, setUpdate] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [navLink, setNavLink] = useState(0);
  const [accStatus, setAccStatus] = useState("");
  const [listDomain, setListDomain] = useState([]);
  const [fees, setFees] = useState(true);
  const [type, setType] = useState("");
  const [feesType, setFeesType] = useState("");
  const [listAdStatus, setTListAdStatus] = useState("");
  const [workType, setWorkType] = useState("");
  const [freeInternshipCount, setFreeInternshipCount] = useState(0);
  const [paidInternshipCount, setPaidInternshipCount] = useState(0);
  const [freeTrainingCount, setFreeTrainingCount] = useState(0);
  const [paidTrainingCount, setPaidTrainingCount] = useState(0);
  const [allPrograms, setAllPrograms] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    adType: "",
    adCompanyName: "",
    adPlace: "",
    adDuration: "",
    adFeesType: "",
    adFees: null,
    adDomain: "",
    adWorkType: "",
    adPerks: "",
    adSkills: "",
    adStatus: "",
    adError: "",
    Success: "",
    loading: false,
  });

  const {
    adType,
    adCompanyName,
    adPlace,
    adDuration,
    adFeesType,
    adFees,
    adDomain,
    adWorkType,
    adPerks,
    adSkills,
    adStatus,
    adError,
    Success,
    loading,
  } = values;

  const [userData, setUserData] = useState({
    pId: "",
    pName: "",
    pUsername: "",
    pRole: "",
    pAccStatus: "",
    pError: "",
    pLoading: false,
  });
  const { pId, pName, pUsername, pRole, pAccStatus, pLoading, pError } =
    userData;

  useEffect(() => {
    getProvider();
    getAccStatus();
    getDomains();
    getAdType();
    getFeesType();
    getAdStatus();
    getAdWorkType();
    getFreeInternships();
    getPaidInternships();
    getFreeTrainings();
    getPaidTrainings();
    getAllPrograms();
  }, []);
  const handleChange = (name) => (event) => {
    setUserData({
      ...userData,
      pError: false,
      [name]: event.target.value,
    });
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  // Get Dropdown Values (Fuctions) Starts
  const getAccStatus = () => {
    getAccStatusApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setAccStatus(data);
    });
  };

  const getDomains = () => {
    getDomainApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setListDomain(data);
    });
  };

  const getAdType = () => {
    getTypeApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setType(data);
    });
  };

  const getFeesType = () => {
    getFeesTypeApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setFeesType(data);
    });
  };

  const getAdWorkType = () => {
    getWorkTypeApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setWorkType(data);
    });
  };

  const getAdStatus = () => {
    getAdStatusApi(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setTListAdStatus(data);
    });
  };
  // Get Dropdown Values (Fuctions) Ends

  //Get programs Counts Start
  const getFreeInternships = () => {
    listSortedInternshipsApi(
      token,
      userId,
      adminId,
      "desc",
      "createdAt",
      "Free"
    ).then((res) => {
      const { data } = res;
      console.log("Free internships", data);
      console.log(data.length);
      setFreeInternshipCount(data.length);
    });
  };

  const getPaidInternships = () => {
    listSortedInternshipsApi(
      token,
      userId,
      adminId,
      "desc",
      "createdAt",
      "Paid"
    ).then((res) => {
      const { data } = res;
      console.log("Paid internships", data);
      console.log(data.length);
      setPaidInternshipCount(data.length);
    });
  };

  const getFreeTrainings = () => {
    listSortedTrainingsApi(
      token,
      userId,
      adminId,
      "desc",
      "createdAt",
      "Free"
    ).then((res) => {
      const { data } = res;
      console.log("Free internships", data);
      console.log(data.length);
      setFreeTrainingCount(data.length);
    });
  };

  const getPaidTrainings = () => {
    listSortedTrainingsApi(
      token,
      userId,
      adminId,
      "desc",
      "createdAt",
      "Paid"
    ).then((res) => {
      const { data } = res;
      console.log("Paid internships", data);
      console.log(data.length);
      setPaidTrainingCount(data.length);
    });
  };
  //Get programs Counts Ends

  const getAllPrograms = () => {
    getAllProgramsApi(token, userId, adminId).then((res) => {
      const { data } = res;
      console.log("data", data);
      setAllPrograms(data);
      setPageLoading(false);
    });
  };

  const getProvider = () => {
    getUserApi(userId, adminId, token).then((res) => {
      const { data } = res;
      setUserData({
        ...userData,
        pId: data.userNumber,
        pName: data.name,
        pUsername: data.username,
        pRole: data.role,
        pAccStatus: data.status,
      });
    });
  };

  const clickUpdate = () => {
    setUserData({
      ...userData,
      pLoading: true,
    });
    updateUserProfileApi(token, userId, adminId, {
      name: pName,
      status: pAccStatus,
    }).then((res) => {
      if (res.response) {
        setUserData({
          ...userData,
          // pError:res.response.data.error,
          pError: "error",
        });
      } else if (res.data) {
        setUpdate(!Update);
        console.log(res);
        setUserData({
          ...userData,
          pLoading: false,
        });
        setValues({
          ...values,
          Success: "Data Updated Succesfully",
        });
        handleClick();
      }
    });
  };

  const postInternship = () => {
    setValues({
      ...values,
      loading: true,
    });
    postInternshipApi(token, userId, adminId, {
      type: adType,
      companyName: adCompanyName,
      place: adPlace,
      duration: adDuration,
      feesType: adFeesType,
      feesDetails: adFees,
      perks: adPerks,
      domain: adDomain,
      requiredSkills: adSkills,
      workType: adWorkType,
      status: adStatus,
    }).then((res) => {
      console.log(res);
      if (res) {
        if (res.response) {
          setValues({
            ...values,
            adError: res.response.data.error,
          });
        } else if (res.data) {
          setValues({
            adType: "",
            adCompanyName: "",
            adPlace: "",
            adDuration: "",
            adFeesType: "",
            adFees: "",
            adPerks: "",
            adDomain: "",
            adSkills: "",
            adWorkType: "",
            adStatus: "",
            Success: "Program posted Succesfully",
          });
          setValues({
            ...values,
            loading: false,
          });
          handleClick();
          getFreeInternships();
          getPaidInternships();
          getFreeTrainings();
          getPaidTrainings();
          getAllPrograms();
        }
      }
    });
  };
  const showError = () => (
    <div
      style={{
        display: adError ? "" : "none",
        color: "red",
        margin: "0 0 5px 0",
        textAlign: "left",
        letterSpacing: "1px",
      }}
    >
      <BiErrorCircle style={{ margin: "0 5px -2px 0" }} />
      {adError}
    </div>
  );

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
          {Success}
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

  const postProgram = () => (
    <div className="provider-postad-main-parent">
      {showError()}
      <form>
        <Grid container>
          {/* Provider ID */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Provider Id"
              className="provider-postad-textfield"
              style={{ pointerEvents: "none", marginTop: "15px", width: "90%" }}
              value={pId}
            />
          </Grid>

          {/* Ad Type */}
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ minWidth: "90%" }}>
              <InputLabel id="type-label" variant="filled" sx={{ mt: 1.5 }}>
                Type
              </InputLabel>
              <Select
                variant="filled"
                labelId="type-label"
                id="type"
                style={{ margin: "15px 0" }}
                label="Type"
                value={adType}
                onChange={handleChange("adType")}
              >
                {type &&
                  type.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/*Ad Company Name*/}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Company Name"
              className="provider-postad-textfield"
              style={{ marginBottom: "15px", width: "90%" }}
              value={adCompanyName}
              onChange={handleChange("adCompanyName")}
            />
          </Grid>

          {/*Ad Place */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Place"
              className="provider-postad-textfield"
              style={{ marginBottom: "15px", width: "90%" }}
              value={adPlace}
              onChange={handleChange("adPlace")}
            />
          </Grid>

          {/*Ad Duration */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Duration"
              className="provider-postad-textfield"
              style={{ marginBottom: "15px", width: "90%" }}
              value={adDuration}
              onChange={handleChange("adDuration")}
            />
          </Grid>

          {/*Ad Fees Type */}
          <Grid item xs={6} sm={3}>
            <FormControl sx={{ minWidth: "80%" }}>
              <InputLabel id="fees-type-label" variant="filled">
                Fees Type
              </InputLabel>
              <Select
                variant="filled"
                labelId="fees-type-label"
                id="fees-type"
                style={{ marginBottom: "15px" }}
                label="Fees Type"
                value={adFeesType}
                onChange={handleChange("adFeesType")}
              >
                {feesType &&
                  feesType.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Ad Fees Details */}
          <Grid item xs={6} sm={3}>
            {adFeesType === "Paid" && (
              <TextField
                variant="filled"
                label="Fees"
                className="provider-postad-textfield"
                style={{
                  pointerEvents: !fees ? "none" : "",
                  marginBottom: "15px",
                  width: "80%",
                }}
                value={adFees}
                onChange={handleChange("adFees")}
              />
            )}
          </Grid>

          {/* Ad Domain */}
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ minWidth: "90%" }}>
              <InputLabel id="domain-label" variant="filled">
                Domain
              </InputLabel>
              <Select
                variant="filled"
                labelId="domain-label"
                id="domain"
                style={{ marginBottom: "15px" }}
                label="Domain"
                value={adDomain}
                onChange={handleChange("adDomain")}
              >
                {listDomain.map((value, index) => (
                  <MenuItem key={index} value={value._id}>
                    {value.domainName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Ad Work type */}
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ minWidth: "90%" }}>
              <InputLabel id="worktype-label" variant="filled">
                Work Type
              </InputLabel>
              <Select
                variant="filled"
                labelId="worktype-label"
                id="worktype"
                style={{ marginBottom: "15px" }}
                value={adWorkType}
                label="Work Type"
                onChange={handleChange("adWorkType")}
              >
                {workType &&
                  workType.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Ad Perks */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Perks"
              multiline
              rows={4}
              className="provider-postad-textfield"
              style={{ marginBottom: "15px", width: "90%" }}
              value={adPerks}
              onChange={handleChange("adPerks")}
            />
          </Grid>

          {/* Ad Skills */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              label="Required Skills"
              multiline
              rows={4}
              className="provider-postad-textfield"
              style={{ marginBottom: "15px", width: "90%" }}
              value={adSkills}
              onChange={handleChange("adSkills")}
            />
          </Grid>

          {/* Ad Status */}
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ minWidth: "90%" }}>
              <InputLabel id="adStatus-label" variant="filled">
                Status
              </InputLabel>
              <Select
                variant="filled"
                labelId="adStatus-label"
                id="adStatus"
                style={{ marginBottom: "15px" }}
                value={adStatus}
                label="Status"
                onChange={handleChange("adStatus")}
              >
                {listAdStatus &&
                  listAdStatus.map((data, index) => (
                    <MenuItem key={index} value={data}>
                      {data}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Ad Posting Button */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              sx={{
                margin: "10px 0 0",
                width: "90%",
                textTransform: "capitalize",
              }}
              onClick={postInternship}
            >
              {loading ? "Posting..." : "Post Program"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
  //

  const viewPrograms = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "15px",
      }}
    >
      {allPrograms.length === 0 && pageLoading && <Loading />}
      {allPrograms.length === 0 && !pageLoading && <NoData />}
      {allPrograms.length > 0 &&
        allPrograms.map((data, index) => (
          <Card
            key={index}
            sx={{ minWidth: "95%", mt: 3, backgroundColor: "#F1F2F7" }}
          >
            <CardContent>
              <div className="provider-profile-card">
                <div className="provider-profile-card-content">
                  <Typography>Type : {data.type}</Typography>
                  <Typography>Program no : {data.programNumber}</Typography>
                  <Typography>Status : {data.status}</Typography>
                </div>
                <div className="provider-profile-card-content">
                  <Typography>
                    Comapany : {data.companyName} , {data.place}
                  </Typography>
                  <Typography>Domain : {data.domain.domainName}</Typography>
                  <Typography>Type : {data.workType}</Typography>
                </div>
                <div className="provider-profile-card-content">
                  <Typography>
                    Program posted : {moment(data.createdAt).fromNow()}
                  </Typography>
                  <Typography>Fee : {data.feesType}</Typography>
                  <Typography sx={{ textAlign: "right" }}>
                    <Link
                      to={`/jobprovider/profile/manage/${userId}/${data._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ textTransform: "capitalize", mt: 2 }}
                      >
                        Manage
                      </Button>
                    </Link>
                    <Link
                      to={`/jobprovider/profile/applications/${userId}/${data._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ textTransform: "capitalize", mt: 2, ml: 2 }}
                      >
                        View Applications
                      </Button>
                    </Link>
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  return (
    <div className="provider-profile-main-parent">
      <Container>
        <div className="provider-profile-main">
          {showPageLoading()}
          {showSuccess()}
          <div className="provider-profile-main-top">
            <div className="provider-profile-main-left">
              <form>
                <Grid container>
                  <Grid item xs={12} sx={{ mb: 2 }}>
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
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", marginBottom: "20px" }}
                  >
                    <div className="provider-profile-left-heading">
                      Personal Information :
                    </div>
                    <Button
                      variant="outlined"
                      disableElevation
                      onClick={() => setUpdate(!update)}
                      sx={{
                        margin: "5px 0 0 40px",
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
                        width: "80%",
                        marginBottom: "17px",
                      }}
                      variant="outlined"
                      label="ID"
                      value={pId}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        pointerEvents: update ? "" : "none",
                        width: "80%",
                        marginBottom: "17px",
                      }}
                      variant="outlined"
                      label="Name"
                      onChange={handleChange("pName")}
                      value={pName}
                      size="small"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        pointerEvents: update ? "none" : "none",
                        width: "80%",
                        marginBottom: "17px",
                      }}
                      variant="outlined"
                      label="Username"
                      onChange={handleChange("pUsername")}
                      value={pUsername}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{
                        pointerEvents: update ? "none" : "none",
                        width: "80%",
                        marginBottom: "17px",
                      }}
                      variant="outlined"
                      label="Role"
                      onChange={handleChange("pRole")}
                      value={pRole === 0 ? "Seeker" : "Provider"}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ minWidth: "80%" }} required>
                      <InputLabel id="account-status-label" variant="outlined">
                        Account Status
                      </InputLabel>
                      <Select
                        labelId="account-status-label"
                        id="account-status"
                        style={{
                          pointerEvents: update ? "" : "none",
                          marginBottom: "17px",
                        }}
                        value={pAccStatus}
                        label="Account Status"
                        onChange={handleChange("pAccStatus")}
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
                      {pLoading ? "Updating..." : "Update"}
                    </Button>
                  ) : null}
                </Grid>
              </form>
            </div>
            <div className="provider-profile-main-right">
              <div className="provider-profile-right-cards">
                <div className="provider-profile-right-cards-heading">
                  Programs's info :
                </div>

                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={6}>
                    <Link
                      to={`/job/data/${userId}/Internship/Free`}
                      className="provider-link"
                    >
                      <Box className="provider-profile-box">
                        <h1 className="provider-profile-box-value">
                          {freeInternshipCount}
                        </h1>
                        <p className="provider-profile-box-content">
                          Free Internships
                        </p>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link
                      to={`/job/data/${userId}/Internship/Paid`}
                      className="provider-link"
                    >
                      <Box className="provider-profile-box">
                        <h1 className="provider-profile-box-value">
                          {paidInternshipCount}
                        </h1>
                        <p className="provider-profile-box-content">
                          Paid Internships
                        </p>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link
                      to={`/job/data/${userId}/Training/Free`}
                      className="provider-link"
                    >
                      <Box className="provider-profile-box">
                        <h1 className="provider-profile-box-value">
                          {freeTrainingCount}
                        </h1>
                        <p className="provider-profile-box-content">
                          Free Trainings
                        </p>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link
                      to={`/job/data/${userId}/Training/Paid`}
                      className="provider-link"
                    >
                      <Box className="provider-profile-box">
                        <h1 className="provider-profile-box-value">
                          {paidTrainingCount}
                        </h1>
                        <p className="provider-profile-box-content">
                          Paid Trainings
                        </p>
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>

          <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 3 }}>
            <Tabs value={navLink} centered>
              <Tab label="View programs " onClick={() => setNavLink(0)} />
              <Tab label="Post program" onClick={() => setNavLink(1)} />
            </Tabs>
          </Box>
          {navLink === 0 && viewPrograms()}
          {navLink === 1 && postProgram()}
        </div>
      </Container>
    </div>
  );
};

export default JobProviderProfile;
