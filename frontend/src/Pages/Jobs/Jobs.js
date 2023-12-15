import React, { useEffect, useState } from "react";
import "./Jobs.css";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import moment from "moment";
import { getAllProgramsApi } from "./JobsAPI";
import Loading from "../Common/Loading/Loading";
import NoData from "../Common/NoData/NoData";

const JobProviderProfile = (props) => {
  const { history } = props;
  const adminId = isAuthenticated().admin._id;
  const { token } = isAuthenticated();
  const [allPrograms, setAllPrograms] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    getAllPrograms();
  }, []);

  const getAllPrograms = () => {
    getAllProgramsApi(token, adminId).then((res) => {
      const { data } = res;
      console.log("data", data);
      setAllPrograms(data);
      setPageLoading(false);
    });
  };

  return (
    <div className="provider-profile-main-parent">
      <Container>
        <div className="provider-profile-container">
          <div className="provider-profile-header">
            <Typography variant="h3" className="text-center mb-5" gutterBottom>
              Find Your Jobs Here 
            </Typography>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              size="small"
              className="provider-profile-search"
              // Add search functionality here
            />
          </div>
          {allPrograms.length === 0 && pageLoading && <Loading />}
          {allPrograms.length === 0 && !pageLoading && <NoData />}
          {allPrograms.length > 0 &&
            allPrograms.map((data, index) => (
              
              
              // <Card
              //   key={index}
              //   sx={{ minWidth: "95%", mt: 3, backgroundColor: "#F1F2F7" }}
              // >
                <div className="job-item p-4 mb-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-md-8 d-flex align-items-center">
                            <div className="text-start ps-4">
                            
                              <p>
                                <h5 className="mb-3">{data.title}</h5>
                              
                                
                                <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{data.place}</span>
                                <span className="text-truncate me-3"><i className="fa fa-language text-primary me-2"></i>{data.language}</span>
                                <span className="text-truncate me-0"><i className="far fa-money-bill-alt text-primary me-2"></i>{data.Salary}</span>
                              </p>
                              
                              </div>
                          </div>
                        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center" style={{paddingRight: 30}}>
                            <div className="d-flex mb-3">
                                <Link
                                  to={`/user/apply/job/${data._id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ textTransform: "capitalize", mt: 2 }}
                                  >
                                    Apply Now
                                  </Button>
                                </Link>
                            </div>
                            <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>{moment(data.createdAt).fromNow()}</small>
                        </div> 
                    </div>
                </div>
                
            ))}
        </div>
      </Container>
    </div>
  );
};

export default JobProviderProfile;
