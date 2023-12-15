import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="container-xxl bg-white p-0" style={{marginTop:"80px"}}>
    {/* // <!-- Header End --> */}
        <div className="container-xxl py-5 bg-dark page-header mb-5">
            <div className="container my-5 pt-5 pb-4">
                <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
                <nav aria-label="breadcrumb">
                    {/* <ol className="breadcrumb text-uppercase">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                    </ol> */}
                </nav>
            </div>
        </div>
        {/* // <!-- Header End --> */}

        {/* // <!-- About Start --> */}
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div className="row g-0 about-bg rounded overflow-hidden">
                            <div className="col-12 text-start">
                                <img className="img-fluid w-100" src="/img/about-1.jpeg" alt="The Team meeting image" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 className="mb-4">We help you find great jobs and discover talent</h1>
                        <p className="mb-4">Explore diverse job opportunities tailored to your skills, and for employers, discover top-tier talent effortlessly. Join us today for a seamless, success-driven job search or recruitment experience! </p>
                        <p>Uncover the perfect job match or find exceptional talent effortlessly with our cutting-edge platform. Seamlessly integrating advanced features for both job seekers and employers, Hously is committed to making every career journey remarkable. </p>
                        <a className="btn btn-primary py-3 px-5 mt-3" href="/contact">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- About End --> */}
    </div>
    );
};

export default AboutPage;
