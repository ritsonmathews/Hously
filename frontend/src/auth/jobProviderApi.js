import axios from "axios"
import { API } from "../config"

// Providers Listing API
export const listProvidersApi = (adminId, token, order, sortBy, Status) =>{
    return axios({
        method:"GET",
        url:`${API}/admin/listall/providers/${adminId}?order=${order}&sortBy=${sortBy}&Status=${Status}`,
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

// Search Providers API
export const searchProviderApi=(adminId, token, Name)=>{
  return axios({
    method:'GET',
    url:`${API}/admin/provider/search/${adminId}?name=${Name}`,
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
