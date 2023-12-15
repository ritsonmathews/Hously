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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { getAllUsers } from "./UsersAPI";

const Users = () => {
  const { token } = isAuthenticated();
  const adminId = isAuthenticated().admin._id;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = () => {
    getAllUsers(adminId, token).then(
      (res) => {
        const { data } = res;
        setUsers(data);
      }
    );
  };

  return (
    <div className="seekers-main" style={{marginTop:"80px"}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((value, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.username}</TableCell>
                  <TableCell sx={{ color: "#009900" }}>
                    {value.status}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
