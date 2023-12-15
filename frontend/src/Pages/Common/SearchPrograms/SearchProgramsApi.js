import axios from "axios"
import { API } from "../../../config" 

// List All Internships
export const viewAllInternships = (adminId,token)=>{
    return axios({
        method:"GET",
        url:`${API}/admin/view/internships/${adminId}`,
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

// List All Trainings
export const viewAllTrainings = (adminId,token)=>{
    return axios({
        method:"GET",
        url:`${API}/admin/view/trainings/${adminId}`,
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

// Search Programs
export const searchProgramApi=(adminId, token, Name)=>{
  return axios({
    method:'GET',
    url:`${API}/admin/programs/search/${adminId}?name=${Name}`,
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