// import React, { useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import EventCarousel from "./EventCarousel";
// import "./EventPage.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import { eventData } from "./eventData";
// import Modal from "./Modal";
// import Footer from "../Footer/Footer";
// import Reveal from "react-awesome-reveal";
// import Darkbg4 from "../../images/darkBg1.png"
// import { keyframes } from "@emotion/react";
// import darkbg5 from '../../images/darkBg5.jpg'
// import { IoIosSearch, IoMdClose } from "react-icons/io";


// // import SkyDive from "../../images/SkyDive.webp"

// const fadeInUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translate3d(-100px,-200px,0);
//   }
//   to {
//     opacity: 1;
//     transform: translate3d(0, 0, 0);
//   }
// `;


// const AllEventsPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const [selectedDay, setSelectedDay] = useState("all");
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
//   const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event
//   const [isNavbarVisible, setIsNavbarVisible] = useState(true);

//   const openModal = (event) => {
//     setSelectedEvent(event);
//     setIsModalOpen(true);

//     }
  

//   // Function to close the modal
//   const closeModal = () => {
//     setSelectedEvent(null);
//     setIsModalOpen(false);
//   };

//   const handleCategoryHover = (category) => {
//     if (category !== "results") {
//       setSelectedCategory(category);
//       setSearchTerm(""); // Clear the search term
//       setShowResults(false); // Hide search results when hovering sub-nav
//       setSelectedDay("all"); // Reset the selectedDay to its initial value (e.g., 'all' or 1 or 2)
//     }
//   };

//   const handleSearch = () => {
//     if (searchTerm) {
//       const filteredEvents = eventData.filter((event) =>
//         event.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(filteredEvents);
//       setSelectedCategory("results"); // Set a new category 'results'
//       setShowResults(true);
//     }
//   };

//   const handleSubNavClick = () => {
//     if (showResults) {
//       setShowResults(false);
//       setSelectedCategory("all");
//       setSearchTerm(""); // Reset the search term
//     } else {
//       handleSearch();
//     }
//   };

//   const categoryHeadings = {
//     all: "All Events",
//     Technical: "Technical",
//     attraction: "Attraction Events",
//   };

//   const handleKeyDown = (event) => {
//     const { key } = event;
//     const categories = Object.keys(categoryHeadings);
//     const currentIndex = categories.indexOf(selectedCategory);

//     if (key === "ArrowRight") {
//       const nextIndex =
//         currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
//       setSelectedCategory(categories[nextIndex]);
//     } else if (key === "ArrowLeft") {
//       const previousIndex =
//         currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
//       setSelectedCategory(categories[previousIndex]);
//     } else if (key === "Enter") {
//       handleSubNavClick(); // Call the search action function on Enter key press
//     }
//   };

//   const handleDayFilter = (day) => {
//     // Handle day filtering when a "Day" button is clicked
//     setSelectedCategory("all");
//     setSelectedDay(day);
//   };

//   const displayedEvents = (
//     selectedCategory !== "all"
//       ? eventData.filter((event) => event.type === selectedCategory)
//       : eventData
//   )
//     .filter((event) =>
//       event.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((event) => selectedDay === "all" || event.day === selectedDay);

//   return (
//     <div id="top ">
//       {isNavbarVisible && !isModalOpen && <Navbar />}


//       <div className="container-fluid all-events-page bg-dark" style={{ background: `url(${Darkbg4})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
//         {/* <h1 className="text-white ">Cards Section</h1> */}
//         <br />
//         <br />
//         <div className="text-center" id="caro">
//           <EventCarousel events={eventData} setIsNavbarVisible={setIsNavbarVisible} />
//         </div>
//         <br />
//         <br />

