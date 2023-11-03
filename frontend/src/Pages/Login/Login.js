// src/components/LoginForm.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    userName: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Reset form errors
    setFormErrors({ userName: "", password: "" });

    if (!formData.userName) {
      setFormErrors({ ...formErrors, userName: "Username is required" });
      return;
    }

    if (!formData.password) {
      setFormErrors({ ...formErrors, password: "Password is required" });
      return;
    }

    try {
      const { data } = await login({
        variables: { input: formData },
      });

      console.log("Login successful:", data);

      // Redirect to another page after login (e.g., dashboard)
      navigate("/dashboard");
    } catch (error) {
      alert("Wrong login credentials");
      console.error("Login error:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "50vh", marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Username"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          error={formErrors.userName !== ""}
          helperText={formErrors.userName}
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
          error={formErrors.password !== ""}
          helperText={formErrors.password}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          size="large"
          style={{ marginTop: 20 }}
        >
          Log In
        </Button>
      </form>
    </Container>
  );
};

export default Login;


// import React, { useState } from 'react'
// import { TextField, Button } from '@mui/material';

// import "./Login.css"

// const Login = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const loginUser = async (event) => {
//         event.preventDefault()

//         const response = await fetch('http://localhost:5000/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				email,
// 				password,
// 			}),
// 		})
// 		const data = await response.json()

//         if (data.user) {
//             localStorage.setItem('token', data.user)
//             alert('Login successful')
//             window.location.href = '/'
//         } else {
//             alert('Wrong User credentials')
//         }
//     }

//     return (
//         <div className="Login">
//             <h1>Login</h1>
//             <form onSubmit={loginUser}>

//                 <TextField
//                     label="Email"
//                     variant="outlined"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     placeholder="Email"
//                 />
//                 <br />
//                 <TextField
//                     label="Password"
//                     variant="outlined"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     type="password"
//                     placeholder="Password"
//                 />
//                 <br />
//                 <Button variant="outlined" type="submit" value="Login">Login</Button>
//             </form>
//         </div>
//     )
// }

// export default Login
