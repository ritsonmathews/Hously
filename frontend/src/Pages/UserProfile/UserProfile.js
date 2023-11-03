import React from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';

const UserProfile = () => {
  return (
    <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', 
    }}
  >
     <h3 style={{color:"#00027B",marginBottom:"15px"}}>User Profile</h3>
      <form>
        <Grid container spacing={2} className="mb-3">
          <Grid item md={6}>
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              name="firstName"
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              name="lastName"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item md={12}>
            <TextField
              label="Username"
              variant="filled"
              fullWidth
              name="username"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              name="email"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item md={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              name="city"
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Province"
              variant="filled"
              fullWidth
              name="province"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item md={6}>
            <TextField
              label="State"
              variant="filled"
              fullWidth
              name="state"
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Postal Code"
              variant="filled"
              fullWidth
              name="postalCode"
            />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" style={{ backgroundColor: '#00027B' }}>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default UserProfile;