//         <Container fluid className="sub-main-nav">
//           {/* Search bar */}
//           <Row className="d-flex justify-content-center align-items-center text-center mb-2">
//             <Col xs={12} className="search-bar-container ">
//               <div className="search-bar">
//                 <div className="">
//                   <div className="custom-container mx-5">
//                     <input
//                       type="text"
//                       className="form-control  custom-input"
//                       placeholder="Search by event name"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       onKeyPress={(e) => {
//                         if (e.key === "Enter") {
//                           handleSubNavClick(); // Call the search action function on Enter key press
//                         }
//                       }}
//                     />
//                     <button
//                       className={`btn custom-button ${showResults ? "btn-danger" : "btn-primary"}`}
//                       onClick={handleSubNavClick}
//                     >
//                       {showResults ? <IoMdClose /> : <IoIosSearch />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           </Row>

          
//           <Row className="d-flex flex-column flex-md-row  align-items-center mt-2 p-3">
//             {/* Sub-navigation */}

//             {/* Day navigation (visible below the sub-navigation on all screens) */}
//             <Col  className=" d-flex justify-content-evenly flex-row">
//               <div
//                 className={`d-flex flex-row justify-content-evenly align-items-center fs-2`}
//                 onKeyDown={handleKeyDown}
//                 style={{fontFamily: "'Iceland', sans-serif"}}
//                 role="navigation"
//                 tabIndex="0"
//               >
//                 <ul className="nav flex-row justify-content-evenly align-items-center text-center">
//                 <li className="nav-item">
//                     <button
//                       className={`nav-link category-button btn btn-link ${selectedCategory === 'all' ? "active" : ""}`}
//                       onClick={() => handleCategoryHover('all')}
//                       style={{ marginBottom: "10px", width: "100%" }}
//                     >
//                      All
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link category-button btn btn-link text-light ${selectedDay === "1" ? "active" : ""}`}
//                       onClick={() => handleDayFilter("1")}
//                       style={{ marginBottom: "10px", width: "100%" }}
//                     >
//                       Day 1
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link category-button btn btn-link text-light ${selectedDay === "2" ? "active" : ""}`}
//                       onClick={() => handleDayFilter("2")}
//                       style={{ marginBottom: "10px", width: "100%" }}
//                     >
//                       Day 2
//                     </button>
//                   </li>
                 
//                 </ul>
//               </div>
//             </Col>
//           </Row>

//         </Container>



//         {/* Show heading for the category or search results */}
//         <br /><br />



//         <div className={`heading-class text-center ${showResults && searchResults.length === 0 ? 'vh-100' : ''}`}>
//           <h1>
//             {showResults
//               ? searchResults.length > 0
//                 ? categoryHeadings[selectedCategory]
//                 : "No such event"
//               : selectedDay === "1"
//                 ? "Day 1 Events"
//                 : selectedDay === "2"
//                   ? "Day 2 Events"
//                   : categoryHeadings[selectedCategory]}
//           </h1>
//         </div>

//         {/* Render search results or events */}
//         <br />
//         <Reveal keyframes={fadeInUp} duration={1000} >
//           <div className="col-md-12">
//             <div className=" mx-md-0">
//               <div className="row justify-content-center ">
//                 {(showResults ? searchResults : displayedEvents).map(
//                   (event, index) => (
//                     <div
//                       key={index}
//                       className="col-lg-3 d-flex justify-content-center col-md-4 col-sm-6 col-9 p-4  mx-2 mx-sm-3 rounded my-3 text-center  "
//                       style={{ height: '65vh' }}
//                     >
//                       <div className="card h-100  event-card" style={{
//                         width: "100%",
//                         // maxHeight: "100%",
//                         // height:"100px",

