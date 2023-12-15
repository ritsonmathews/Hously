import axios from "axios"
import { API } from "../../config"; 

// Seekers Listing API
export const listSeekersApi = (adminId, token, order, sortBy, Status) =>{
    return axios({
        method:"GET",
        url:`${API}/admin/listall/seekers/${adminId}?order=${order}&sortBy=${sortBy}&Status=${Status}`,
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
}

// Search Providers API
export const searchSeekerApi=(adminId, token, Name)=>{
  return axios({
    method:'GET',
    url:`${API}/admin/seeker/search/${adminId}?name=${Name}`,
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
}

//Get User Data
export const getUserApi = (userId, adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/user/read/${userId}/${adminId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get Applications by user
export const getApplicationsByUser = (userId, adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/user/listapplications/${userId}/${adminId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

