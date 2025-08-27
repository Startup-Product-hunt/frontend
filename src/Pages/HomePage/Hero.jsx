import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import img1 from "/images/banner_1.jpeg";
import img2 from "/images/banner_2.jpeg";
import img3 from "/images/banner_3.jpeg";
import img4 from "/images/banner_4.jpeg";
import img5 from "/images/banner_5.jpeg";
import img6 from "/images/banner_6.jpeg";


const Hero = () => {
  const banners = [img1, img2, img3, img4, img5, img6];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Static Text Overlay */}
      
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Welcome to Kalvakhya
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white max-w-2xl drop-shadow-md">
          Here you find what you want. Trusted brands are available here.
        </p>
        
      </div>

      {/* Custom Buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-5 -translate-y-1/2 z-30 bg-white/60 text-blue-800 rounded-full p-1 md:p-3 hover:bg-white/80 transition"
        aria-label="Previous slide"
      >
        ❮
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 right-5 -translate-y-1/2 z-30 bg-white/60 text-blue-800 rounded-full p-1 md:p-3  hover:bg-white/80 transition"
        aria-label="Next slide"
      >
        ❯
      </button>

      {/* Swiper Background */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        slidesPerView={1}
        speed={2000}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          if (swiper?.params?.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSwiper={(swiper) => {
          if (swiper.navigation) {
            swiper.navigation.init();
            swiper.navigation.update();
          }
          if (swiper.autoplay && swiper.autoplay.running === false) {
            swiper.autoplay.start();
          }
        }}
        className="mySwiper"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx} className="relative">
            {/* Image with dark overlay */}
            <div className="relative w-full max-h-[600px]">
              <img
                src={banner}
                alt={`Banner ${idx + 1}`}
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
