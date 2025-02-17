import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (

    <div className="main">
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-[90%] max-w-[1200px]">
          <Slider {...settings}>
            {/* Slide 1 */}
            <div className="relative">
              <img
                src="src\assets\premium-pet-food.jpg"
                alt="Premium Pet Food"
                className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                <h2 className="text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
                  Premium Pet Food
                </h2>
              </div>
            </div>
            {/* Slide 2 */}
            <div className="relative">
              <img
                src="src\assets\petfood-img.jpg"
                alt="Healthy Treats"
                className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                <h2 className="text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
                  Healthy Treats
                </h2>
              </div>
            </div>
            {/* Slide 3 */}
            <div className="relative">
              <img
                src="src\assets\pet toy.jpg"
                alt="Fun Toys"
                className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                <h2 className="text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
                  Fun Toys
                </h2>
              </div>
            </div>
            {/* Slide 4 */}
            <div className="relative">
              <img
                src="src\assets\petAccessories.jpg"
                alt="Accessories"
                className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                <h2 className="text-4xl font-bold text-white md:text-5xl drop-shadow-lg">
                  Accessories
                </h2>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
