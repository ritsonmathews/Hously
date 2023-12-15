import axios from "axios";
import { API } from "../../../../config";

export const listAdminsApi = (adminId) => {
  return axios({
    method: "GET",
    url: `${API}/admin/listall/admins/${adminId}`,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
