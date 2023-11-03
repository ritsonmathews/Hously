import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const JobPosting = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    jobTypes: {
      fullTime: false,
      partTime: false,
      seasonal: false,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle the job posting functionality here, including the selected job types.
  
    console.log('Job Details:', jobDetails);
    // Reset the form or perform any other necessary actions.
    setJobDetails({
      title: '',
      description: '',
      location: '',
      salary: '',
      jobTypes: {
        fullTime: false,
        partTime: false,
        seasonal: false,
      },
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      jobTypes: {
        ...prevJobDetails.jobTypes,
        [name]: checked,
      },
    }));
  };

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
      <h3 style={{ color: '#00027B', marginBottom: '20px' }}>Job Posting</h3>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className="mb-3">
          <Grid item md={12}>
            <TextField
              label="Job Title"
              variant="filled"
              fullWidth
              name="title"
              value={jobDetails.title}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item md={12}>
            <TextField
              label="Job Description"
              variant="filled"
              fullWidth
              name="description"
              multiline
              rows={4}
              value={jobDetails.description}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mb-3">
          <Grid item md={6}>
            <TextField
              label="Location"
              variant="filled"
              fullWidth
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Salary"
              variant="filled"
              fullWidth
              name="salary"
              value={jobDetails.salary}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <FormControl component="fieldset" className="mb-3">
          <FormLabel component="legend">Job Type</FormLabel>
          <FormGroup
            sx={{ flexDirection: 'row' }} 
            item md={6}// Set the flex direction to row
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={jobDetails.jobTypes.fullTime}
                  onChange={handleChange}
                  name="fullTime"
                />
              }
              label="Full-time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={jobDetails.jobTypes.partTime}
                  onChange={handleChange}
                  name="partTime"
                />
              }
              label="Part-time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={jobDetails.jobTypes.seasonal}
                  onChange={handleChange}
                  name="seasonal"
                />
              }
              label="Seasonal"
            />
          </FormGroup>
        </FormControl>
        <Grid item md={6}>
            <TextField
              label="Expected Hours"
              variant="filled"
              fullWidth
              name="salary"
              value={jobDetails.hours}
              onChange={handleChange}
            />
          </Grid>
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: '#00027B', marginTop:'50px',justifyContent:'center' }}
        >
          Post Job
        </Button>
      </form>
    </Container>
  );
};

export default JobPosting;
