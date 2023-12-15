import axios from "axios"
import {API} from "../../../config"

export const applicationSubmitApi = (userId,token,internshipId,adminId,data) =>{
    return axios({
        method:"POST",
        url:`${API}/admin/apply/application/${userId}/${internshipId}/${adminId}`,
        
        headers:{
         Authorization: `Bearer ${token}`,
          
        },
        data: data,

    })
    .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
}


export const programDetailsApi = (userId,token,internshipId,adminId) =>{
  return axios({
      method:"GET",
      url:`${API}/admin/read/program/${userId}/${internshipId}/${adminId}`,
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