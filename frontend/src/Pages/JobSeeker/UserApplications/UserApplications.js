import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { BsFillCloudArrowDownFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth";
import { API } from "../../../config";
import NoData from "../../Common/NoData/NoData";
import { getApplicationsByUser } from "../JobSeekerApi";

const UserApplications = (props) => {
  const { history } = props;
  const userId = props.match.params.userId;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [applications, setApplications] = useState(null);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    getApplicationsByUser(userId, adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setApplications(data);
      setTimeout(() => {
        setPageLoading(false);
      }, 500);
    });
  };

  const readResume = (applicationId) => {
    window.location.href = `${API}/admin/read/resume/${applicationId}`;
  };

  const showPageLoading = () =>
    pageLoading && (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

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

  return (
    <div className="recieved-applications-main-parent">
      <div className="recieved-applications-main">
        {showPageLoading()}
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
        {applications && applications.length === 0 && !pageLoading && (
          <NoData />
        )}
        {applications && applications.length > 0 && (
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#caf7c6" }}>
                    <TableCell>No </TableCell>
                    <TableCell align="left">Application Number</TableCell>
                    <TableCell align="left">Company</TableCell>
                    <TableCell align="left">Domain</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Resume</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications &&
                    applications.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">
                          <Link
                            to={`/applications/manage/${userId}/${data.programId}/${data._id}`}
                            style={{
                              textDecoration: "none",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {data.applicationNumber}
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          {data.companyDetails.companyName},{" "}
                          {data.companyDetails.companyPlace}
                        </TableCell>
                        <TableCell align="left">
                          {data.companyDetails.domain}
                        </TableCell>
                        <TableCell align="left">
                          {data.companyDetails.feesType}{" "}
                          {data.companyDetails.programType}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontWeight: "700",
                            color:
                              (data.status === "Rejected" && "red") ||
                              (data.status === "Selected" && "green") ||
                              (data.status === "On Hold" && "#ed6c02"),
                          }}
                        >
                          {data.status}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            color="info"
                            onClick={() => readResume(data._id)}
                          >
                            <BsFillCloudArrowDownFill fontSize={18} />
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            to={`/applications/manage/${userId}/${data.programId}/${data._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              color="secondary"
                              variant="contained"
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
            <Pagination
              count={Math.ceil(applications?.length / 10)}
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
        )}
      </div>
    </div>
  );
};

export default UserApplications;
