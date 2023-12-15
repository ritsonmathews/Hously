import axios from "axios";
import { API } from "../../config";

export const getAllUsers = (adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/listall/users/${adminId}`,
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
