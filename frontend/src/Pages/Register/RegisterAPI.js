import axios from "axios";
import { API } from "../../config";

// Get admin type
export const getAdminTypesApi=()=>{
    return axios({
        method:"GET",
        url:`${API}/admin/admin-types`
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
    console.log(data);
    return axios({
        method: "POST",
        url: `${API}/admin/signup`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: data,
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.error("Error in postAdminAPI:", err);
        throw err; // Rethrow the error for the calling code to handle
    });
};
