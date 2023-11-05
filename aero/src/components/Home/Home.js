import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aero from "../../images/logo.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AboutMe from "./About";
import Cards from "./card";
import "./Home.css";
import Popup from "./popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import darkBg1 from "../../images/darkBg1.png";
import darkBg2 from "../../images/darkBg2.png";
import darkBg4 from "../../images/darkBg4.jpg";
import { useAuth } from "../firebaseAuth/authContext";
import FloatingButton from "../Floatingbutton";

const Home = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleRegister = async () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate("/courses");
    }
  };

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2023-12-08T17:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = targetDate - now;

      // Check if the timeRemaining is less than 0, set countdown to 0 and clear the interval
      if (timeRemaining <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Simulate loading time (2 seconds in this example)
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="top">
      <Navbar />
      <div
        className="container vh-100"
        style={{
          backgroundImage: `url(${darkBg1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          maxWidth: "100%",
        }}
      >
        <div className="row justify-content-center align-items-center  h-100">
          <div className="text-center small-device col-md-6 ">
            <div>
              <img
                src={Aero}
                className="img-fluid d-block mt-4"
                alt="Not found"
              />
            </div>
            <div className="text-white">
              <div className="row align-items-center">
                <div className="col-12">
                  <div
                    className="mt-2 fw-bold fs-1 title"
                    style={{ fontFamily: "'Iceland', sans-serif" }}
                  >
                    Watch Aerophilia 2022
                    <FontAwesomeIcon
                      icon={faPlayCircle}
                      className="px-3"
                      onClick={() => setButtonPopup(true)}
                      style={{
                        cursor: "pointer",
                        height: "30px",
                        width: "30px",
                      }}
                    />
                  </div>
                  <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <iframe
                      width="1100"
                      height="615"
                      src="https://www.youtube.com/embed/eMaGnlKiICY?si=SRF4UmW7VAiDXyjN"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </Popup>
                  <div onClick={handleRegister}>
                    <button className="glow-on-hover p-2 mt-3 fw-bold">
                      Register Now!{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6  text-center">
            <div className="p-4">
              {/* Countdown timer in a row with 3D style */}
              <h1
                className="title text-white fw-bold display-5"
                style={{ fontFamily: "'Iceland', sans-serif" }}
              >
                Starting in
              </h1>
              <div className="countdown-timer text-center">
                {loading ? (
                  <>
                    <div className="countdown-item d-flex p-3 align-items-center">
                      <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />
                    </div>
                    <div className="countdown-item d-flex p-3 align-items-center">
                      <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />
                    </div>
                    <div className="countdown-item d-flex p-3 align-items-center">
                      <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />
                    </div>
                    <div className="countdown-item d-flex p-3 align-items-center">
                      <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="countdown-item d-flex align-items-center">
                      <span className="countdown-number">{countdown.days}</span>
                      <span className="countdown-label ms-2">Days</span>
                    </div>
                    <div className="countdown-item d-flex align-items-center">
                      <span className="countdown-number">
                        {countdown.hours}
                      </span>
                      <span className="countdown-label ms-2">Hours</span>
                    </div>
                    <div className="countdown-item d-flex align-items-center">
                      <span className="countdown-number">
                        {countdown.minutes}
                      </span>
                      <span className="countdown-label ms-2">Mins</span>
                    </div>
                    <div className="countdown-item d-flex align-items-center">
                      <span className="countdown-number">
                        {countdown.seconds}
                      </span>
                      <span className="countdown-label ms-2">Secs</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${darkBg2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          maxWidth: "100%",
        }}
      >
        <Cards />
      </div>
      <div
        style={{
          backgroundImage: `url(${darkBg4})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          maxWidth: "100%",
        }}
      >
        <AboutMe />
      </div>
      <FloatingButton/>
      <Footer />
    </div>
  );
};

export default Home;
