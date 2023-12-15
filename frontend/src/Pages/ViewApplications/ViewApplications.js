import {
  Container,
  Divider,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  Pagination,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputBase,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth";
import "./ViewApplications.css";
import {
  getApplicationsAPI,
  searchApplicationApi,
} from "./ViewApplicationsAPI/ViewApplicationsAPI";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const useStyles = makeStyles({
  tableContainer: {
    border: "1px solid rgb(218, 218, 218)",
    boxShadow: "0 3px 15px rgb(0 0 0 / 20%)",
    padding: "0",
  },
  tableHead: {
    fontFamily:"Montserrat, sans-serif",
    backgroundColor: "#caf7c6",
  },
  tableCell: {},
  row1: {
    backgroundColor: "whitesmoke",
  },
  row2: {
    backgroundColor: "#f0f0f0",
  },
});

const ViewApplications = () => {
  const [total, setTotal] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [appNo, setAppNo] = useState("");
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();

  const [isLoading, setIsLoading] = useState(false);

  const [appsList, setAppsList] = useState([]);

  const [page, setPage] = useState(1);

  const getApplications = () => {
    setIsLoading(true);
    getApplicationsAPI(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setAppsList(data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const search = (key) => {
    setAppNo(key);
    if (key.length > 2) {
      searchApplicationApi(adminId, token, key).then((res) => {
        if (res.response) {
          console.log(res.response);
        } else if (res.data) {
          const { data } = res;
          if (data.length > 0) {
            setSearchList(data);
            setTotal(false);
          } else {
            setSearchList([]);
            setTotal(true);
          }
          console.log(searchList);
        }
      });
    } else {
      setSearchList([]);
      setTotal(false);
    }
  };

  const classes = useStyles();

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      {/* <div className='view-apps-head-container'>
                    <h1 className='view-apps-head'>View Applications</h1>
                    <div className='view-apps-search-container'>
                    <TextField type="text" label="s" fullWidth/>
                    </div>
                  </div> */}
      <div className="view-apps-container">
        <div className="view-apps-section1">
          <div className="view-apps-section1-head">
            <h2 className="view-apps-main-title">View Applications</h2>
          </div>
          <div className="view-apps-search-bar">
            <Paper
              component="form"
              sx={{
                p: "6px",
                display: "flex",
                alignItems: "center",
                height: "40px",
              }}
            >
              <InputBase
                placeholder="Search applications"
                sx={{ ml: 1, flex: 1, color: "#003300" }}
                autoComplete="off"
                onChange={(event) => search(event.target.value)}
                value={appNo}
              />
              <IconButton type="submit">
                <BsSearch sx={{ color: "#003300" }} />
              </IconButton>
            </Paper>
            <div className="view-apps-search-dropdown">
              {searchList ? (
                <div className="view-apps-search-list">
                  {searchList.map((value, index) => (
                    <div className="view-apps-search-list-content" key={index}>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: 500,
                          color: "#343638",
                        }}
                      >
                        {value.name}
                      </div>
                      <div>{value.applicationNumber}</div>
                    </div>
                  ))}
                </div>
              ) : null}
              {total ? (
                <div className="view-apps-search-list-empty">
                  No results found
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <Divider style={{ margin: "12px 2px" }} />
        <TableContainer component={Paper} className={classes.tableContainer}>
          {isLoading ? (
            <LinearProgress style={{ backgroundColor: "#16d5d9" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  {[
                    "Sl No.",
                    "Application No.",
                    "Name",
                    "Email",
                    "Resume",
                  ].map((head) => (
                    <TableCell key={head}>{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {appsList
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row, index) => (
                    <TableRow
                      key={row.name}
                      // className={index % 2 === 0 ? classes.row1 : classes.row2}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.applicationNumber}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {row.name}
                      </TableCell>
                      {/* <TableCell className={classes.tableCell}>
                        {row.companyDetails.domain}
                      </TableCell> */}
                      <TableCell className={classes.tableCell}>
                        {row.email}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.resume}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={Math.ceil(appsList.length / 10)}
          showFirstButton
          showLastButton
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </div>
    </Container>
  );
};

export default ViewApplications;
