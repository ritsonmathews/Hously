import React from 'react';
import { Container, Grid, TextField, Button, Typography, TextareaAutosize } from '@mui/material';

const Resume = () => {
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
      {/* <Typography variant="h3" className="mb-4" color="#00027B">
        Resume
      </Typography> */}
      <h3 style={{color:"#00027B",marginBottom:"15px"}}>Resume</h3>
      <form>
        <Grid container spacing={2} className="mb-3">
          <Grid item xs={12}>
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              name="firstName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              name="lastName"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              placeholder="Summary"
              style={{ width: '100%', padding: '10px' }}
              name="summary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              name="email"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item xs={12}>
            <TextField
              label="Work Experience"
              variant="filled"
              fullWidth
              name="work experience"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Skills"
              variant="filled"
              fullWidth
              name="skills"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item xs={12}>
            <TextField
              label="Education"
              variant="filled"
              fullWidth
              name="education"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              placeholder="Certifications"
              style={{ width: '100%', padding: '10px' }}
              name="certifications"
            />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" style={{ backgroundColor: '#00027B' }}>
          Update
        </Button>
      </form>
    </Container>
  );
};

export default Resume;
