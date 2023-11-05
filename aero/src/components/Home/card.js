import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IonIcon } from "@ionic/react";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import ui from "../../images/ui.webp"
import code from "../../images/code.webp"
import sky from "../../images/sky.webp"
import frames from "../../images/frames.webp"
import cad from "../../images/cad.webp"
import sumo from "../../images/sumo.webp"



function Cards() {
  const [initialSlide, setInitialSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setInitialSlide(swiper.realIndex);
  };

  return (
    <div>
      <h1
        className="fw-bold text-center p-4 text-white display-2"
        style={{ fontFamily: "'Iceland', sans-serif" }}
      >
        EVENTS
      </h1>
      <div className="container mt-5 d-flex justify-content-center  align-items-center">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          initialSlide={initialSlide}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 2000 }}
          className="h-100 position-relative d-flex flex-column"
          onSlideChange={(swiper) => handleSlideChange(swiper)}
        >
          <SwiperSlide>
          <div className="swiper-slide-content">
              <img src={ui} alt="UI Design" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="swiper-slide-content">
            <img src={code} alt="slide_image" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="swiper-slide-content">
            <img src={sky} alt="slide_image" />
            </div>
          </SwiperSlide>
            
          <SwiperSlide>
          <div className="swiper-slide-content">
            <img src={frames} alt="slide_image" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="swiper-slide-content">
            <img src={cad} alt="slide_image" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="swiper-slide-content">
            
            <img src={sumo} alt="slide_image" />
            </div>
          </SwiperSlide>

          <div className="slider-controler mt-5 p-4">
            <div className="swiper-button-prev  slider-arrow">
              <IonIcon icon={arrowBackOutline}></IonIcon>
            </div>
            <div className="swiper-button-next  slider-arrow">
              <IonIcon icon={arrowForwardOutline}></IonIcon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Cards;
