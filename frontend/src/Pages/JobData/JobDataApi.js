import axios from "axios"
import {API} from '../../config'

//Read user API
export const userReadApi = (adminId,token,userId) =>{
    return axios({
        method:"GET",
        url:`${API}/admin/user/read/${userId}/${adminId}`,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        console.log(err);
        return err
    })
}

//Read all Programs 
export const listAllSortedProgramsApi = (adminId,token,userId,order,sortBy,type,feesData) =>{
    return axios({
        method:"GET",
        url:`${API}/admin/list/data/programs/${userId}/${adminId}?order=${order}&sortBy=${sortBy}&type=${type}&fees=${feesData}`,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        console.log(err);
        return err
    })
}

//Read all Programs 
export const listSortedProgramsApi = (adminId,token,userId,order,sortBy,type,feesData,status) =>{
    return axios({
        method:"GET",
        url:`${API}/admin/list/data/sorted/programs/${userId}/${adminId}?order=${order}&sortBy=${sortBy}&type=${type}&fees=${feesData}&status=${status}`,
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        console.log(err);
        return err
    })
}
