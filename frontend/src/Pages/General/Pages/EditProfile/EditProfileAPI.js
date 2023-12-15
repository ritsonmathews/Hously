import axios from "axios";
import { API } from "../../../../config";
export const EditAdminApi = (adminId, token, data) => {
    return axios({
      method: "PUT",
      url: `${API}/admin/edit/${adminId}`,
      headers: {
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
  };

 //Read user data
export const getUserApi = (adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/profile/${adminId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};