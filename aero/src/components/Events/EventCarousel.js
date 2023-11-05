import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "./Modal";
import "./EventCarousel.css"; // make sure to import your CSS
import Sponsorship from "../../images/Training_sponsors.jpg";

const EventCarousel = ({ events = [], setIsNavbarVisible }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [centerPercentage, setCenterPercentage] = useState(33);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event

  // a function to handle window resize
  const updateCenterPercentage = () => {
    if (window.innerWidth < 768) {
      setCenterPercentage(100); // show 1 card for small devices
    } else if (window.innerWidth < 992) {
      setCenterPercentage(50); // show 2 cards for medium devices
    } else {
      setCenterPercentage(33); // show 3 cards for large devices
    }
  };

  // on component mount, set the event listener for window resizing
  useEffect(() => {
    updateCenterPercentage();
    window.addEventListener("resize", updateCenterPercentage);
    return () => window.removeEventListener("resize", updateCenterPercentage);
  }, []);

  const handleSlideChange = (index) => setActiveIndex(index);

  // Function to open the modal with selected event data
  const openModal = (event) => {
    setIsNavbarVisible(false);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsNavbarVisible(true);
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  if (!events.length) return null;

  return (
    <div>
      <Container fluid className="caro-main">
        <div>
          <h1></h1>
        </div>
        <Row className=" justify-content-center align-items-center mt-5 p-4">
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Carousel
              autoPlay
              interval={3000}
              showThumbs={false}
              showStatus={false}
              stopOnHover={false}
              infiniteLoop
              centerMode
              centerSlidePercentage={centerPercentage}
              onChange={handleSlideChange}
            >
              {events.map((event, i) => (
                <div
                  className={`card-wrapper text-center m-5 p-4 col-lg-9 ${
                    i === activeIndex ? "active" : ""
                  }`}
                  key={i}
                  tabIndex={i + 1}
                  aria-label={`event-card-${i + 1}`}
                >
                  <Card className="content-container w-100 h-100 ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "start",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={event.image}
                        alt={event.smallDesc}
                        aria-label={event.smallDesc}
                        className=""
                        style={{
                          width: "100%",
                          maxHeight: "100%",
                          objectFit: "fill",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                    </div>
                    <Card.Body className="caro-body text-white ">
                      <Card.Title
                        className="fs-4"
                        style={{ textAlign: "center", color: "orange" }}
                      >
                        {event.smallDesc}
                      </Card.Title>
                      <Card.Subtitle
                        className="fs-4"
                        style={{ textAlign: "center" }}
                      >
                        {event.name}
                      </Card.Subtitle>
                      <Card.Text style={{ textAlign: "center" }}>{`${event.date}
                     ${event.time}`}</Card.Text>
                      <div className="d-flex flex-row justify-content-center">
                        <Button
                          className="glow-on-hover button"
                          variant="primary"
                          onClick={() => openModal(event)}
                        >
                          Details
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>

        {/* Render the Modal component if a selected event is available */}
        {isModalOpen && selectedEvent && (
          <Modal data={selectedEvent} closeModal={closeModal} />
        )}
      </Container>
    </div>
  );
};

export default EventCarousel;
