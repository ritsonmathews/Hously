import axios from "axios"
import { API } from "../../../config";

// Get admin data
export const getAdminApi=(adminId)=>{
    return axios({
        method:"GET",
        url:`${API}/admin/profile/${adminId}`
    })
    .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
}

// get admi statuses
export const getAdminStatusApi=(adminId)=>{
    return axios({
        method:"GET",
        url:`${API}/admin/status/${adminId}`
    })
    .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
}

//update admin
export const updateAdminApi=(adminId,data)=>{
    return axios({
        method:"PUT",
        url:`${API}/admin/edit/${adminId}`,
        data:data
    })
    .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.response);
        return err;
      });
}