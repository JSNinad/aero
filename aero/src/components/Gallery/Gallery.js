import React from "react";
import "./Gallery.css";
import A from "../../images/main1.webp";
import B from "../../images/main2.webp";
import C from "../../images/main3.webp";
import D from "../../images/main4.webp";
import E from "../../images/main5.webp";
import F from "../../images/main6.webp";
import G from "../../images/main7.webp";
import H from "../../images/main8.webp";
import I from "../../images/main9.webp";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Modal from "./modal";
import darkBg1 from '../../images/darkBg1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCircleNotch } from '@fortawesome/free-solid-svg-icons';


const images = [A,B,C,D,E,F,G,H,I];

const InfiniteLooper = function InfiniteLooper({
  speed,
  direction,
  children,
  
  
}) {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  function resetAnimation() {
    if (innerRef?.current) {
      innerRef.current.setAttribute("data-animate", "false");

      setTimeout(() => {
        if (innerRef?.current) {
          innerRef.current.setAttribute("data-animate", "true");
        }
      }, 10);
    }
  }

  const setupInstances = React.useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width } = innerRef.current.getBoundingClientRect();

    const { width: parentWidth } = outerRef.current.getBoundingClientRect();

    const widthDeficit = parentWidth - width;

    const instanceWidth = width / innerRef.current.children.length;

    if (widthDeficit) {
      setLooperInstances(
        looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1
      );
    }

    resetAnimation();
  }, [looperInstances]);

  useEffect(() => setupInstances(), [setupInstances]);

  useEffect(() => {
    window.addEventListener("resize", setupInstances);

    return () => {
      window.removeEventListener("resize", setupInstances);
    };
  }, [looperInstances, setupInstances]);

  return (
    <div
      className={`looper ${isHovered ? "paused" : ""}`}
      id="top"
      ref={outerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="looper__innerList" ref={innerRef} data-animate="true">
        {[...Array(looperInstances)].map((_, ind) => (
          <div
            key={ind}
            className="looper__listInstance"
            style={{
              animationDuration: `${speed}s`,
              animationDirection: direction === "right" ? "reverse" : "normal",
            }}
          >
            {children}
           
          </div>
        ))}
      </div>
    </div>
  );
};


