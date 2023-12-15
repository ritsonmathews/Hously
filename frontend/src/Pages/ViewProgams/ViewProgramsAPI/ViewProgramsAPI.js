import axios from "axios";
import { API } from "../../../config";

// To get the list of Applications
export const getProgrammesAPI = (adminId, token) => {
    return axios({
        method:"GET",
        url:`${API}/admin/list/all/programs/${adminId}`,
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