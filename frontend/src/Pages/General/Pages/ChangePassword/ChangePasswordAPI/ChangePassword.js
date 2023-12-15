import axios from "axios"
import { API } from "../../../../../config"

export const updatePasswordAPI=( token, data )=>{
    return axios({
        method:"PUT",
        url:`${API}/admin/change/password`,
        headers:{
            Authorization: `Bearer ${token}`,
        },
        data:data,
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        console.log(err)
        return err
    })
}