import axios from "axios";
import { API } from "../../config";

export const getAllProgramsApi = (token, adminId) => {
    return axios({
      method: "GET",
      url: `${API}/admin/list/all/programs/${adminId}?sortBy=createdAt&order=desc`,
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