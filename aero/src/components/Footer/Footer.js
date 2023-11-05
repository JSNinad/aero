// import "./Login.css";
import "./Footer.css";
import logo from "../../images/logo.png";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    const target = document.getElementById("top");
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="container-fluid container-fluid-custom">
        <div className="row">
          <div className="col-md-4  col-sm-12 navigate">
            <div
              className="card card-footer p-5"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <div className="card-header card-header-custom ">REACH US</div>
              <img src={logo} className="card-img-top " alt="..."></img>
              <div className="card-body">
                <p className="card-text">
                  Sahyadri College of Engineering and Management Mangaluru,
                  Dakshina Kannada District, Karnataka, India - 575007
                </p>
                <div className="icons">
                  <a
                    href="https://instagram.com/aerophilia_2023?igshid=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="footer-icon" />
                  </a>
                  <a
                    href="https://youtu.be/3s9FAEonO2Y"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiYoutube className="footer-icon" />
                  </a>
                  <a href="mailto:example@gmail.com">
                    <FiMail className="footer-icon" />
                  </a>
                  <a href="tel:+919480382738">
                    <FiPhoneCall className="footer-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4  col-sm-12 links">
            <div className="card card-footer p-5">
              <div className="card-header card-header-custom">NAVIGATE</div>
              <ul className="list-group list-group-flush p-3">
                <li className="list-group-item ">
                  <Link
                    to="/"
                    className="text-decoration-none text-white "
                    onClick={scrollToTop}
                  >
                    Home
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link
                    to="/courses"
                    className="text-decoration-none text-white"
                    onClick={scrollToTop}
                  >
                    Events
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link
                    to="/gallery"
                    className="text-decoration-none text-white"
                    onClick={scrollToTop}
                  >
                    Gallery
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link
                    to="https://challengers.netlify.app/"
                    className="text-decoration-none text-white"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4  col-sm-12 reach-us">
            <div className="card card-footer p-5">
              <div className="card-header card-header-custom">LINKS</div>
              <ul className="list-group list-group-flush p-3">
                {/* <li className="list-group-item"><a href="./../../pages/dummy.txt">dummy</a></li> */}
                <li className="list-group-item">
                  <Link
                    to="/privacy-policy"
                    className="text-decoration-none text-white "
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li className="list-group-item">
                  <Link
                    to="/refund-policy"
                    className="text-decoration-none text-white "
                  >
                    Refund Policy
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link
                    to="terms-condition"
                    className="text-decoration-none text-white "
                  >
                    Terms and conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div style={{marginBottom:"3.5rem"}}> */}
          {/* <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.63896684975!2d74.92280267523284!3d12.866579587439203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba358ff28ef6cf3%3A0xe93953598f53c53c!2sSahyadri%20College%20of%20Engineering%20%26%20Management%20(Autonomous)!5e0!3m2!1sen!2sin!4v1698382918467!5m2!1sen!2sin"
            width="100%"
            height="700"
            style={{ border: 0, borderRadius: '15px'}} 
            allowFullScreen=""
            loading="lazy"
          ></iframe> */}
          {/* </div> */}
          <div
            className="card-text copyright"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <center style={{ marginTop: "3.5rem" }}>
              &copy; 2023 Aerophilia. All rights reserved.
            </center>
            <center>Developed by TEAM CHALLENGERS</center>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
