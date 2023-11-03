import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';


import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';

const GET_JOBS = gql`
  query {
    getJobs {
      _id
      title
      description
      Salary
      gender
      language
      location
      postedBy {
        _id
        firstName
        lastName
      }
    }
  }
`;

function JobListingPage() {
  const { loading, error, data } = useQuery(GET_JOBS);

  const [selectedJob, setSelectedJob] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const jobs = data.getJobs; 

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="Jobs">
      <Container sx={{minHeight:"50vh",marginTop:"50px"}}>
        <Grid container spacing={2}>
          {/* Job List */}
          <Grid item xs={12} md={4}>
            <List>
              {jobs.map((job) => (
                <ListItem button key={job._id} onClick={() => handleJobClick(job)}>
                  <ListItemText primary={job.title} secondary={job.location} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Job Details */}
          <Grid item xs={12} md={8}>
            {selectedJob ? (
              <Card>
                <CardContent>
                  <Typography variant="h5">{selectedJob.title}</Typography>
                  <Typography variant="subtitle2">{selectedJob.location}</Typography>
                  <Divider />
                  <Typography>{selectedJob.description}</Typography>
                  <Typography>Salary: {selectedJob.Salary}</Typography>
                  <Typography>Gender: {selectedJob.gender}</Typography>
                  <Typography>Language: {selectedJob.language}</Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="subtitle1">Select a job to view details</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default JobListingPage;
