import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="container-xxl bg-white p-0">
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
                                <img className="img-fluid w-100" src="/img/about-1.jpeg" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 className="mb-4">We Help To Get The Best Job</h1>
                        <p className="mb-4">Find Your Next Career Opportunity Looking to take your career to the next level? Look no further than Hously. As a leading staffing agency, we specialize in matching talented professionals like you with the right opportunities to achieve your career goals. </p>
                        <p className="mb-4">We provide customized staffing solutions with "Ethics First" philosophy. Our focus is on building rewarding careers and a thriving work environment. Let's make a positive impact in our communities together.</p>
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
