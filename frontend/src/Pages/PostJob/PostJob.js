import React, { useEffect, useState } from "react";
import "./PostJob.css";
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { isAuthenticated } from "../../auth";
import { BiErrorCircle } from "react-icons/bi";
import { getDomainApi, getGenderApi, postInternshipApi } from "./PostJobAPI";
import { useHistory } from 'react-router-dom';

const JobProviderProfile = (props) => {
  const history = useHistory();
  // const { history } = props;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [pageLoading, setPageLoading] = useState(true);
  const [listDomain, setListDomain] = useState([]);
  const [genderTypes, setGenderTypes] = useState("");
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    adGender: "",
    adTitle: "",
    adPlace: "",
    adSalary: "",
    adDomain: "",
    adDescription: "",
    adLanguage: "",
    adError: "",
    Success: "",
    loading: false,
  });

  const {
    adGender,
    adTitle,
    adPlace,
    adSalary,
    adDomain,
    adWorkType,
    adDescription,
    adLanguage,
    adError,
    Success,
    loading,
  } = values;

  useEffect(() => {
    getDomains();
    getGenderType();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const getDomains = () => {
    getDomainApi(adminId, token).then((res) => {
      const { data } = res;
      setListDomain(data);
    });
  };

  const getGenderType = () => {
    getGenderApi(adminId, token).then((res) => {
      const { data } = res;
      setGenderTypes(data);
    });
  };

  const postInternship = () => {
    setValues({
      ...values,
      loading: true,
    });
    postInternshipApi(token, adminId, {
      gender: adGender,
      title: adTitle,
      place: adPlace,
      Salary: adSalary,
      domain: adDomain,
      description: adDescription,
      workType: adWorkType,
      language: adLanguage,
    }).then((res) => {
      if (res) {
        if (res.response) {
          setValues({
            ...values,
            adError: res.response.data.error,
          });
        } else if (res.data) {
          setValues({
            adGender: "",
            adTitle: "",
            adPlace: "",
            adSalary: "",
            adDomain: "",
            adDescription: "",
            adLanguage: "",
            Success: "Program posted successfully",
          });
          setValues({
            ...values,
            loading: false,
          });
          handleClick();
          history.push('/user/jobs');
        }
      }
    });
  };

  const showError = () => (
    <div
      style={{
        display: adError ? "" : "none",
        color: "red",
        margin: "0 0 10px",
        textAlign: "left",
      }}
    >
      <BiErrorCircle style={{ margin: "0 5px -2px 0" }} />
      {adError}
    </div>
  );

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showSuccess = () => (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%", backgroundColor: "#003300", color: "white" }}
      >
        {Success}
      </Alert>
    </Snackbar>
  );

  return (
    <Container>
      <div className="provider-postad-main-parent" style={{marginTop: 60}}>
        <h2 className="provider-profile-left-heading" style={{fontSize: 34}}>
          Post A Job
        </h2>
        {showError()}
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Job Title"
                className="provider-postad-textfield"
                fullWidth
                value={adTitle}
                onChange={handleChange("adTitle")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-label" variant="filled">
                  Preferred Gender
                </InputLabel>
                <Select
                  variant="filled"
                  labelId="type-label"
                  id="Gender"
                  value={adGender}
                  onChange={handleChange("adGender")}
                >
                  {genderTypes &&
                    genderTypes.map((data, index) => (
                      <MenuItem key={index} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Place"
                className="provider-postad-textfield"
                fullWidth
                value={adPlace}
                onChange={handleChange("adPlace")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Salary"
                className="provider-postad-textfield"
                fullWidth
                value={adSalary}
                onChange={handleChange("adSalary")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Preferred Language"
                className="provider-postad-textfield"
                fullWidth
                value={adLanguage}
                onChange={handleChange("adLanguage")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="domain-label" variant="filled">
                  Service
                </InputLabel>
                <Select
                  variant="filled"
                  labelId="domain-label"
                  id="domain"
                  value={adDomain}
                  onChange={handleChange("adDomain")}
                >
                  {listDomain.map((value, index) => (
                    <MenuItem key={index} value={value._id}>
                      {value.domainName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="filled"
                label="Job Description"
                multiline
                rows={4}
                className="provider-postad-textfield"
                fullWidth
                value={adDescription}
                onChange={handleChange("adDescription")}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ textTransform: "capitalize" }}
                onClick={postInternship}
              >
               <h4 style={{color: "white"}}>{loading ? "Posting..." : "Post Job"}</h4>
              </Button>
            </Grid>
          </Grid>
        </form>
        {showSuccess()}
      </div>
    </Container>
  );
};

export default JobProviderProfile;
