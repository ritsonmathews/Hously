import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../../auth";
import Loading from "../../../Common/Loading/Loading";
import NoData from "../../../Common/NoData/NoData";
import "./ListAdmins.css";
import { listAdminsApi } from "./ListAdminsApi";

const useStyles = makeStyles({
  cancelBtn: {
    float: "right",
    textTransform: "none",
    fontSize: "1rem",
    color: "#c73a3a",
    borderColor: "#c73a3a",
    "&:hover": {
      color: "white",
      backgroundColor: "#c73a3a",
      borderColor: "#c73a3a",
    },
  },
});

const ListAdmins = (props) => {
  const { history } = props;
  const classes = useStyles();
  const adminId = isAuthenticated().admin._id;
  const [admins, setAdmins] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    listAdmins();
  }, []);

  const listAdmins = () => {
    listAdminsApi(adminId).then((res) => {
      if (res.response) {
        console.log(res.response);
      } else if (res.data) {
        const { data } = res;
        setAdmins(data);
        setPageLoading(false);
      }
    });
  };
  return (
    <div className="list-admins-main-parent">
      <div className="list-admins-main">
        <div>
          <h1 className="aa-title">
            Manage Admin's
            <Link to="/general">
              <Button variant="outlined" className={classes.cancelBtn}>
                Cancel
              </Button>
            </Link>
          </h1>
          <p style={{ fontWeight: "500" }}>
            Total No : {admins ? admins.length : "N/A"}
          </p>
        </div>

        {admins && admins.length === 0 && pageLoading && <Loading />}
        {admins && admins.length === 0 && !pageLoading && (
          <NoData msg={"No Admins found !!"} />
        )}
        {admins && admins.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#caf7c6" }}>
                  <TableCell>No </TableCell>
                  <TableCell align="left">Admin ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((data, index) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">
                      <Link
                        to={`/admin/manage/${data._id}`}
                        style={{
                          textDecoration: "none",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        {data.adminNumber}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {data.name ? data.name : "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {data.username ? data.username : "N/A"}
                    </TableCell>
                    <TableCell align="left">
                      {data.role ? data.role : "N/A"}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        fontWeight: "700",
                        color:
                          (data.status === "Deactive" && "red") ||
                          (data.status === "Active" && "green") ||
                          (data.status === "Blocked" && "#ed6c02"),
                      }}
                    >
                      {data.status ? data.status : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        to={`/admin/manage/${data._id}`}
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
        )}
      </div>
    </div>
  );
};

export default ListAdmins;
