import {
  Container,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Backdrop,
  CircularProgress,
  Grid,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../../../auth";
import "./SearchPrograms.css";
import {
  viewAllInternships,
  viewAllTrainings,
  searchProgramApi,
} from "./SearchProgramsApi";
import { BsSearch } from "react-icons/bs";
import NoData from "../NoData/NoData";
import Loading from "../Loading/Loading";
import { IoIosArrowBack } from "react-icons/io";
import moment from "moment"

const SearchPrograms = ({ history }) => {
  const { token } = isAuthenticated();
  const { userId } = useParams();
  const adminId = isAuthenticated().admin._id;
  const [navLink, setNavLink] = useState(0);
  const [internships, setInternships] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [total, setTotal] = useState(false);
  const [showResult, setShowResult] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    listInternships();
    listTrainings();
  }, []);

  const listInternships = () => {
    viewAllInternships(adminId, token).then((res) => {
      const { data } = res;
      setInternships(data);
      console.log(internships);
    });
  };

  const listTrainings = () => {
    viewAllTrainings(adminId, token).then((res) => {
      const { data } = res;
      setTrainings(data);
      setPageLoading(false);
    });
  };

  const search = (key) => {
    setCompanyName(key);
    if (key.length > 2) {
      searchProgramApi(adminId, token, key).then((res) => {
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
    setCompanyName("");
    console.log(searchData);
    setSearchList([]);
  };

  const clickBack = () => {
    setShowResult(0);
    setSearchData([]);
  };

  // const showPageLoading = () =>
  //   pageLoading && (
  //     <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );

  const internshipsList = () => (
    <div>
      {internships && internships.length === 0 && pageLoading && <Loading />}
      {internships && internships.length === 0 && !pageLoading && <NoData />}
      {internships && internships.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "15px",
            width: "100%",
          }}
        >
          {internships && internships.map((value, index) => (
            <Card
              key={index}
              sx={{ minWidth: "95%", mt: 3, backgroundColor: "#F1F2F7" }}
            >
              <CardContent>
                <div className="program-list-card">
                  <div className="program-list-card-content">
                    <Typography> Program Type : {value.type} </Typography>
                    <Typography>Number : {value.programNumber} </Typography>
                    <Typography>Status : <span style={{ color: value.status === "Expired" && "red" || value.status === "Active" && "green", fontWeight: "600" }}>{value.status}</span></Typography>
                  </div>
                  <div className="program-list-card-content">
                    <Typography>Company : {value.companyName}</Typography>
                    <Typography>Domain : {value.domain.domainName} </Typography>
                    <Typography>Type : {value.workType}</Typography>
                  </div>
                  <div className="program-list-card-content">
                    <Typography>Program posted {moment(value.createdAt).fromNow()} </Typography>
                    <Typography>Fee : {value.feesType}</Typography>
                    <Typography sx={{ textAlign: "right" }}>
                      {value.status && value.status === "Expired" ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ textTransform: "capitalize", mt: 2 }}
                          disabled
                        >
                          Apply Now
                        </Button>

                      ) : (
                        <Link
                          to={`/user/${userId}/${value._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ textTransform: "capitalize", mt: 2 }}
                          >
                            Apply Now
                          </Button>
                        </Link>
                      )}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
  const trainingsList = () => (
    <div>
      {trainings && trainings.length === 0 && pageLoading && <Loading />}
      {trainings && trainings.length === 0 && !pageLoading && <NoData />}
      {trainings && trainings.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "15px",
          }}
        >
          {trainings && trainings.map((value, index) => (
            <Card
              key={index}
              sx={{ minWidth: "95%", mt: 3, backgroundColor: "#F1F2F7" }}
            >
              <CardContent>
                <div className="program-list-card">
                  <div className="program-list-card-content">
                    <Typography> Program Type : {value.type} </Typography>
                    <Typography>Id : {value.programNumber} </Typography>
                    <Typography>Status : <span style={{ color: value.status === "Expired" && "red" || value.status === "Active" && "green", fontWeight: "600" }}>{value.status}</span></Typography>
                  </div>
                  <div className="program-list-card-content">
                    <Typography>Company : {value.companyName}</Typography>
                    <Typography>Domain : {value.domain.domainName} </Typography>
                    <Typography>Type : {value.workType}</Typography>
                  </div>
                  <div className="program-list-card-content">
                    <Typography>Program posted {moment(value.createdAt).fromNow()} </Typography>
                    <Typography>Fee : {value.feesType}</Typography>
                    <Typography sx={{ textAlign: "right" }}>
                    {value.status && value.status === "Expired" ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ textTransform: "capitalize", mt: 2 }}
                          disabled
                        >
                          Apply Now
                        </Button>

                      ) : (
                        <Link
                          to={`/user/${userId}/${value._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ textTransform: "capitalize", mt: 2 }}
                          >
                            Apply Now
                          </Button>
                        </Link>
                      )}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const searchResults = () => (
    <div>
      <Button
        variant="outlined"
        color="error"
        onClick={clickBack}
        sx={{ mb: 1 }}
        startIcon={<IoIosArrowBack />}
        size="small"
      >
      </Button>
      {searchData.length > 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "15px",
          }}
        >
          {searchData.map((value, index) => (
            <Card
              key={index}
              sx={{ minWidth: "95%", mt: 3, backgroundColor: "#F1F2F7" }}
            >
              <CardContent>
                <div className="program-list-card">
                  <div className="program-list-card-content">
                    <Typography> Program Type : {value.type} </Typography>
                    <Typography>Id : {value._id} </Typography>
                    <Typography>Status : {value.status}</Typography>
                  </div>
                  <div className="program-list-card-content">
                    <Typography>Company : {value.companyName}</Typography>
                    <Typography>Domain : {value.domain.domainName} </Typography>
                    <Typography>Type : {value.workType}</Typography>
                  </div>
                  <div className="program-list-card-content">
                    <Typography>Program posted : {value.createdAt} </Typography>
                    <Typography>Fee : {value.feesType}</Typography>
                    <Typography sx={{ textAlign: "right" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ textTransform: "capitalize", mt: 2 }}
                      >
                        Apply Now
                      </Button>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );

  return (
    <div className="programs-main">
      <Container>
        {/* {showPageLoading()} */}
        <div className="programs-root">
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
          <div className="programs-section1">
            <div className="programs-section1-head">
              <h2 className="programs-main-title">Program's List</h2>
            </div>
            <div className="programs-search-bar">
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
                  placeholder="Search Companies"
                  sx={{ ml: 1, flex: 1, color: "#003300" }}
                  onChange={(event) => search(event.target.value)}
                  value={companyName}
                  autoComplete="off"
                />
                <IconButton type="submit">
                  <BsSearch
                    sx={{ p: "10px", fontSize: "20px", color: "#009900" }}
                  />
                </IconButton>
              </Paper>
              <div className="programs-search-dropdown">
                {searchList ? (
                  <div className="programs-search-list">
                    {searchList.map((value, index) => (
                      <div className="programs-search-list-content" key={index}>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 500,
                            color: "#343638",
                          }}
                        >
                          {value.companyName}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                {total ? (
                  <div className="programs-search-list-empty">
                    No results found
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            {showResult ? (
              searchResults()
            ) : (
              <div className="programs-section3">
                {/* <div className="programs-section3-routes">
                  <span
                    className="programs-section3-routes-link"
                    onClick={() => setNavLink(0)}
                  >
                    Internships
                  </span>
                  <span
                    className="programs-section3-routes-link"
                    onClick={() => setNavLink(1)}
                  >
                    Trainings
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
                    <Tab label="Internships" onClick={() => setNavLink(0)} />
                    <Tab label="Trainings" onClick={() => setNavLink(1)} />
                  </Tabs>
                </Box>
                <div>
                  {navLink === 0 && internshipsList()}
                  {navLink === 1 && trainingsList()}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchPrograms;
