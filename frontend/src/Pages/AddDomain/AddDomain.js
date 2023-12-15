import {
  Button,
  CircularProgress,
  circularProgressClasses,
  Container,
  Divider,
  IconButton,
  Pagination,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./AddDomain.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ErrorIcon from "@mui/icons-material/Error";
import {
  deleteDomainAPI,
  getDomainListAPI,
  postDomainAPI,
} from "./AddDomainAPI/AddDomainAPI";
import { isAuthenticated } from "../../auth";

const useStyles = makeStyles({
  textField: {
    fontSize: "15px",
    width: "70%",
  },
  btn: {
    marginLeft: "7px",
    width: "13%",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
  },
  dltbtn: {
    padding: "0",
    color: "#d62020",
    float: "right",
    "&:hover": {
      color: "#b31b1b",
    },
  },
});

const AddDomain = () => {
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ domain: "" });
  const [domainList, setDomainList] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const { domain } = values;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    getDomains();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const isValid = formValidation();
    if (isValid) {
      postDomainAPI(adminId, token, { domainName: domain }).then((res) => {
        console.log(res);
        setValues({
          domain: "",
        });
        getDomains();
        alert("Service Added");
      });
    }
    setIsLoading(false);
  };

  const formValidation = () => {
    const error = {};
    let isValid = true;
    if (domain === "") {
      error.domainRequired = "Please Enter a Service.";
      isValid = false;
    }
    setError(error);
    return isValid;
  };

  const getDomains = () => {
    getDomainListAPI(adminId, token).then((res) => {
      const { data } = res;
      console.log(data);
      setDomainList(data);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteDomain = (domainId) => {
    let del = window.confirm(
      "Do you really want to delete this Service? This process cannot be undone."
    );
    if (del === true) {
      deleteDomainAPI(adminId, domainId, token).then((res) => {
        console.log(res);
        handleClose();
        getDomains();
      });
    } else {
      console.log("Cancelled");
    }
  };

  const classes = useStyles();
  return (
    <div className="add-domain-main-parent">
      <div className="add-domain-main">
        <div className="domain-title-container">
          <h1 className="add-domain-title">Add Service</h1>
        </div>
        <div className="adding-container">
          <Container maxWidth="md" style={{marginTop:"100px"}}>
            <form style={{ width: "100%", display: "flex", marginBottom: "0" }}>
              <TextField
                label="Service"
                color="success"
                className={classes.textField}
                value={domain}
                onChange={handleChange("domain")}
                autoComplete="off"
                required
              />
              {isLoading ? (
                <CircularProgress
                  color="success"
                  disableShrink
                  sx={{
                    padding: "7px",
                    animationDuration: "550ms",
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: "round",
                    },
                  }}
                  size={50}
                  thickness={4}
                />
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  disableTouchRipple
                  className={classes.btn}
                  onClick={clickSubmit}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              )}
            </form>
            <br />
            <div style={{ width: "100%", display: "flex" }}>
              {Object.keys(error).map((key) => {
                return (
                  <p
                    style={{
                      fontFamily: "sans-serif",
                      color: "#dc3545",
                      marginBottom: "0",
                      marginLeft: "1rem",
                      marginTop: "0",
                      fontSize: "1.05rem",
                    }}
                  >
                    <i class="fas fa-exclamation-triangle"></i> {error[key]}
                  </p>
                );
              })}
            </div>
          </Container>
        </div>
        <Divider style={{ margin: "12px 2px" }} />
        <Container maxWidth="sm">
          {/* Displays the list of added domains */}
          {domainList.length > 0 ? (
            <div className="domain-list-container">
              <div className="domain-list-head">
                <h1 className="domain-list-title">Available Services</h1>
              </div>
              <div>
                {domainList
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((value) => (
                    <Box className="domain-box">
                      <span className="domain">{value.domainName}</span>
                      <IconButton
                        className={classes.dltbtn}
                        disableTouchRipple
                        onClick={() => deleteDomain(value._id)}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Box>
                  ))}
              </div>
              <Pagination
                count={Math.ceil(domainList?.length / 10)}
                showFirstButton
                showLastButton
                style={{
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 450);
                }}
              />
            </div>
          ) : (
            <div className="domain-list-container">
              <div className="domain-list-head">
                <h1 className="domain-list-title">Service List is Empty</h1>
              </div>
              <Container
                sx={{ width: "100%", textAlign: "center", color: "gray" }}
              >
                <ErrorIcon fontSize="large" />
              </Container>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AddDomain;
