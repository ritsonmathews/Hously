import { React, useEffect, useState } from "react";
import "./JobSeeker.css";
import {
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Backdrop,
  Tabs,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import { listSeekersApi, searchSeekerApi } from "./JobSeekerApi";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { BsSearch } from "react-icons/bs";
import NoData from "../Common/NoData/NoData";
import Loading from "../Common/Loading/Loading";

const JobSeeker = () => {
  const { token } = isAuthenticated();
  const adminId = isAuthenticated().admin._id;
  const [navLink, setNavLink] = useState(0);
  const [activeSeekers, setActiveSeekers] = useState([]);
  const [blockedSeekers, setBlockedSeekers] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [total, setTotal] = useState(false);
  const [showResult, setShowResult] = useState(0);
  const [userName, setUserName] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    listActiveSeekers();
    listBlockedSeekers();
  }, []);

  const listActiveSeekers = () => {
    setPageLoading(true);
    listSeekersApi(adminId, token, "desc", "createdAt", "Active").then(
      (res) => {
        const { data } = res;
        setActiveSeekers(data);
      }
    );
  };

  const listBlockedSeekers = () => {
    listSeekersApi(adminId, token, "desc", "createdAt", "Blocked").then(
      (res) => {
        const { data } = res;
        setBlockedSeekers(data);
        setPageLoading(false);
      }
    );
  };

  const search = (key) => {
    setUserName(key);
    if (key.length > 2) {
      searchSeekerApi(adminId, token, key).then((res) => {
        const { data } = res;
        if (data.length > 0) {
          setSearchList(data);
          setTotal(false);
        } else {
          setSearchList([]);
          setTotal(true);
        }
        console.log(searchList);
      });
    } else {
      setSearchList([]);
      setTotal(false);
    }
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setTotal(false);
    setShowResult(1);
    setSearchData(searchList);
    setUserName("");
    console.log(searchData);
    setSearchList([]);
  };

  const clickBack = () => {
    setShowResult(0);
    setSearchData([]);
  };

  const activeUsers = () => (
    <div className="seekers-main">
      {activeSeekers&&activeSeekers.length===0&&pageLoading&&<Loading />}
      {activeSeekers&&activeSeekers.length===0&&!pageLoading&&<NoData />}
      {activeSeekers&&activeSeekers.length > 0&& (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeSeekers&&activeSeekers.map((value, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.username}</TableCell>
                  <TableCell sx={{ color: "#009900" }}>
                    {value.status}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/jobseeker/profile/${value._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button color="info" sx={{ textTransform: "capitalize" }}>
                        View Profile
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
  );

  const blockedUsers = () => (
    <div className="seekers-main">
      {blockedSeekers&&blockedSeekers.length===0&&pageLoading&&<Loading />}
      {blockedSeekers&&blockedSeekers.length===0&&!pageLoading&&<NoData />}
      {blockedSeekers&&blockedSeekers.length > 0&& (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blockedSeekers.map((value, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.username}</TableCell>
                  <TableCell sx={{ color: "#009900" }}>
                    {value.status}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/jobseeker/profile/${value._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button color="info" sx={{ textTransform: "capitalize" }}>
                        View Profile
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
  );

  const searchResults = () => (
    <div className="seekers-main">
      <Button
        variant="contained"
        color="info"
        onClick={clickBack}
        sx={{ mb: 1 }}
      >
        Back
      </Button>
      {searchData.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchData.map((value, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.username}</TableCell>
                  <TableCell>{value.status}</TableCell>
                  <TableCell>
                    <Link
                      to={`/jobseeker/profile/${value._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button color="info" sx={{ textTransform: "capitalize" }}>
                        View Profile
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NoData />
      )}
    </div>
  );

  // const showPageLoading = () =>
  //   pageLoading && (
  //     <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );

  return (
    <div className="job-seeker-main-body">
      <Container>
        <div className="job-seeker-root">
          <div className="job-seeker-section1">
            <div className="job-seeker-section1-head">
              <h2 className="job-seeker-main-title">Job-seeker's</h2>
            </div>
            <div className="job-seeker-search-bar">
              <Paper
                component="form"
                sx={{
                  p: "6px",
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  width: "100%",
                }}
                onSubmit={clickSubmit}
              >
                <InputBase
                  placeholder="Search Job-seeker"
                  sx={{ ml: 1, flex: 1, color: "#003300" }}
                  onChange={(event) => search(event.target.value)}
                  value={userName}
                  autoComplete="off"
                />
                <IconButton type="submit" onClick={clickSubmit}>
                  <BsSearch sx={{ p: "10px", color: "#003300" }} />
                </IconButton>
              </Paper>
              <div className="job-seeker-search-dropdown">
                {searchList ? (
                  <div className="job-seeker-search-list">
                    {searchList.map((value, index) => (
                      <Link
                        to={`/jobseeker/profile/${value._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="job-seeker-search-list-content"
                          key={index}
                        >
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: 500,
                              color: "#343638",
                            }}
                          >
                            {value.name}
                          </div>
                          <div>{value.username}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
                {total ? (
                  <div className="job-seeker-search-list-empty">
                    No results found
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="job-seeker-search-result">
            {showResult ? (
              searchResults()
            ) : (
              <>
                {/* <div className="job-seeker-section2">
                  <Grid
                    container
                    spacing={9}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Box className="section2-seeker-info">
                        <div>
                        <h1 className="section2-active-seeker-info-count">
                          {activeSeekers.length}
                        </h1>
                        <p className="section2-active-seeker-info-title">
                          Active
                        </p>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className="section2-seeker-info">
                        <div>
                        <h1 className="section2-blocked-seeker-info-count">
                          {blockedSeekers.length}
                        </h1>
                        <p className="section2-blocked-seeker-info-title">
                          Blocked 
                        </p>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </div> */}
                {/* <div className="job-seeker-section3-routes">
                    <span
                      className="job-seeker-section3-routes-link"
                      onClick={() => setNavLink(0)}
                      style={{ borderBottom: getBorder(0) }}
                    >
                    Active
                    </span>
                    <span
                    className="job-seeker-section3-routes-link"
                    onClick={() => setNavLink(1)}
                    style={{ borderBottom: getBorder(1) }}
                    >
                    Blocked
                    </span>
                  </div> */}
                <div className="job-seeker-section3">
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      mt: 4,
                      bgcolor: "Background.paper",
                    }}
                  >
                    <Tabs value={navLink} centered>
                      <Tab label="Active" onClick={() => setNavLink(0)} />
                      <Tab label="Blocked" onClick={() => setNavLink(1)} />
                    </Tabs>
                  </Box>
                  <div className="job-seeker-section3-body">
                    {navLink === 0 && activeUsers()}
                    {navLink === 1 && blockedUsers()}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default JobSeeker;
