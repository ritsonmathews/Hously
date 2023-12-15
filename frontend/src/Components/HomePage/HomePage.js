import React from "react";
import ReactDOM from "react-dom";
import "./HomePage.css";
import { CoverageMap } from "istanbul-lib-coverage";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Container } from "@mui/material";
// import './owl.css';

export const HomePage = () => {
  return (


    <div class="container-xxl bg-white p-0 text-center">
    {/* <!-- Search Start --> */}
    <div
      class="container-fluid bg-primary mb-5 wow fadeIn elementor-background"
      data-wow-delay="0.1s"
    >
      <div class="elementor-background-overlay">
        <div class="container">
          <div class="row g-2">
            <div class="col-md-12">
              <h1 class="elementor-heading-title">
                Welcome to{" "}
                <span style={{ color: "#303AF7", textShadow: "-1px 0 #FFF, 0 1px #FFF, 1px 0 #FFF, 0 -1px #FFF" }}>HOUSLY</span>{" "}
                <div>Your Premier Home Services Job Board!</div>
              </h1>
            </div>
          </div>
          
            <div class="col-md-12">
            <a class="btn btn-primary py-2 px-4 mt-2" href="/login">
              Get Started
            </a>
            </div>
        </div>
      </div>
    </div>
    {/* <!-- Search End --> */}

    {/* <!-- About Start --> */}
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div class="row g-0 about-bg rounded overflow-hidden">
              <div class="col-6 text-start">
                <img class="img-fluid w-100" src="https://images.pexels.com/photos/5163419/pexels-photo-5163419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Man Gardening"/>
              </div>
              <div class="col-6 text-start">
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/634007/pexels-photo-634007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  style={{ width: 205, marginTop: 15 }} alt="Man Cleaning Windows"
                />
              </div>
              <div class="col-6 text-end">
                <img
                  class="img-fluid"
                  src="https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  style={{ width: 205 }} alt="Person Walking Dogs"
                />
              </div>
              <div class="col-6 text-end">
                <img class="img-fluid w-100" src="https://images.pexels.com/photos/3769999/pexels-photo-3769999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Woman Preping in Kitchen"/>
              </div>
            </div>
          </div>
          <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 class="mb-4">
            Find Your Perfect Match for Home Services - Anytime, Anywhere!
            </h1>
            <p class="mb-4">
            Are you a skilled handyman, cleaning maestro, culinary expert, fixer-upper, painting pro, pet enthusiast, gardening guru, or laundry whiz? Or, are you a homeowner seeking reliable and talented professionals to take care of your household chores? Look no further than HOUSLY – your one-stop destination for connecting skilled individuals with homeowners for all their home service needs.
            </p>
            {/* <p>
              <i class="fa fa-check text-primary me-3"></i>Smart Matching Solutions
            </p>
            <p>
              <i class="fa fa-check text-primary me-3"></i>Connecting Careers Efficiently
            </p>
            <p>
              <i class="fa fa-check text-primary me-3"></i>Efficient Talent Discovery
            </p> */}
            <a class="btn btn-primary py-3 px-5 mt-3" href="#explore">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- About End --> */}

    {/* <!-- Category Start --> */}
<div class="container-xxl py-5">
<div class="container">
  <h1 id="explore" class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
    Explore By Category
  </h1>
  <div class="row g-4">
    {/* Handyman Heaven */}
    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
      <a class="cat-item rounded p-4" href="">
        <i class="fa fa-3x fa-tools text-primary mb-4"></i>
        <h6 class="mb-3">Handyman Heaven</h6>
        <p class="mb-0 category-description">From fixing leaky faucets to tackling major home repairs, our platform is buzzing with opportunities for skilled handymen to showcase their expertise.</p>
      </a>
    </div>

    {/* Cleaning Connoisseurs */}
    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
      <a class="cat-item rounded p-4" href="">
        <i class="fa fa-3x fa-broom text-primary mb-4"></i>
        <h6 class="mb-3">Cleaning Connoisseurs</h6>
        <p class="mb-0 category-description">If you have a passion for making spaces shine, join HOUSLY and connect with homeowners in need of regular or deep cleaning services.</p>
      </a>
    </div>

    {/* Kitchen Wizards */}
    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
      <a class="cat-item rounded p-4" href="">
        <i class="fa fa-3x fa-utensils text-primary mb-4"></i>
        <h6 class="mb-3">Kitchen Wizards</h6>
        <p class="mb-0 category-description">Are you a culinary maestro? Homeowners are searching for talented cooks to create delicious meals in the comfort of their own kitchens.</p>
      </a>
    </div>

    {/* Pet Care Pros */}
    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
      <a class="cat-item rounded p-4" href="">
        <i class="fa fa-3x fa-paw text-primary mb-4"></i>
        <h6 class="mb-3">Pet Care Pros</h6>
        <p class="mb-0 category-description">If you have a love for furry friends, homeowners are seeking reliable pet care professionals for walks, feeding, and companionship.</p>
      </a>
    </div>

    {/* Garden Gurus */}
    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
      <a class="cat-item rounded p-4" href="">
        <i class="fa fa-3x fa-seedling text-primary mb-4"></i>
        <h6 class="mb-3">Garden Gurus</h6>
        <p class="mb-0 category-description">Bring your green thumb to HOUSLY and connect with homeowners in need of expert gardening services to beautify their outdoor spaces.</p>
      </a>
    </div>

    {/* Laundry Legends */}
    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
      <a class="cat-item rounded p-4" href="">
        <i class="fa fa-3x fa-tshirt text-primary mb-4"></i>
        <h6 class="mb-3">Laundry Legends</h6>
        <p class="mb-0 category-description">Assist homeowners by utilizing your expertise in laundering, ironing, and neatly folding clothing to alleviate their laundry challenges.</p>
      </a>
    </div>
  </div>
</div>
</div>
{/* <!-- Category End --> */}



    {/* <!-- Testimonial Start --> */}
    {/* <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div class="container">
        <h1 class="text-center mb-5">Testimonials</h1>
        <div class="owl-carousel testimonial-carousel">
          <div class="testimonial-item bg-light rounded p-4">
            <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
              stet amet eirmod eos labore diam
            </p>
            <div class="d-flex align-items-center">
              <img
                class="img-fluid flex-shrink-0 rounded"
                src="img/user-img.png"
                style={{ width: 50, height: 50 }}
              />
              <div class="ps-3">
                <h5 class="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          <div class="testimonial-item bg-light rounded p-4">
            <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
              stet amet eirmod eos labore diam
            </p>
            <div class="d-flex align-items-center">
              <img
                class="img-fluid flex-shrink-0 rounded"
                src="img/user-img.png"
                style={{ width: 50, height: 50 }}
              />{" "}
              <div class="ps-3">
                <h5 class="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          <div class="testimonial-item bg-light rounded p-4">
            <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
              stet amet eirmod eos labore diam
            </p>
            <div class="d-flex align-items-center">
              <img
                class="img-fluid flex-shrink-0 rounded"
                src="img/user-img.png"
                style={{ width: 50, height: 50 }}
              />{" "}
              <div class="ps-3">
                <h5 class="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
          <div class="testimonial-item bg-light rounded p-4">
            <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
            <p>
              Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
              stet amet eirmod eos labore diam
            </p>
            <div class="d-flex align-items-center">
              <img
                class="img-fluid flex-shrink-0 rounded"
                src="img/user-img.png"
                style={{ width: 50, height: 50 }}
              />{" "}
              <div class="ps-3">
                <h5 class="mb-1">Client Name</h5>
                <small>Profession</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    {/* <!-- Testimonial End --> */}
    {/* <!-- How It Works Start --> */}
<div class="container-xxl py-5">
<div class="container">
  <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
    How It Works
  </h1>
  <div class="row g-4">
    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
      <div class="work-step text-center">
        <i class="fa fa-user-circle fa-4x text-primary mb-4"></i>
        <h6 class="mb-3">Create Your Profile</h6>
        <p>Showcase your skills, experience, and expertise on your HOUSLY profile.</p>
      </div>
    </div>
    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.3s">
      <div class="work-step text-center">
        <i class="fa fa-search fa-4x text-primary mb-4"></i>
        <h6 class="mb-3">Browse Opportunities</h6>
        <p>Explore job listings tailored to your skills and preferences.</p>
      </div>
    </div>
    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.5s">
      <div class="work-step text-center">
        <i class="fa fa-comments fa-4x text-primary mb-4"></i>
        <h6 class="mb-3">Connect with Homeowners</h6>
        <p>Message homeowners directly to discuss job details and requirements.</p>
      </div>
    </div>
    <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.7s">
      <div class="work-step text-center">
        <i class="fa fa-check-circle fa-4x text-primary mb-4"></i>
        <h6 class="mb-3">Land the Job</h6>
        <p>Seal the deal and start working on projects that match your expertise.</p>
      </div>
    </div>
  </div>
</div>
</div>
{/* <!-- How It Works End --> */}
  </div>


  );
};