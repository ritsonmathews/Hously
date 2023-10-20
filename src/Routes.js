import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage/HomePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
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

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/reviews" element={<MyReviews />} />
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobposting" element={<JobPosting />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
