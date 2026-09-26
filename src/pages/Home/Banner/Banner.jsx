import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import deliveryManImg from "../../../assets/big-deliveryman.png";

const Banner = () => {
  return (
    <div className="mt-6 flex w-full flex-col overflow-hidden rounded-xl shadow-xl sm:mt-8 md:mt-10 lg:h-[400px] lg:flex-row">
      {/* Carousel */}
      <div className="h-[220px] w-full sm:h-[280px] md:h-[320px] lg:h-full lg:w-[60%]">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={2000}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          showArrows={true}
        >
          <div className="h-[220px] sm:h-[280px] md:h-[320px] lg:h-[400px]">
            <img
              src={bannerImg1}
              alt="Banner 1"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-[220px] sm:h-[280px] md:h-[320px] lg:h-[400px]">
            <img
              src={bannerImg2}
              alt="Banner 2"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="h-[220px] sm:h-[280px] md:h-[320px] lg:h-[400px]">
            <img
              src={bannerImg3}
              alt="Banner 3"
              className="h-full w-full object-cover"
            />
          </div>
        </Carousel>
      </div>

      {/* Delivery Man */}
      <div className="flex h-[260px] w-full items-end justify-center overflow-hidden bg-base-100 sm:h-[320px] md:h-[360px] lg:h-full lg:w-[40%]">
        <img
          src={deliveryManImg}
          alt="Delivery man"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
