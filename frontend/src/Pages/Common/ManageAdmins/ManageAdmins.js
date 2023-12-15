import { Backdrop, Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdClose, MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import { BiErrorCircle } from "react-icons/bi";
import { isAuthenticated } from '../../../auth';
import { getAdminTypesApi } from '../../General/Pages/AddAdmin/AddAdminAPI';
import "./ManageAdmins.css"
import { getAdminApi, getAdminStatusApi, updateAdminApi } from './ManageAdminsApi';

const ManageAdmins = (props) => {
  const { history } = props
  const adminid = props.match.params.adminId
  const adminId = isAuthenticated().admin._id
  const [edit, setEdit] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [adminType, setAdminType] = useState([])
  const [adminStatus, setAdminStatus] = useState([])
  const [values, setValues] = useState({
    adminNumber: "",
    name: "",
    username: "",
    type: "",
    status: "",
    error: "",
    success: ""
  })
  const { adminNumber, name, username, type, status, error } = values

  useEffect(() => {
    setPageLoading(true)
    loadAdmin()
    getTypes()
    getStatus()
  }, [])

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: "",
      [name]: event.target.value,
    });
  };

  const clickUpdate = (event) => {
    event.preventDefault()
    updateAdminApi(adminid, { name, username, role: type, status }).then(res => {
      if (res.response) {
        setValues({
          ...values,
          error: res.response.data.error
        })
      } else if (res.data) {
        const { data } = res
        console.log(data);
        setEdit(false)
      }
    })
  }

  const loadAdmin = () => {
    getAdminApi(adminid).then(res => {
      if (res.response) {
        setValues({
          ...values,
          error: res.response
        })
      } else if (res.data) {
        const { data } = res
        setValues({
          ...values,
          adminNumber: data.adminNumber,
          name: data.name,
          username: data.username,
          type: data.role,
          status: data.status,
        })
      }
    })
  }

  const getStatus = () => {
    getAdminStatusApi(adminId).then(res => {
      const { data } = res
      setAdminStatus(data)
    })
    setTimeout(() => {
      setPageLoading(false)
    }, 1000);
  }

  const getTypes = () => {
    getAdminTypesApi(adminId).then(res => {
      const { data } = res
      setAdminType(data)
    })
  }

  const showError = () => (
    <div
      style={{
        display: error ? "" : "none",
        color: "red",
        margin: "0 0 20px 0",
        textAlign: "left",
        letterSpacing: "1px",
      }}
    >
      <BiErrorCircle style={{ margin: "0 5px -2px 0" }} />
      {error}
    </div>
  );


  const BlockedAlert = () => (
    <div className="rejection-alert-main">
      Alert : This profile has been blocked.
    </div>
  );

  const showPageLoading = () =>
    pageLoading && (
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <div className="manage-admin-main-parent">
      <Container>
        <div className="manage-admin-main">
          {status && status === "Blocked" ? BlockedAlert() : null}
          <Grid container>
            <Grid item xs={5} sx={{ mb: 1 }}>
              <Button
                variant="contained"
                color="info"
                sx={{ mb: 1 }}
                onClick={() => history.goBack()}
                startIcon={<IoIosArrowBack />}
                size="small"
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ textTransform: "capitalize" }}
                onClick={() => {
                  setEdit(!edit)
                  setValues({
                    ...values,
                    error: ""
                  })
                }}
                endIcon={edit ? <MdClose /> : <MdModeEditOutline />}
              >
                {edit ? "Cancel" : "Edit    "}
              </Button>
              <Button
                color="error"
                sx={{ textTransform: "capitalize", ml: 1 }}
              // onClick={removeApplication}
              >
                <RiDeleteBinFill fontSize={20} />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  margin: "0 0 20px 0",
                  textTransform: "uppercase",
                  fontSize: "14px",
                  fontWeight: "600",
                  paddingTop: "10px",
                }}
              >
                Admin ID :
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  {adminNumber}
                </span>
              </div>
            </Grid>
          </Grid>

          {/* Applicant Name */}
          <Container maxWidth="sm">
            {showError()}
            {showPageLoading()}
            <Grid container rowSpacing={2} columnSpacing={5}>
              <Grid item sx={12} sx={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="Name"
                  style={{
                    width: "100%",
                    pointerEvents: edit ? "" : "none",
                  }}
                  onChange={handleChange("name")}
                  value={name}
                />
              </Grid>
              <Grid item sx={12} sx={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="Username"
                  style={{
                    width: "100%",
                    pointerEvents: edit ? "" : "none",
                  }}
                  onChange={handleChange("username")}
                  value={username}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="type-label" variant="outlined">
                    Type
                  </InputLabel>
                  <Select
                    variant="outlined"
                    labelId="type-label"
                    id="type"
                    style={{
                      pointerEvents: edit ? "" : "none",
                    }}
                    label="Type"
                    onChange={handleChange("type")}
                    value={type}
                  >
                    {adminType &&
                      adminType.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="admin-status-label" variant="outlined">
                    Admin Status
                  </InputLabel>
                  <Select
                    variant="outlined"
                    labelId="admin-status-label"
                    id="admin-status"
                    style={{
                      pointerEvents: edit ? "" : "none",
                    }}
                    label="Admin Status"
                    onChange={handleChange("status")}
                    value={status}
                    sx={{
                      color:
                        (status === "Blocked" && "red") ||
                        (status === "Active" && "green")
                    }}
                  >
                    {adminStatus &&
                      adminStatus.map((data, index) => (
                        <MenuItem key={index} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}></Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    margin: "10px 0 20px",
                    width: "50%",
                    textTransform: "capitalize",
                    display: edit ? "" : "none",
                  }}
                  onClick={clickUpdate}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Container>

        </div>
      </Container>
    </div>
  )
};

export default ManageAdmins;
