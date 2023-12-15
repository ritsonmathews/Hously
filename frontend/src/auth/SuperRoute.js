import React from "react";
import { Route, Redirect } from "react-router";
import { isAuthenticated } from ".";

const SuperRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() &&
        isAuthenticated().admin.status !== "Blocked" &&
        isAuthenticated().admin.role === "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/error", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default SuperRoute;
