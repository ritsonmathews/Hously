import React, { useState } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      userName
    }
  }
`;

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, error, data } = useQuery(GET_USERS);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewUser = (userId) => {
    // Handle viewing a user (e.g., redirect to user profile)
  };

  const handleRemoveUser = (userId) => {
    // Handle removing a user (e.g., make an API call to delete the user)
  };

  if (loading) return "Loading...";

  if (error) {
    console.error(error);
    // Handle the error appropriately (e.g., display an error message)
  }

  return (
    <Container sx={{ minHeight: "50vh", marginTop: "50px" }}>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <TableContainer component={Paper} className="mt-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getUsers
              .filter(
                (user) =>
                  user &&
                  user.userName &&
                  user.userName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewUser(user._id)}
                      style={{ margin: "5px" }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveUser(user._id)}
                      style={{ margin: "5px" }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserManagement;
