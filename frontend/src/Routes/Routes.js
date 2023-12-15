import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Header-u from "./Components/Header-u/Header";
// import Footer-u from "./Components/Footer-u/Footer";

import { HomePage } from "../Components/HomePage/HomePage";
import Header from "../Components/Header/Header";
import LandingPage from "../Components/LandingPage/LandingPage";
import AddDomain from "../Pages/AddDomain/AddDomain";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddAdmin from "../Pages/General/Pages/AddAdmin/AddAdmin";
import General from "../Pages/General/General";
import JobSeeker from "../Pages/JobSeeker/JobSeeker";
import Login from "../Pages/Login/Login";
import PostJob from "../Pages/PostJob/PostJob";
import Checkout from "../Pages/Checkout/Checkout";
import Jobs from "../Pages/Jobs/Jobs";
import Applications from "../Pages/Applications/Applications";
import Register from "../Pages/Register/Register";
import JobProvider from "../Pages/JobProvider/JobProvider";
import JobProviderProfile from "../Pages/JobProvider/JobProviderProfile/JobProviderProfile";
import JobProviderManage from "../Pages/JobProvider/JobProviderManage/JobProviderManage";
import JobData from "../Pages/JobData/JobData";
import EditProfile from "../Pages/General/Pages/EditProfile/EditProfile";
import ContactPage from "../Pages/Contact/ContactUs"
import AboutPage from "../Pages/About/AboutPage"
import { ThemeProvider, createTheme } from "@mui/material";
import JobSeekerProfile from "../Pages/JobSeeker/JobSeekerProfile/JobSeekerProfile";
import JobProviderApplications from "../Pages/JobProvider/JobProviderApplications/JobProviderApplications";
import ManageApplications from "../Pages/Common/ManageApplications/ManageApplications";
import ViewApplications from "../Pages/ViewApplications/ViewApplications";
import UserApplications from "../Pages/JobSeeker/UserApplications/UserApplications";
import SubmitApplication from "../Pages/JobSeeker/SubmitApplication/SubmitApplication";
import ViewPrograms from "../Pages/ViewProgams/ViewPrograms";
import SearchPrograms from "../Pages/Common/SearchPrograms/SearchPrograms";
import ChangePassword from "../Pages/General/Pages/ChangePassword/ChangePassword";

// import ChatWindow from "../Pages/Chat/ChatWindow";

import ListAdmins from "../Pages/General/Pages/ListAdmins/ListAdmins";
import ManageAdmins from "../Pages/Common/ManageAdmins/ManageAdmins";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import PrivateRoute from "../auth/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SuperRoute from "../auth/SuperRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import Support from "../Pages/Chat/Support";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00027b",
    },
    error: {
      main: "#ff1a1a",
    },
    secondary: {
      main: "#9ad0ff",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontFamily: "400",
  },
});

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
      <Router>
        <Header>
          <ScrollToTop />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/home" exact component={HomePage} />
            <Route path="/landingpage" exact component={LandingPage} />
            <Route path="/contact" exact component={ContactPage} />
            <Route path="/about" exact component={AboutPage} />
            <SuperRoute path="/" exact component={Dashboard} />
            <PrivateRoute path="/general" exact component={General} />
            <PrivateRoute path="/addservice" exact component={AddDomain} />
            <PrivateRoute path="/jobprovider" exact component={JobProvider} />
            <PrivateRoute
              path="/jobprovider/profile/:userId"
              exact
              component={JobProviderProfile}
            />
            <PrivateRoute path="/user/postjob" exact component={PostJob} />
            <PrivateRoute path="/user/jobs" exact component={Jobs} />
            <PrivateRoute
              path="/user/apply/job/:programId"
              exact
              component={Applications}
            />
            <PrivateRoute
              path="/jobprovider/profile/manage/:userId/:programId"
              exact
              component={JobProviderManage}
            />
            <PrivateRoute
              path="/jobprovider/profile/applications/:userId/:programId"
              exact
              component={JobProviderApplications}
            />
            <PrivateRoute path="/jobseeker" exact component={JobSeeker} />
            <PrivateRoute
              path="/jobseeker/profile/:userId"
              exact
              component={JobSeekerProfile}
            />
            <PrivateRoute
              path="/user/applications/:userId"
              exact
              component={UserApplications}
            />
            <PrivateRoute
              path="/user/:userId/:programId"
              exact
              component={SubmitApplication}
            />
            <PrivateRoute
              path="/job/data/:userId/:programType/:feesType"
              exact
              component={JobData}
            />
            <SuperRoute path="/general/addadmin" exact component={AddAdmin} />
            <PrivateRoute
              path="/general/editprofile"
              exact
              component={EditProfile}
            />
            <PrivateRoute
              path="/view/applications"
              exact
              component={ViewApplications}
            />
            <PrivateRoute
              path="/view/programs"
              exact
              component={ViewPrograms}
            />
            <PrivateRoute
              path="/applications/manage/:userId/:programId/:applicationId"
              exact
              component={ManageApplications}
            />
            <PrivateRoute
              path="/search/programs/:userId"
              exact
              component={SearchPrograms}
            />
            <PrivateRoute
              path="/change/password"
              exact
              component={ChangePassword}
            />
            <PrivateRoute
              path="/admins/list/all"
              exact
              component={ListAdmins}
            />
            <PrivateRoute
              path="/checkout"
              exact
              component={Checkout}
            />
            <SuperRoute
              path="/admin/manage/:adminId"
              exact
              component={ManageAdmins}
            />
            {/* <PrivateRoute path="/chat" exact component={Support} /> */}
            <PrivateRoute path="/error" exact component={ErrorPage} />
          </Switch>
        </Header>
      </Router>
      </PayPalScriptProvider>
    </ThemeProvider>
  );
};

export default Routes;
