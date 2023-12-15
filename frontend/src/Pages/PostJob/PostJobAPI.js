import axios from "axios";
import { API } from "../../config";

// Post Internship
export const postInternshipApi = (token, adminId, data) => {
    return axios({
      method: "POST",
      url: `${API}/admin/add/program/${adminId}`,
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

  export const getGenderApi = (adminId, token) => {
    return axios({
      method: "GET",
      url: `${API}/admin/internship/gender-values/${adminId}`,
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

  //Get domains list (Posting Ad)
export const getDomainApi = (adminId, token) => {
    return axios({
      method: "GET",
      url: `${API}/admin/list/domain/${adminId}`,
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