import React from "react";
import Img1 from "../../images/sahlogobg.png";
import Img2 from "../../images/challengers-logo.png";
import Img3 from "../../images/challengers-logo-text.png";

// import Adidas from "../../images/adidas.png";
// import Castore from "../../images/castore.png";
// import Ram from "../../images/Ram.png";
// import Udemy from "../../images/udemy.png";
// import Ninja from "../../images/ninja.png";
// import Geeks from "../../images/geeks.jpg";
// import FreeCodeCamp from "../../images/FCC.png";
// import Isro from "../../images/isro.png";
import { Zoom, Slide } from "react-awesome-reveal";

function About() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Zoom effect="fadeInUp" effectOut="fadeOutLeft">
        <div className="container">
          <h1
            className="text-center mb-5 mt-3  text-white fw-bold display-2"
            style={{ fontFamily: "'Iceland', sans-serif" }}
          >
            About
          </h1>
          <div className="row align-items-center">
            <div className="col-md-3  col-sm-12 text-center mb-4">
              <img
                src={Img1}
                alt="Left Image"
                className="img-fluid rounded"
                style={{ maxHeight: "10rem", margin: "0 auto" }}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="content-container  tilted-container p-3">
                <p
                  className=" txt-col "
                  style={{
                    fontFamily: "'Iceland', sans-serif",
                    color: "#f1f1f1",
                    textAlign: "justify",
                    lineHeight: "1.4rem",
                  }}
                >
                  <span className="text-grad">Aerophilia</span> is a National
                  level Techno-Cultural fest, conducted at Sahyadri College of
                  Engineering and Management in association with{" "}
                  <span className="text-grad">ECE Department</span> for students
                  aspiring to be extraordinary. It’s a 3-day event spanning the
                  weekend with an exciting competition involving{" "}
                  <span className="text-grad">
                    Aeromodelling, Drone race, RC Bot events,{" "}
                  </span>
                  and all things out of this world! There are also fun-filled
                  activities and Hackathons. The motive behind organizing such
                  an event is to spread and teach the young talented minds to
                  explore new areas of{" "}
                  <span className="text-grad">technology</span> and{" "}
                  <span className="text-grad">aeromodelling</span> to foster the
                  nation's development.
                  <br />
                  <span className="text-grad">
                    Sahyadri College of Engineering and Management (SCEM)
                  </span>
                  , Mangaluru, was established in 2007. It is one of the premier
                  technological institutions incubating quality and value-based
                  education through the innovative teaching-learning process for
                  the holistic development of the students. The In-house
                  Industries, Startups, and Launchpads are the mainstay of the
                  College. The institute comprises around 250 well-qualified and
                  experienced Faculty and Staff members to mentor and guide
                  young talents. Sahyadri promotes the idea of{" "}
                  <span className="text-grad">Project-Based</span> Learning
                  through various activities and initiatives in association with
                  various in-house industries, which helps the students to
                  improve their expertise.
                </p>
              </div>
            </div>
            <div className="col col-md-3  ">
              <div className="  col-sm-12  text-center ">
                <img
                  src={Img2}
                  alt="Right Image"
                  className="img-fluid rounded"
                  style={{ maxHeight: "8rem", margin: "0 auto" }}
                />
              </div>
              <div className=" col-sm-12 text-center mb-4">
                <img
                  src={Img3}
                  alt="Right Image"
                  className="img-fluid rounded"
                  style={{ maxHeight: "5rem", margin: "0 auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Zoom>
      {/* <Zoom>
        <div class="container">
          <h1
            className="text-center mb-5 mt-3  text-white fw-bold display-2"
            style={{ fontFamily: "'Iceland', sans-serif" }}
          >
            Sponsors
          </h1>
          <div class="row move justify-content-center">
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-3"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={Adidas} alt="Sponsor 1" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-4"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={Castore} alt="Sponsor 2" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-4"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={Ram} alt="Sponsor 3" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-4"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={Udemy} alt="Sponsor 4" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-4"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={Ninja} alt="Sponsor 4" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-4"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={Geeks} alt="Sponsor 4" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-4"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={FreeCodeCamp} alt="Sponsor 4" class="img-fluid" />
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                class="pentagon-logo mt-4"
                style={{ height: "250px", width: "250px" }}
              >
                <img src={Isro} alt="Sponsor 4" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </Zoom> */}
      <div className=" d-flex justify-content-center align-items-center mb-5 mt-3 p-5">
        <Slide>
          <div
            className="text-center p-4 content-container "
            style={{
              background: " rgba(25, 25, 17, 0.222)",
              fontFamily: "'Iceland', sans-serif",
            }}
          >
            <h1 className="fw-bold fs-4 text-grad ">Download RuleBook</h1>
            <h1 className="fw-bold fs-4">
              <span className="txt-col">Details and Schedule of</span>
              <span className="text-grad"> Aerophilia 2023</span>
            </h1>
            <button className="btn btn-sm text-white glow-on-hover fw-bold fs-4">
              RuleBook
            </button>
          </div>
        </Slide>
      </div>
    </div>
  );
}

export default About;
