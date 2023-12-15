import axios from "axios";
import { API } from "../../../../config";

// Get admin type
export const getAdminTypesApi=(adminId)=>{
    return axios({
        method:"GET",
        url:`${API}/admin/admin-types/${adminId}`
    })
    .then(res=>{
        return res
    })
    .catch(err=>{
        console.log(err);
        return err
    })
}
// To add a new admin
export const postAdminAPI = (token, data) => {
    return axios({
        method:"POST",
        url:`${API}/admin/signup`,
        headers:{
            Authorization:`Bearer ${token}`,
        },
        data:data
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        console.log(err);
        return err;
    });
}