import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage/HomePage";
import Header from "./Components/Header-u/Header";
import Footer from "./Components/Footer-u/Footer";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Resume from "./Pages/UserProfile/Resume";
import MyReviews from "./Pages/UserProfile/MyReviews";
import Services from "./Pages/AdminServices/Services";
import Jobs from "./Pages/JobListing/Jobs";
import MyJobs from "./Pages/UserProfile/MyJobs";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/ContactPage";
import JobPosting from "./Pages/JobPosting/JobPosting";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import UserManagement from "./Pages/UserManagement/UserManagement";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/reviews" element={<MyReviews />} />
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
