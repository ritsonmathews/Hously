import axios from "axios";
import { API } from "../config";

//Admin Login
export const loginApi = (adminData) => {
  return axios({
    method: "POST",
    url: `${API}/admin/login`,
    data: adminData,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

//Add admin to local storage
export const adminAuth = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

//Check jwt is undefined
export const isUndefined = (next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("jwt") === undefined) {
      localStorage.removeItem("jwt");
      next();
      return axios({
        method: "GET",
        url: `${API}/admin/signout`,
      })
        .then((res) => {
          console.log("Signout", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else return true
  }
};

//Retrieve admin from local storage
export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

//Admin signout
export const signoutApi = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    return axios({
      method: "GET",
      url: `${API}/admin/signout`,
    })
      .then((res) => {
        console.log("Signout", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//Clear local storage
export const clearJwt = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
  }
};