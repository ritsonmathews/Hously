import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

// import { SIGNUP_MUTATION } from '../graphql/mutations';

import { TextField, Button, Container, Typography } from "@mui/material";

export const REGISTER_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        firstName
        lastName
        userName
        age
        dob
      }
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    age: "",
    dob: "",
  });

  const [signup, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setValidationErrors({});

    // Basic form validation
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!formData.userName) {
      errors.userName = "Username is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (!formData.age) {
      errors.age = "Age is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required";
    }

    if (Object.keys(errors).length > 0) {
      // Set validation errors and prevent form submission
      setValidationErrors(errors);
      return;
    }


    try {
      const { data } = await signup({
        variables: { input: formData },
      }).then((response) => {
        // Clear the form by resetting the formData state
        setFormData({
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          age: "",
          dob: "",
        });

        navigate("/login");

        console.log("Signup successful:", data);
      });
    } catch (error) {
      // Handle signup error
      console.error("Signup error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={validationErrors.firstName ? true : false}
          helperText={validationErrors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={validationErrors.lastName ? true : false}
          helperText={validationErrors.lastName}
        />
        <TextField
          label="Username"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={validationErrors.userName ? true : false}
          helperText={validationErrors.userName}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={validationErrors.password ? true : false}
          helperText={validationErrors.password}
        />
        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={validationErrors.age ? true : false}
          helperText={validationErrors.age}
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={validationErrors.dob ? true : false}
          helperText={validationErrors.dob}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          size="large"
          style={{ marginTop: 20 }}
        >
          Sign Up
        </Button>
      </form>
      <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
    </Container>
  );
};

export default Register;

// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { TextField, Button } from '@mui/material';

// const Register = () => {
//     const history = useNavigate()

//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const registerUser = async (event) => {
//         event.preventDefault()

//         const response = await fetch('http://localhost:5000/register', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				name,
// 				email,
// 				password,
// 			}),
// 		})

// 		const data = await response.json()
//         if (data.status === 'OK') {
//             history.push('/login')
//         }
//     }

//     return (
//         <div>
//             <h1>Register</h1>
//             <form onSubmit={registerUser}>
//                 <TextField
//                     label="Name"
//                     variant="outlined"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     type="text"
//                     placeholder="Name"
//                 />
//                 <TextField
//                     label="Email"
//                     variant="outlined"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     placeholder="Email"
//                 />
//                 <TextField
//                     label="Password"
//                     variant="outlined"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     type="password"
//                     placeholder="Password"
//                 />

//                 <Button variant="outlined" type="submit" value="Register">Register</Button>
//             </form>
//         </div>
//     )
// }

// export default Register
