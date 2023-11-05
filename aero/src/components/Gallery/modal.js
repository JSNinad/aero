import React, { useState, useEffect } from 'react';
import './Modal.css';


const Modal = ({ images, imageUrl, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageUrl);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    setCurrentImageIndex(imageUrl);
  }, [imageUrl]);

  return (
    <div className="modal-overlay">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body text-center">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {images.map((image, index) => (
                  <div key={index} className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}>
                 <img
  className="d-block"
  src={image}
  alt={`Slide ${index}`}
  style={{ height: '70vh', width: '50vw', objectFit: 'cover' }}
/>

                  </div>
                ))}
              </div>
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" onClick={handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
