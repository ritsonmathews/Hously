import React, { useState } from 'react';
import { Container, Grid, Typography, List, ListItem, ListItemText, Button, Card, CardContent, Divider } from '@mui/material';
import './UserProfile.css'


const MyJobs = () => {
 
  const jobData = [
    {
      id: 1,
      title: "Gardner",
      location: "New York, NY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec venenatis velit.",
    },
    {
      id: 2,
      title: "Plumber",
      location: "San Francisco, CA",
      description:
        "Praesent vitae elit malesuada, luctus justo id, congue purus. Sed dignissim massa eget orci tristique.",
    },
    {
      id: 3,
      title: "Electrician",
      location: "Los Angeles, CA",
      description:
        "Suspendisse dapibus urna ut dolor bibendum, ac elementum libero scelerisque.",
    },
  ];
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="MyJobs">
    <Container>
      <Grid container spacing={2}>
        {/* Job List */}
        <Grid item xs={12} md={4}>
          <List>
            {jobData.map((job) => (
              <ListItem
                button
                key={job.id}
                onClick={() => handleJobClick(job)}
              >
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
                <Typography variant="subtitle2">
                  {selectedJob.location}
                </Typography>
                <Divider />
                <Typography>{selectedJob.description}</Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="subtitle1">
              Select a job to view details
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  </div>
  );
};

export default MyJobs;
