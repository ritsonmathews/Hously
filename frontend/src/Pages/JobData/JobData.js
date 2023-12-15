import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import "./JobData.css";
import {
  Container,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  userReadApi,
  listAllSortedProgramsApi,
  listSortedProgramsApi,
} from "./JobDataApi";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import NoData from "../Common/NoData/NoData";

const JobData = (props) => {
  const { history } = props;
  const [change, setChange] = useState(0);
  const programType = props.match.params.programType;
  const feesType = props.match.params.feesType;
  const userId = props.match.params.userId;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [allSortedPrograms, setAllSortedPrograms] = useState([]);
  const [activePrograms, setActivePrograms] = useState([]);
  const [expiredPrograms, setExpiredPrograms] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  //user details
  const [values, setValues] = useState({
    userNumber: "",
    name: "",
    username: "",
    status: "",
  });
  const { name, username, userNumber, status } = values;

  useEffect(() => {
    userData();
    allPrograms();
    allActivePrograms();
    allExpiredPrograms();
  }, []);

  //Fetch user data
  const userData = () => {
    setUserLoading(true);
    userReadApi(adminId, token, userId).then((res) => {
      const { data } = res;
      console.log(data);
      setValues({
        ...values,
        userNumber: data.userNumber,
        name: data.name,
        username: data.username,
        status: data.status,
      });
      setUserLoading(false);
    });
  };

  // All Sorted programs
  const allPrograms = () => {
    setLoading1(true);
    listAllSortedProgramsApi(
      adminId,
      token,
      userId,
      "desc",
      "createdAt",
      programType,
      feesType
    ).then((res) => {
      if (res.response) {
        console.log(res.response);
      } else if (res.data) {
        const { data } = res;
        console.log(data);
        setAllSortedPrograms(data);
        setLoading1(false);
      }
    });
  };

  // All active programs
  const allActivePrograms = () => {
    setLoading2(true);
    listSortedProgramsApi(
      adminId,
      token,
      userId,
      "desc",
      "createdAt",
      programType,
      feesType,
      "Active"
    ).then((res) => {
      if (res.response) {
        console.log(res.response);
      } else if (res.data) {
        const { data } = res;
        console.log(data);
        setActivePrograms(data);
        setLoading2(false);
      }
    });
  };

  // All expired programs
  const allExpiredPrograms = () => {
    setLoading3(true);
    listSortedProgramsApi(
      adminId,
      token,
      userId,
      "desc",
      "createdAt",
      programType,
      feesType,
      "Expired"
    ).then((res) => {
      if (res.response) {
        console.log(res.response);
      } else if (res.data) {
        const { data } = res;
        console.log("Expired", data);
        setExpiredPrograms(data);
        setLoading3(false);
      }
    });
  };

  const showTableLoading = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 15,
        mb: 20,
      }}
    >
      <CircularProgress size={25} />
    </Box>
  );

  //all free intship function
  const viewAll = () => (
    <div className="free-intenship-all">
      <div className="data-manage-all-details">
        {allSortedPrograms &&
          allSortedPrograms.length === 0 &&
          loading1 &&
          showTableLoading()}
        {allSortedPrograms && allSortedPrograms.length === 0 && !loading1 && (
          <NoData msg={`${feesType} ${programType}s not found !!`} />
        )}
        {allSortedPrograms && allSortedPrograms.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#caf7c6" }}>
                  <TableCell>No.</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Work Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSortedPrograms.map((value, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{value.companyName}</TableCell>
                    <TableCell>{value.domain.domainName}</TableCell>
                    <TableCell>{value.duration}</TableCell>
                    <TableCell>{value.workType}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: "700",
                        color:
                          (value.status === "Active" && "green") ||
                          (value.status === "Expired" && "red"),
                      }}
                    >
                      {value.status}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        to={`/jobprovider/profile/manage/${userId}/${value._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ textTransform: "capitalize" }}
                        >
                          View/Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );

  const viewActive = () => (
    <div className="free-intenship-all">
      <div className="data-manage-all-details">
        {activePrograms &&
          activePrograms.length === 0 &&
          loading2 &&
          showTableLoading()}
        {activePrograms && activePrograms.length === 0 && !loading2 && (
          <NoData msg={`Active ${feesType} ${programType}s not found !!`} />
        )}
        {activePrograms && activePrograms.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#caf7c6" }}>
                  <TableCell>No.</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activePrograms &&
                  activePrograms.map((value, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{value.companyName}</TableCell>
                      <TableCell>{value.domain.domainName}</TableCell>
                      <TableCell>{value.duration}</TableCell>
                      <TableCell>{value.workType}</TableCell>
                      <TableCell
                        style={{
                          fontWeight: "700",
                          color:
                            (value.status === "Active" && "green") ||
                            (value.status === "Expired" && "red"),
                        }}
                      >
                        {value.status}
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          to={`/jobprovider/profile/manage/${userId}/${value._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ textTransform: "capitalize" }}
                          >
                            View/Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );

  const viewExpired = () => (
    <div className="free-intenship-all">
      <div className="data-manage-all-details">
        {expiredPrograms &&
          expiredPrograms.length === 0 &&
          loading3 &&
          showTableLoading()}
        {expiredPrograms && expiredPrograms.length === 0 && !loading3 && (
          <NoData msg={`Expired ${feesType} ${programType}s not found !!`} />
        )}
        {expiredPrograms && expiredPrograms.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#caf7c6" }}>
                  <TableCell>No.</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expiredPrograms &&
                  expiredPrograms.map((value, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{value.companyName}</TableCell>
                      <TableCell>{value.domain.domainName}</TableCell>
                      <TableCell>{value.duration}</TableCell>
                      <TableCell>{value.workType}</TableCell>
                      <TableCell
                        style={{
                          fontWeight: "700",
                          color:
                            (value.status === "Active" && "green") ||
                            (value.status === "Expired" && "red"),
                        }}
                      >
                        {value.status}
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          to={`/jobprovider/profile/manage/${userId}/${value._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ textTransform: "capitalize" }}
                          >
                            View/Edit
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );

  return (
    <div className="data-manage-main">
      <Container>
        <div className="data-manage-parent">
          <div className="data-manage-user">
            <div className="data-manage-user-number">
              <div>
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
                </Grid>
              </div>
              User Id:{userNumber}
            </div>
            <div>
              <div className="data-manage-heading">
                {programType === "Internship" && feesType === "Free"
                  ? "Free Internships"
                  : null}
                {programType === "Internship" && feesType === "Paid"
                  ? "Paid Internships"
                  : null}
                {programType === "Training" && feesType === "Free"
                  ? "Free Trainings"
                  : null}
                {programType === "Training" && feesType === "Paid"
                  ? "Paid Trainings"
                  : null}
              </div>
            </div>
            <div className="data-manage-user-details">
              <div className="data-manage-user-details-avatar">
                <Avatar sx={{ bgcolor: "#003300" }}>{name.slice(0, 1)}</Avatar>
              </div>
              <div>
                <div className="data-manage-user-details-name">{name}</div>
                <div className="data-manage-user-details-username">
                  {username.slice(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="data-manage-list">
            <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 1 }}>
              <Tabs value={change} centered>
                <Tab label="All" onClick={() => setChange(0)} />
                <Tab label="Active" onClick={() => setChange(1)} />
                <Tab label="Expired" onClick={() => setChange(2)} />
              </Tabs>
            </Box>
          </div>
          <div>
            {change === 0 && viewAll()}
            {change === 1 && viewActive()}
            {change === 2 && viewExpired()}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default JobData;
