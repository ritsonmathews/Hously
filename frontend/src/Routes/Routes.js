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
import Login from "../Pages/Login/Login";
import PostJob from "../Pages/PostJob/PostJob";
import Checkout from "../Pages/Checkout/Checkout";
import Jobs from "../Pages/Jobs/Jobs";
import Applications from "../Pages/Applications/Applications";
import Register from "../Pages/Register/Register";
import JobData from "../Pages/JobData/JobData";
import EditProfile from "../Pages/General/Pages/EditProfile/EditProfile";
import { ThemeProvider, createTheme } from "@mui/material";

import ViewApplications from "../Pages/ViewApplications/ViewApplications";

import ViewPrograms from "../Pages/ViewProgams/ViewPrograms";
import SearchPrograms from "../Pages/Common/SearchPrograms/SearchPrograms";
import ChangePassword from "../Pages/General/Pages/ChangePassword/ChangePassword";


import ListAdmins from "../Pages/General/Pages/ListAdmins/ListAdmins";
import ManageAdmins from "../Pages/Common/ManageAdmins/ManageAdmins";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import PrivateRoute from "../auth/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SuperRoute from "../auth/SuperRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ContactPage from "../Pages/Contact/ContactPage";
import AboutPage from "../Pages/About/AboutPage";
import Users from "../Pages/Users/Users";


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
            <Route path="/contact" exact component={ContactPage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/landingpage" exact component={LandingPage} />
            <SuperRoute path="/" exact component={Dashboard} />
            <PrivateRoute path="/general" exact component={General} />
            <PrivateRoute path="/list/users" exact component={Users} />
            <PrivateRoute path="/addservice" exact component={AddDomain} />    
            <PrivateRoute path="/user/postjob" exact component={PostJob} />
            <PrivateRoute path="/user/jobs" exact component={Jobs} />
            <PrivateRoute
              path="/user/apply/job/:programId"
              exact
              component={Applications}
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
