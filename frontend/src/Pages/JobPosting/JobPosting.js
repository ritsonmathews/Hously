import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Container, Grid, TextField, TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CREATE_JOB = gql`
  mutation CreateJob($input: JobInput!) {
    createJob(input: $input) {
      _id
      title
      description
      Salary
      gender
      language
      location
    }
  }
`;

const JobPosting = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Salary: 0,
    gender: "",
    language: "",
    location: "",
  });

  const [createJob] = useMutation(CREATE_JOB);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createJob({
        variables: { input: formData },
      });
      console.log("New Job:", data.createJob);
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight:"50vh"
        }}
      >
        <h2>Create a New Job Listing</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                minRows={5}
                cols={100}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Salary"
                type="number"
                name="Salary"
                value={formData.Salary}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Gender"
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Language Prefered"
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Create Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
  );
};

export default JobPosting;

// import React, { useState } from 'react';
// import { Container, Grid, TextField, Button, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

// const JobPosting = () => {

//   return (
//     <Container
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//       }}
//     >
//       <h3 style={{ color: '#00027B', marginBottom: '20px' }}>Job Posting</h3>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2} className="mb-3">
//           <Grid item md={12}>
//             <TextField
//               label="Job Title"
//               variant="filled"
//               fullWidth
//               name="title"
//               value={jobDetails.title}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={2} className="mb-3">
//           <Grid item md={12}>
//             <TextField
//               label="Job Description"
//               variant="filled"
//               fullWidth
//               name="description"
//               multiline
//               rows={4}
//               value={jobDetails.description}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//         </Grid>
//         <Grid container spacing={2} className="mb-3">
//           <Grid item md={6}>
//             <TextField
//               label="Location"
//               variant="filled"
//               fullWidth
//               name="location"
//               value={jobDetails.location}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item md={6}>
//             <TextField
//               label="Salary"
//               variant="filled"
//               fullWidth
//               name="salary"
//               value={jobDetails.salary}
//               onChange={handleChange}
//             />
//           </Grid>
//         </Grid>
//         <FormControl component="fieldset" className="mb-3">
//           <FormLabel component="legend">Job Type</FormLabel>
//           <FormGroup
//             sx={{ flexDirection: 'row' }}
//             item md={6}// Set the flex direction to row
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={jobDetails.jobTypes.fullTime}
//                   onChange={handleChange}
//                   name="fullTime"
//                 />
//               }
//               label="Full-time"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={jobDetails.jobTypes.partTime}
//                   onChange={handleChange}
//                   name="partTime"
//                 />
//               }
//               label="Part-time"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={jobDetails.jobTypes.seasonal}
//                   onChange={handleChange}
//                   name="seasonal"
//                 />
//               }
//               label="Seasonal"
//             />
//           </FormGroup>
//         </FormControl>
//         <Grid item md={6}>
//             <TextField
//               label="Expected Hours"
//               variant="filled"
//               fullWidth
//               name="salary"
//               value={jobDetails.hours}
//               onChange={handleChange}
//             />
//           </Grid>
//         <Button
//           variant="contained"
//           type="submit"
//           style={{ backgroundColor: '#00027B', marginTop:'50px',justifyContent:'center' }}
//         >
//           Post Job
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default JobPosting;
