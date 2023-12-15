import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import "./JobProviderApplications.css";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillCloudArrowDownFill } from "react-icons/bs";
import { useState } from "react";
import { isAuthenticated } from "../../../auth";
import {
  deleteApplicationApi,
  getApplicationsOfProgramApi,
} from "../JobProviderApi";
import { API } from "../../../config";
import { Box } from "@mui/system";
import { BiError } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Loading from "../../Common/Loading/Loading";
import NoData from "../../Common/NoData/NoData";

const JobProviderApplications = (props) => {
  const { history } = props;
  const programId = props.match.params.programId;
  const userId = props.match.params.userId;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [applications, setApplications] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    getApplicationsOfProgramApi(programId, adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setApplications(data);
      setTimeout(() => {
        setPageLoading(false);
      }, 500);
    });
  };

  const deleteApplication = (applicationId) => {
    if (window.confirm("Are you sure?") === true) {
      deleteApplicationApi(adminId, applicationId).then((res) => {
        const { data } = res;
        console.log(data);
        loadApplications();
      });
    }
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

  return (
    <div className="recieved-applications-main-parent">
      <div className="recieved-applications-main">
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="info"
              sx={{ mb: 1, mt: 3 }}
              onClick={() => history.goBack()}
              startIcon={<IoIosArrowBack />}
              size="small"
            >
              Back
            </Button>
          </Grid>
        </Grid>
        {applications && applications.length === 0 && pageLoading && (
          <Loading />
        )}
        {applications && applications.length === 0 && !pageLoading && (
          <NoData msg={"No Applications found !!"} />
        )}
        {applications && applications.length > 0 && (
          <div>
            {showPageLoading()}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#caf7c6" }}>
                    <TableCell>No </TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Application Number</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Mobile</TableCell>
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
                        <TableCell align="left">{data.name}</TableCell>
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
                        <TableCell align="left">{data.email}</TableCell>
                        <TableCell align="left">{data.mobile}</TableCell>
                        <TableCell
                          align="left"
                          style={{
                            fontWeight:"700",
                            color:
                              (data.status === "Selected" && "green") ||
                              (data.status === "Rejected" && "red"),
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
                          {/* <Link to={`jobprovider/profile/applications/manage/${userId}/${data._id}`}> */}
                          <a
                            href={`http://localhost:3000/applications/manage/${userId}/${programId}/${data._id}`}
                          >
                            <Button color="error">
                              <MdModeEditOutline fontSize={18} />
                            </Button>
                          </a>
                          {/* </Link> */}
                          <Button
                            color="error"
                            onClick={() => deleteApplication(data._id)}
                          >
                            <RiDeleteBinFill fontSize={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobProviderApplications;