//                         borderRadius: '2rem',
//                         borderTopLeftRadius: '2rem',
//                         borderTopRightRadius: '2rem',
//                         objectFit: "fill",
//                         background: `url("${darkbg5}")`,
//                       }}>
//                         <img
//                           src={event.image}
//                           alt="Event"
//                           className="card-img-top "
//                           style={{
//                             width: "100%",
//                             height: "50%",
//                             objectFit: "fill",
//                             borderTopLeftRadius: '2rem',
//                             borderTopRightRadius: '2rem',
//                           }}
//                         />
//                         <div className="card-body mt-3  text-white">
//                           <h5 className="card-title text-left fs-2"> {event.name}</h5>
//                           <p className="card-text fs-2">
//                             {event.date}  {event.time}
//                           </p>
//                           <button
//                             className="btn glow-on-hover fs-5"
//                             onClick={() => openModal(event)}
//                           >
//                             Details
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </Reveal>
//         {isModalOpen && selectedEvent && (
//           <Modal data={selectedEvent} closeModal={closeModal} />
//         )}
//         <br />
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AllEventsPage;

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import EventCarousel from "./EventCarousel";
import "./EventPage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { eventData } from "./eventData";
import Modal from "./Modal";
import Footer from "../Footer/Footer";
import Reveal from "react-awesome-reveal";
import Darkbg4 from "../../images/darkBg1.png"
import { keyframes } from "@emotion/react";
import darkbg5 from '../../images/darkBg5.jpg'
import { IoIosSearch, IoMdClose } from "react-icons/io";


// import SkyDive from "../../images/SkyDive.webp"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100px,-200px,0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;


const AllEventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedDay, setSelectedDay] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);

    }
  

  // Function to close the modal
  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleCategoryHover = (category) => {
    if (category !== "results") {
      setSelectedCategory(category);
      setSearchTerm(""); // Clear the search term
      setShowResults(false); // Hide search results when hovering sub-nav
      setSelectedDay("all"); // Reset the selectedDay to its initial value (e.g., 'all' or 1 or 2)
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      const filteredEvents = eventData.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredEvents);
      setSelectedCategory("results"); // Set a new category 'results'
      setShowResults(true);
    }
  };

  const handleSubNavClick = () => {
    if (showResults) {
      setShowResults(false);
      setSelectedCategory("all");
      setSearchTerm(""); // Reset the search term
    } else {
      handleSearch();
    }
  };

  const categoryHeadings = {
    all: "All Events",
    Technical: "Technical",
    attraction: "Attraction Events",
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    const categories = Object.keys(categoryHeadings);
    const currentIndex = categories.indexOf(selectedCategory);

    if (key === "ArrowRight") {
      const nextIndex =
        currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
      setSelectedCategory(categories[nextIndex]);
    } else if (key === "ArrowLeft") {
      const previousIndex =
        currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
      setSelectedCategory(categories[previousIndex]);
    } else if (key === "Enter") {
      handleSubNavClick(); // Call the search action function on Enter key press
    }
  };

  const handleDayFilter = (day) => {
    // Handle day filtering when a "Day" button is clicked
    setSelectedCategory("all");
    setSelectedDay(day);
  };

  const displayedEvents = (
    selectedCategory !== "all"
      ? eventData.filter((event) => event.type === selectedCategory)
      : eventData
  )
    .filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) => selectedDay === "all" || event.day === selectedDay);

  return (
    <div id="top ">
      {isNavbarVisible && !isModalOpen && <Navbar />}


      <div className="container-fluid all-events-page bg-dark" style={{ background: `url(${Darkbg4})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        {/* <h1 className="text-white ">Cards Section</h1> */}
        <br />
        <br />
        <div className="text-center" id="caro">
          <EventCarousel events={eventData} setIsNavbarVisible={setIsNavbarVisible} />
        </div>
        <br />
        <br />

        <Container fluid className="sub-main-nav">
          {/* Search bar */}
          <Row className="d-flex justify-content-center align-items-center text-center mb-2">
            <Col xs={12} className="search-bar-container ">
              <div className="search-bar">
                <div className="">
                  <div className="custom-container mx-5">
                    <input
                      type="text"
                      className="form-control  custom-input"
                      placeholder="Search by event name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSubNavClick(); // Call the search action function on Enter key press
                        }
                      }}
                    />
                    <button
                      className={`btn custom-button ${showResults ? "btn-danger" : "btn-primary"}`}
                      onClick={handleSubNavClick}
                    >
                      {showResults ? <IoMdClose /> : <IoIosSearch />}
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          
          <Row className="d-flex flex-column flex-md-row  align-items-center mt-2 p-3">
            {/* Sub-navigation */}

            {/* Day navigation (visible below the sub-navigation on all screens) */}
            <Col  className=" d-flex justify-content-evenly flex-row">
              <div
                className={`d-flex flex-row justify-content-evenly align-items-center fs-2`}
                onKeyDown={handleKeyDown}
                style={{fontFamily: "'Iceland', sans-serif"}}
                role="navigation"
                tabIndex="0"
              >
                <ul className="nav flex-row justify-content-evenly align-items-center text-center">
                <li className="nav-item">
                    <button
                      className={`nav-link category-button btn btn-link ${selectedCategory === 'all' ? "active" : ""}`}
                      onClick={() => handleCategoryHover('all')}
                      style={{ marginBottom: "10px", width: "100%" }}
                    >
                     All
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link category-button btn btn-link text-light ${selectedDay === "1" ? "active" : ""}`}
                      onClick={() => handleDayFilter("1")}
                      style={{ marginBottom: "10px", width: "100%" }}
                    >
                      Day 1
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link category-button btn btn-link text-light ${selectedDay === "2" ? "active" : ""}`}
                      onClick={() => handleDayFilter("2")}
                      style={{ marginBottom: "10px", width: "100%" }}
                    >
                      Day 2
                    </button>
                  </li>
                 
                </ul>
              </div>
            </Col>
          </Row>

        </Container>



        {/* Show heading for the category or search results */}
        <br /><br />



        <div className={`heading-class text-center ${showResults && searchResults.length === 0 ? 'vh-100' : ''}`}>
          <h1>
            {showResults
              ? searchResults.length > 0
                ? categoryHeadings[selectedCategory]
                : "No such event"
              : selectedDay === "1"
                ? "Day 1 Events"
                : selectedDay === "2"
                  ? "Day 2 Events"
                  : categoryHeadings[selectedCategory]}
          </h1>
        </div>

        {/* Render search results or events */}
        <br />
        <Reveal keyframes={fadeInUp} duration={1000} >
          <div className="col-md-12">
            <div className=" mx-md-0">
              <div className="row justify-content-center ">
                {(showResults ? searchResults : displayedEvents).map(
                  (event, index) => (
                    <div
                      key={index}
                      className="col-lg-3 d-flex justify-content-center col-md-4 col-sm-6 col-9 p-4  mx-2 mx-sm-3 rounded my-3 text-center  "
                      style={{ height: '65vh' }}
                    >
                      <div className="card h-100  event-card" style={{
                        width: "100%",
                        // maxHeight: "100%",
                        // height:"100px",

                        borderRadius: '2rem',
                        borderTopLeftRadius: '2rem',
                        borderTopRightRadius: '2rem',
                        objectFit: "fill",
                        background: `url("${darkbg5}")`,
                      }}>
                        <img
                          src={event.image}
                          alt="Event"
                          className="card-img-top "
                          style={{
                            width: "100%",
                            height: "50%",
                            objectFit: "fill",
                            borderTopLeftRadius: '2rem',
                            borderTopRightRadius: '2rem',
                          }}
                        />
                        <div className="card-body mt-3  text-white">
                          <h5 className="card-title text-left fs-2"> {event.name}</h5>
                          <p className="card-text fs-2">
                            {event.date} <br/> {event.time}
                          </p>
                          <button
                            className="btn glow-on-hover fs-5"
                            onClick={() => openModal(event)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Reveal>
        {isModalOpen && selectedEvent && (
          <Modal data={selectedEvent} closeModal={closeModal} />
        )}
        <br />
      </div>

      <Footer />
    </div>
  );
};

export default AllEventsPage;