const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageLoader = new Image();
    const imageSources = images.map((image) => {
      const img = new Image();
      img.src = image;
      return img;
    });

    Promise.all(imageSources.map((img) => img.decode()))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        setLoading(false);
      });
  }, []);

  const handleImageClick = (index) => {
    if (index >= 0 && index < images.length) {
      setSelectedImageIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  
  return (
    <div className="gallery" style={{ backgroundImage:`url(${darkBg1})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', maxWidth: '100%' }}>
       <Navbar/>
       <div style={{overflowX:'hidden'}}>
       {loading ? (
          // Show loading spinners while images are being loaded
          <div className="d-flex justify-content-center align-items-center vh-100">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="contentBlock border text-white d-flex p-3 align-items-center">
                <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />
              </div>
            ))}
          </div>
        ) : (
    <div className="d-flex align-items-center vh-100">
    
    <InfiniteLooper speed="14" direction="right" >
      <div className="contentBlock1 up" onClick={() => handleImageClick(0)}>
        <img className="contentImage" src={A} alt="img1" loading="lazy" />
      
      </div>
      <hr className="line" />
      <div className="contentBlock up" onClick={() => handleImageClick(1)} >
        <img className="contentImage " id="one" src={B} alt="img2"  loading="lazy"/>
     
      </div>
      <hr className="line2" />
      <div className="contentBlock up " onClick={() => handleImageClick(2)}>
        <img className="contentImage" src={C} alt="img2"  loading="lazy"/>
      
      </div>
      <hr className="line3" />
      <div className="contentBlock up" onClick={() => handleImageClick(3)}>
        <img className="contentImage" src={D} alt="img2" loading="lazy"/>
     
      </div>
      <div className="contentBlock up" onClick={() => handleImageClick(4)}>
        <img className="contentImage" src={E} alt="img2" loading="lazy" />
     
      </div>
      <div className="contentBlock up" onClick={() => handleImageClick(5)}>
        <img className="contentImage" src={F} alt="img2" loading="lazy" />
      
      </div>
      <div className="contentBlock up" onClick={() => handleImageClick(6)}>
        <img className="contentImage" src={G} alt="img2" loading="lazy" />
       
      </div>
      <div className="contentBlock up" onClick={() => handleImageClick(7)}>
        <img className="contentImage" src={H} alt="img2" loading="lazy" />
     
      </div>
      <div className="contentBlock up" onClick={() => handleImageClick(8)}>
        <img className="contentImage" src={I} alt="img2" loading="lazy" />
        
      </div>
    </InfiniteLooper>
    

     {/* <h1 className="text-center fw-bold text-white">Flash Back Of Aerophilia</h1> */}
    {/* <InfiniteLooper direction="left" speed="14">
      <div className="contentBlock1 ">
        <img className="contentImage" src={F} alt="img2" />
      </div>
      <div className="contentBlock ">
        <img className="contentImage" src={G} alt="img2" />
      </div>
      <div className="contentBlock ">
        <img className="contentImage" src={H} alt="img2" />
      </div>
      <div className="contentBlock ">
        <img className="contentImage" src={I} alt="img2" />
      </div>
    </InfiniteLooper> */}
      {/* {/* <div className="container  d-flex justify-content-center align-items-center">
    <div className="row">
      {images.map((image, index) => (
        <div className="col-md-3   mt-3 mb-3" key={index}>
          <div className="contentBlock borderFrame">
            <img className="contentImage picture  slide-in-from-bottom" loading="lazy" src={image} alt={`img${index + 2}`} />
          </div>
        </div>
      ))}
    </div>
  </div> */}
 {isModalOpen && <Modal images={images} imageUrl={selectedImageIndex} onClose={handleCloseModal} />}


     </div>
        )}
  <Footer/>
    </div>
   
    </div>
  )
}

export default Gallery


// const Gallery = () => {
//   return (
//     <div className="gallery" style={{ backgroundImage: `url(${hoveredImage})`, background: 'linear-gradient(-45deg, #4132e6, #05031a)' }}>
//       <Navbar/>
//       <App/>
//       <Footer/>
//     </div>
//   );
// };

// export default Gallery;



// import React from "react";
// import "./Gallery.css";
// import A from "./images/1.jpeg";
// import B from "./images/2.jpg";
// import C from "./images/3.jpg";
// import D from "./images/4.jpg";
// import E from "./images/5.jpg";
// import F from "./images/6.jpg";
// import G from "./images/7.jpg";
// import H from "./images/8.jpg";
// import I from "./images/9.jpg";
// import { useEffect } from "react";
// const InfiniteLooper = function InfiniteLooper({
//   speed,
//   direction,
//   children,
// }) {
//   const [looperInstances, setLooperInstances] = React.useState(1);
//   const outerRef = React.useRef(null);
//   const innerRef = React.useRef(null);

//   function resetAnimation() {
//     if (innerRef?.current) {
//       innerRef.current.setAttribute("data-animate", "false");

//       setTimeout(() => {
//         if (innerRef?.current) {
//           innerRef.current.setAttribute("data-animate", "true");
//         }
//       }, 10);
//     }
//   }

//   const setupInstances = React.useCallback(() => {
//     if (!innerRef?.current || !outerRef?.current) return;

//     const { width } = innerRef.current.getBoundingClientRect();

//     const { width: parentWidth } = outerRef.current.getBoundingClientRect();

//     const widthDeficit = parentWidth - width;

//     const instanceWidth = width / innerRef.current.children.length;

//     if (widthDeficit) {
//       setLooperInstances(
//         looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1
//       );
//     }

//     resetAnimation();
//   }, [looperInstances]);

//   useEffect(() => setupInstances(), [setupInstances]);

//   useEffect(() => {
//     window.addEventListener("resize", setupInstances);

//     return () => {
//       window.removeEventListener("resize", setupInstances);
//     };
//   }, [looperInstances, setupInstances]);

//   return (
//     <div className="looper" ref={outerRef}>
//       <div className="looper__innerList" ref={innerRef} data-animate="true">
//         {[...Array(looperInstances)].map((_, ind) => (
//           <div
//             key={ind}
//             className="looper__listInstance"
//             style={{
//               animationDuration: `${speed}s`,
//               animationDirection: direction === "right" ? "reverse" : "normal",
//             }}
//           >
//             {children}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const App = () => (
//   <div className="app">
//     <p className="description">
//         {/* Content starts from here... */}
//       Gallery.....
//     </p>

//     <InfiniteLooper speed="9" direction="right">
//       <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={A} alt="img1" />
//       </div>
//       <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={B} alt="img2" />
//         </div>
//         <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={C} alt="img2" />
//         </div>
//         <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={D} alt="img2" />
//         </div>
//         <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={E} alt="img2" />
//         </div>
//     </InfiniteLooper>

//     <InfiniteLooper direction="left" speed="11">
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={F} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={G} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={H} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={I} alt="img2" />
//       </div>
//     </InfiniteLooper>

//     <InfiniteLooper direction="right" speed="9">
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={F} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={A} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={B} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={C} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={D} alt="img2" />
//       </div>
//     </InfiniteLooper>
//   </div>
// );

// const Gallery = () => {
//   return (
//     <div className="gallery">
//       <App />
//     </div>
//   );
// };

// // ReactDOM.render(<Gallery />, document.getElementById("root"));
// export default Gallery;