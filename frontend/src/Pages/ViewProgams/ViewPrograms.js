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
import "./ViewPrograms.css";
import { getProgrammesAPI } from "./ViewProgramsAPI/ViewProgramsAPI";
import { BsSearch } from "react-icons/bs";
import { searchProgramApi } from "../Common/SearchPrograms/SearchProgramsApi";

const useStyles = makeStyles({
  tableContainer: {
    border: "1px solid rgb(218, 218, 218)",
    boxShadow: "0 3px 15px rgb(0 0 0 / 20%)",
    padding: "0",
  },
  tableHead: {
    backgroundColor: "#caf7c6",
    fontFamily:"Montserrat, sans-serif",
  },
  tableCell: {},
  row1: {
    backgroundColor: "whitesmoke",
  },
  row2: {
    backgroundColor: "#f0f0f0",
  },
});

const ViewPrograms = () => {
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [companyName, setCompanyName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [total, setTotal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [programmesList, setProgrammesList] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const getProgrammes = () => {
    setIsLoading(true);
    getProgrammesAPI(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setProgrammesList(data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getProgrammes();
  }, []);

  const programSearch = (key) => {
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

  const classes = useStyles();

  return (
    <Container maxWidth="lg" sx={{ marginTop: "35px" }}>
      {/* <div className='view-programs-head-container'>
                    <h1 className='view-programs-head'>View Programmes</h1>
                    <div className='view-programs-search-container'>
                    <TextField type="text" label="Search" fullWidth/>
                    </div>
                </div> */}
      <div className="view-programs-container">
        <div className="view-programs-section1">
          <div className="view-programs-section1-head">
            <h2 className="view-programs-main-title">View Programs</h2>
          </div>
          <div className="view-programs-search-bar">
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
                placeholder="Search programs"
                sx={{ ml: 1, flex: 1, color: "#003300" }}
                onChange={(event) => programSearch(event.target.value)}
                  value={companyName}
                autoComplete="off"
              />
              <IconButton type="submit">
                <BsSearch sx={{ color: "#003300" }} />
              </IconButton>
            </Paper>
            <div className="view-programs-search-dropdown">
              {searchList ? (
                <div className="view-programs-search-list">
                  {searchList.map((value, index) => (
                    <div className="view-programs-search-list-content" key={index}>
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
                <div className="view-programs-search-list-empty">
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
                    "No.",
                    "Type",
                    "Company Name",
                    "Place",
                    "Duration",
                    "Fees Type",
                    "Fees Details",
                    "Perks",

                    // "Domain",

                    "Required Skills",
                    "Work Type",
                    "Status",
                  ].map((head) => (
                    <TableCell key={head}>{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {programmesList
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row, index) => (
                    <TableRow
                      key={row.companyName}
                      className={index % 2 === 0 ? classes.row1 : classes.row2}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {row.type}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.companyName}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.place}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.duration}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.feesType}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.feesDetails}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.perks}
                      </TableCell>

                      {/* <TableCell
                                            className={classes.tableCell}
                                        >
                                            {row.domain}
                                        </TableCell> */}

                      <TableCell className={classes.tableCell}>
                        {row.requiredSkills}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.workType}
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
          count={Math.ceil(programmesList.length / 10)}
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

export default ViewPrograms;
