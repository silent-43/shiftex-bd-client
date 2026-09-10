import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import deliveryManImg from "../../../assets/big-deliveryman.png";

const Banner = () => {
  return (
    <div className="flex w-full h-[400px] mt-10">
      {/* Carousel - 60% */}
      <div className="w-[60%] h-full">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={2000}
          showThumbs={false}
          showStatus={false}
        >
          <div>
            <img
              src={bannerImg1}
              alt="Banner 1"
              className="h-[400px] w-full object-cover"
            />
          </div>

          <div>
            <img
              src={bannerImg2}
              alt="Banner 2"
              className="h-[400px] w-full object-cover"
            />
          </div>

          <div>
            <img
              src={bannerImg3}
              alt="Banner 3"
              className="h-[400px] w-full object-cover"
            />
          </div>
        </Carousel>
      </div>

      {/* Delivery Man - 40% */}
      <div className="w-[40%] h-full flex items-end justify-center overflow-hidden">
        <img
          src={deliveryManImg}
          alt="deliveryMan"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
