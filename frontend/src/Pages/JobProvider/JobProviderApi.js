import axios from "axios";
import { API } from "../../config";

//Add User to local storage
export const providerData = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("provider", JSON.stringify(data));
    next();
  }
};

//Retrieve User from local storage
export const isProvider = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("provider")) {
    return JSON.parse(localStorage.getItem("provider"));
  } else {
    return false;
  }
};

//Remover user from local storage
export const removeIsProvider = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("provider");
    console.log("Removed from ls");
  }
};

//Read user data
export const getUserApi = (userId, adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/user/read/${userId}/${adminId}`,
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

//List Account Statuses
export const getAccStatusApi = (adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/listall/acc-status/${adminId}`,
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

//Update User Data
export const updateUserProfileApi = (token, userId, adminId, data) => {
  return axios({
    method: "PUT",
    url: `${API}/admin/user/update/${userId}/${adminId}`,
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

//Get Ad Type list (Posting Ad)
export const getTypeApi = (adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/internship/type-values/${adminId}`,
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

//Get Ad Worktype list (Posting Ad)
export const getWorkTypeApi = (adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/internship/worktype-values/${adminId}`,
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

//Get Ad Fees Type list (Posting Ad)
export const getFeesTypeApi = (adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/internship/fees-type-values/${adminId}`,
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

//Get Ad Status list (Posting Ad)
export const getAdStatusApi = (adminId, token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/internship/status-values/${adminId}`,
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

//Get Internships posted by user
export const listSortedInternshipsApi = (
  token,
  userId,
  adminId,
  order,
  sortBy,
  type
) => {
  return axios({
    method: "GET",
    url: `${API}/admin/list/internships/${userId}/${adminId}?order=${order}&sortBy=${sortBy}&type=${type}`,
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
//Get Trainings posted by user
export const listSortedTrainingsApi = (
  token,
  userId,
  adminId,
  order,
  sortBy,
  type
) => {
  return axios({
    method: "GET",
    url: `${API}/admin/list/trainings/${userId}/${adminId}?order=${order}&sortBy=${sortBy}&type=${type}`,
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

// Post Internship
export const postInternshipApi = (token, userId, adminId, data) => {
  return axios({
    method: "POST",
    url: `${API}/admin/add/program/${userId}/${adminId}`,
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

//Retrieve all program posted by user
export const getAllProgramsApi = (token, userId, adminId) => {
  return axios({
    method: "GET",
    url: `${API}/admin/list/programs/${userId}/${adminId}?sortBy=createdAt&order=desc`,
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
//Retrieve one program posted by user
export const getProgramApi = (token, userId, programId, adminId) => {
  return axios({
    method: "GET",
    url: `${API}/admin/read/program/${userId}/${programId}/${adminId}`,
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

// ------------View Submited Applications----------

export const getApplicationsOfProgramApi = (programId,adminId,token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/listapplications/${programId}/${adminId}`,
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



// ------------Program manage----------
//Update Program
export const updateProgramApi = (token, userId, programId, adminId, data) => {
  return axios({
    method: "PUT",
    url: `${API}/admin/update/program/${userId}/${programId}/${adminId}`,
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

//delete Program
export const deleteProgramApi = (token, userId, programId, adminId, data) => {
  return axios({
    method: "DELETE",
    url: `${API}/admin/remove/program/${userId}/${programId}/${adminId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

// ------------Application manage----------
//Load Application
export const getApplicationApi = (adminId,applicationId,token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/read/application/${applicationId}/${adminId}`,
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

//Application Status list
export const getApplicationStatusApi = (adminId,token) => {
  return axios({
    method: "GET",
    url: `${API}/admin/status-values/${adminId}`,
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

//Update Application
export const updateApplicationApi = (token, adminId,applicationId, data) => {
  // return axios({
  //   method: "PUT",
  //   url: `${API}/admin/update/application/${applicationId}/${adminId}`,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     // "Content-Type": "multipart/form-data;boundary=<calculated when request is sent>"
  //     // "Content-Type": "multipart/form-data; charset=utf-8;boundary --- WebKit193844043-h",
  //     // Accept:"application/json"
  //   },
  //   data: data,
  // })
  return fetch( `${API}/admin/update/application/${applicationId}/${adminId}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:data
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// Delete application
export const deleteApplicationApi = (adminId,applicationId) => {
  return axios({
    method: "DELETE",
    url: `${API}/admin/delete/application/${applicationId}/${adminId}`,
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
