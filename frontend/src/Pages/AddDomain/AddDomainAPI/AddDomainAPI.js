import axios from "axios";
import { API } from "../../../config";

// To add a new domain
export const postDomainAPI = (adminId, token, data) => {
    return axios({
        method:"POST",
        url:`${API}/admin/add/domain/${adminId}`,
        headers:{
            Authorization:`Bearer ${token}`,
        },
        data:data,
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        console.log(err);
    });
}

// To get the list of domains
export const getDomainListAPI = (adminId, token) => {
    return axios({
        method:"GET",
        url:`${API}/admin/list/domain/${adminId}`,
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

// To delete a domain
export const deleteDomainAPI = (adminId, domainId, token) => {
    return axios({
        method:"DELETE",
        url:`${API}/admin/delete/domain/${adminId}/${domainId}`,
        headers:{
            Authorization:`Bearer ${token}`,
        },
    })
    .then((res)=>{
        return(res);
    })
    .catch((err)=>{
        console.log(err);
    });
};