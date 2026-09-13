import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazonImgVector from "../../../assets/brands/amazon_vector.png";
import amazonImg from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstarImg from "../../../assets/brands/moonstar.png";
import randstadImg from "../../../assets/brands/randstad.png";
import starImg from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  const brandLogos = [
    amazonImgVector,
    amazonImg,
    casio,
    moonstarImg,
    randstadImg,
    starImg,
    startPeople,
  ];
  return (
    <div className="mt-20">
      <h1 className="mb-8 text-center font-bold text-black text-3xl">
        We Have Helped Thousands of Sales Team
      </h1>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        // loop={true}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
