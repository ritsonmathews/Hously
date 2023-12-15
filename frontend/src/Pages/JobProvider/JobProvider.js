import { React, useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  Backdrop,
  Tabs,
  Tab,
} from "@mui/material";
import "./JobProvider.css";
import { SearchIcon, SearchOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { isAuthenticated } from "../../auth";
import { listProvidersApi, searchProviderApi } from "../../auth/jobProviderApi";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import NoData from "../Common/NoData/NoData";
import Loading from "../Common/Loading/Loading";

const JobProvider = () => {
  const { token } = isAuthenticated();
  const adminId = isAuthenticated().admin._id;
  const [navLink, setNavLink] = useState(0);
  const [total, setTotal] = useState(false);
  const [showResult, setShowResult] = useState(0);
  const [userName, setUserName] = useState("");
  const [activeProviders, setActiveProviders] = useState([]);
  const [blockedProviders, setBlockedProviders] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    listActiveProviders();
    listBlockedProviders();
  }, []);

  const listActiveProviders = () => {
    setPageLoading(true);
    listProvidersApi(adminId, token, "desc", "createdAt", "Active").then(
      (res) => {
        const { data } = res;
        // console.log(data);
        setActiveProviders(data);
      }
    );
  };

  const listBlockedProviders = () => {
    listProvidersApi(adminId, token, "desc", "createdAt", "Blocked").then(
      (res) => {
        const { data } = res;
        setBlockedProviders(data);
        setPageLoading(false);
      }
    );
  };

  const search = (key) => {
    setUserName(key);
    if (key.length > 2) {
      searchProviderApi(adminId, token, key).then((res) => {
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

  const showPageLoading = () =>
    pageLoading && (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  const activeUsers = () => (
    <div className="providers-main">
      {activeProviders&&activeProviders.length===0&&pageLoading&&<Loading />}
      {activeProviders&&activeProviders.length===0&&!pageLoading&&<NoData />}
      {activeProviders&&activeProviders.length > 0 && (
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
              {activeProviders.map((value, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.username}</TableCell>
                  <TableCell sx={{ color: "#009900" }}>
                    {value.status}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/jobprovider/profile/${value._id}`}
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
    <div className="providers-main">
      {blockedProviders&&blockedProviders.length===0&&pageLoading&&<Loading />}
      {blockedProviders&&blockedProviders.length===0&&!pageLoading&&<NoData />}
      {blockedProviders&&blockedProviders.length > 0 && (
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
              {blockedProviders.map((value, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.username}</TableCell>
                  <TableCell sx={{ color: "#e60000" }}>
                    {value.status}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/jobprovider/profile/${value._id}`}
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
    <div className="providers-main">
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
                      to={`/jobprovider/profile/${value._id}`}
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

  return (
    <div className="job-provider-main-body">
      <Container>
        {/* {showPageLoading()} */}
        <div className="job-provider-root">
          <div className="job-provider-section1">
            <div className="job-provider-section1-head">
              <h2 className="job-provider-main-title">Job-Provider's</h2>
            </div>
            <div className="job-provider-search-bar">
              <Paper
                component="form"
                sx={{
                  p: "6px",
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                }}
                onSubmit={clickSubmit}
              >
                <InputBase
                  placeholder="Search Job-Provider"
                  sx={{ ml: 1, flex: 1, color: "#003300" }}
                  onChange={(event) => search(event.target.value)}
                  value={userName}
                  autoComplete="off"
                />
                <IconButton type="submit" onClick={clickSubmit}>
                  <BsSearch sx={{ color: "#003300" }} />
                </IconButton>
              </Paper>
              <div className="job-provider-search-dropdown">
                {searchList ? (
                  <div className="job-provider-search-list">
                    {searchList.map((value, index) => (
                      <Link
                        to={`/jobprovider/profile/${value._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="job-provider-search-list-content"
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
                  <div className="job-provider-search-list-empty">
                    No results found
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="job-provider-search-result">
            {showResult ? (
              searchResults()
            ) : (
              <>
                {/* <div className="job-provider-section2">
                  <Grid
                    container
                    spacing={9}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Box className="section2-provider-info">
                        <div>
                        <h1 className="section2-active-provider-info-count">
                          {activeProviders.length}
                        </h1>
                        <p className="section2-active-provider-info-title">
                          Active Provider's
                        </p>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className="section2-provider-info">
                        <div>
                        <h1 className="section2-blocked-provider-info-count">
                          {blockedProviders.length}
                        </h1>
                        <p className="section2-blocked-provider-info-title">
                          Blocked Provider's
                        </p>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </div> */}
                <div className="job-provider-section3">
                  {/* <div className="job-provider-section3-routes">
                    <span
                      className="job-provider-section3-routes-link"
                      onClick={() => setNavLink(0)}
                      style={{ borderBottom: getBorder(0) }}
                    >
                      Active
                    </span>
                    <span
                      className="job-provider-section3-routes-link"
                      onClick={() => setNavLink(1)}
                      style={{ borderBottom: getBorder(1) }}
                    >
                      Blocked
                    </span>
                  </div> */}
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
                  <div className="job-provider-section3-body">
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

export default JobProvider;
