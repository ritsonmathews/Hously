import React from "react";
import ReactDOM from "react-dom";
import "./HomePage.css";
import { CoverageMap } from "istanbul-lib-coverage";
// import './owl.css';

export const HomePage = () => {
  return (
    <div class="container-xxl bg-white p-0">
      {/* <!-- Search Start --> */}
      <div
        class="container-fluid bg-primary mb-5 wow fadeIn elementor-background"
        data-wow-delay="0.1s"
      >
        <div class="elementor-background-overlay">
          <div class="container">
            <div class="row g-2">
              <div class="col-md-12">
                <h2 class="elementor-heading-title">
                  Upload your{" "}
                  <span style={{ color: "#303AF7" }}>Resume &amp; find</span>{" "}
                  your dream Job
                </h2>
              </div>
            </div>
            <div class="row g-2 input-field">
              <div class="col-md-10">
                <div class="row g-2">
                  <div class="col-md-4">
                    <input
                      type="text form-control"
                      class="border-0"
                      placeholder="Keyword"
                    />
                  </div>
                  <div class="col-md-4">
                    <select class="form-select border-0">
                      <option selected>Category</option>
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                      <option value="3">Category 3</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <select class="form-select border-0">
                      <option selected>Location</option>
                      <option value="1">Location 1</option>
                      <option value="2">Location 2</option>
                      <option value="3">Location 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <button class="btn border-0 w-100 search-btn">Search</button>
              </div>
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
                  <img class="img-fluid w-100" src="/img/about-img-1.jpeg" />
                </div>
                <div class="col-6 text-start">
                  <img
                    class="img-fluid"
                    src="/img/about-img-2.jpeg"
                    style={{ width: 205, marginTop: 15 }}
                  />
                </div>
                <div class="col-6 text-end">
                  <img
                    class="img-fluid"
                    src="/img/about-img-3.jpeg"
                    style={{ width: 205 }}
                  />
                </div>
                <div class="col-6 text-end">
                  <img class="img-fluid w-100" src="/img/about-img-4.jpeg" />
                </div>
              </div>
            </div>
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1 class="mb-4">
                We Help To Get The Best Job And Find A Talent
              </h1>
              <p class="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p>
                <i class="fa fa-check text-primary me-3"></i>Tempor erat elitr
                rebum at clita
              </p>
              <p>
                <i class="fa fa-check text-primary me-3"></i>Aliqu diam amet
                diam et eos
              </p>
              <p>
                <i class="fa fa-check text-primary me-3"></i>Clita duo justo
                magna dolore erat amet
              </p>
              <a class="btn btn-primary py-3 px-5 mt-3" href="">
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
          <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Explore By Category
          </h1>
          <div class="row g-4">
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-mail-bulk text-primary mb-4"></i>
                <h6 class="mb-3">Marketing</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-headset text-primary mb-4"></i>
                <h6 class="mb-3">Customer Service</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-user-tie text-primary mb-4"></i>
                <h6 class="mb-3">Human Resource</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-tasks text-primary mb-4"></i>
                <h6 class="mb-3">Project Management</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-chart-line text-primary mb-4"></i>
                <h6 class="mb-3">Business Development</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-hands-helping text-primary mb-4"></i>
                <h6 class="mb-3">Sales & Communication</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-book-reader text-primary mb-4"></i>
                <h6 class="mb-3">Teaching & Education</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <a class="cat-item rounded p-4" href="">
                <i class="fa fa-3x fa-drafting-compass text-primary mb-4"></i>
                <h6 class="mb-3">Design & Creative</h6>
                <p class="mb-0">123 Vacancy</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Category End --> */}

      {/* <!-- Testimonial Start --> */}
      <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
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
      </div>
      {/* <!-- Testimonial End --> */}
    </div>
  );
};
