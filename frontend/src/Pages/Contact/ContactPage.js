import React from "react";
import { Grid, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="container-xxl bg-white p-0" style={{marginTop:"80px"}}>
          {/* <!-- Header End --> */}
        <div className="container-xxl py-5 bg-dark page-header-contact mb-5">
            <div className="container my-5 pt-5 pb-4">
                <h1 className="display-3 text-white mb-3 animated slideInDown">Contact</h1>
                <nav aria-label="breadcrumb">
                    {/* <ol className="breadcrumb text-uppercase">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item text-white active" aria-current="page">Contact</li>
                    </ol> */}
                </nav>
            </div>
        </div>
        {/* <!-- Header End --> */}


        {/* <!-- Contact Start --> */}
        <div className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Any concerns? Contact us.</h1>
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row gy-4">
                            <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                                <div className="d-flex align-items-center bg-light rounded p-4">
                                    <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3">
                                        <i className="fa fa-map-marker-alt text-primary"></i>
                                    </div>
                                    <span>123 Street, Kitchener, Ontario</span>
                                </div>
                            </div>
                            <div className="col-md-4 wow fadeIn" data-wow-delay="0.3s">
                                <div className="d-flex align-items-center bg-light rounded p-4">
                                    <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3">
                                        <i className="fa fa-envelope-open text-primary"></i>
                                    </div>
                                    <span>contact@hously.ca</span>
                                </div>
                            </div>
                            <div className="col-md-4 wow fadeIn" data-wow-delay="0.5s">
                                <div className="d-flex align-items-center bg-light rounded p-4">
                                    <div className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3">
                                        <i className="fa fa-phone-alt text-primary"></i>
                                    </div>
                                    <span>+1 123 345 6789</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <iframe className="position-relative rounded w-100 h-100"
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=kitchener+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            frameborder="0" allowfullscreen="" aria-hidden="false"
                            tabindex="0"></iframe>
                    </div>
                    <div className="col-md-6">
                        <div className="wow fadeInUp" data-wow-delay="0.5s">
                            <p className="mb-4">Fill the contact form to contact us.</p>
                            <form>
                                <div className="row g-3">
                                <Grid container spacing={2} className="mb-3">
                                    <Grid item md={6}>
                                        <TextField
                                        label="Your name"
                                        variant="standard"
                                        fullWidth
                                        name="Name"
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField
                                        label="Email"
                                        variant="standard"
                                        fullWidth
                                        name="email"
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <TextField
                                        label="Subject"
                                        variant="standard"
                                        fullWidth
                                        name="subject"
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <TextField
                                        label="Message"
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="message"
                                        />
                                    </Grid>
                                </Grid>
                                    <Stack direction="row" spacing={2} alignContent={"center"} style={{justifyContent: "center"}}>
                                        <Button variant="outlined" startIcon={<DeleteIcon />}>
                                        Delete
                                        </Button>
                                        <Button variant="contained" endIcon={<SendIcon />}>
                                        Send
                                        </Button>
                                    </Stack>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Contact End --> */}
    </div>
    );
};

export default ContactPage;
