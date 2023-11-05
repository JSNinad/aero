import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        className="btn btn-primary scroll-to-top-button fixed-bottom fixed-md-top fixed-right m-4 custom-scroll-button" // Apply Bootstrap classes and custom class
        style={{ width: "3rem" }} // Set the width
        onClick={scrollToTop}
      >
        ▲
      </button>
    )
  );
};

export default ScrollToTopButton;
