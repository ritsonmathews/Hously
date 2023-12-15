import axios from "axios";
import { API } from "../../../config";

// To get the list of Applications
export const getApplicationsAPI = (adminId, token) => {
    return axios({
        method:"GET",
        url:`${API}/admin/listall/application/${adminId}`,
        headers:{
            Authorization:`Bearer ${token}`,
        },
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        console.log(err);
        return err;
    });
};

// Search Applications
export const searchApplicationApi=(adminId, token, name)=>{
    return axios({
      method:'GET',
      url:`${API}/admin/search/application/${adminId}?name=${name}`,
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