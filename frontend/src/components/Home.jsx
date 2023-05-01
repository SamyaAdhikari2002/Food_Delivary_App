import React, { useEffect } from "react";
import bike from "../img/delivery.png";
import bgImg from "../img/BGImg.png";
import imgSlide from "../utils/sliderImgData";
import { useState } from "react";
import { motion } from "framer-motion";
import "../style/home.css";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [currImg, setCurrImg] = useState(0);
  const navigate = useNavigate();
  const bgImgStyle = {
    backgroundImage: `url(${imgSlide[currImg].url})`,

    backgroundSize: "cover",
    height: "90%",
    width: "90%",
    borderRadius: "23px",
  };

  const goToNext = (currImg) => {
    setCurrImg(currImg);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currImg === 3) {
        setCurrImg(0);
      } else {
        setCurrImg(currImg + 1);
      }
    }, 5000);
  }, [currImg]);

  return (
    <section
      className="grid grid-cols-1 xmd:grid-cols-2 gap-2 px-6 w-full  "
      id="home"
      // style={{ display: "flex" }}
    >
      <div
        className="py-2  flex-1 flex flex-col items-start  justify-center gap-6"
        style={{}}
      >
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Fast Bike Delivery
          </p>
          <div
            className="w-8 h8 bg-white rounded-full overflow-hidden drop-shadow-xl"
            style={{ borderRadius: "50%" }}
          >
            <img
              src={bike}
              className="w-full h-full object-contain"
              alt="bike"
            />
          </div>
        </div>
        <p className="text-[2.6rem] font-bold tracking-wide text-headingColor">
          <span className="text-orange-600 text-[4rem]">India's Fastest</span>{" "}
          Food Delivery App
        </p>
        <p className="text-base text-textColor text-center md:text-left">
          From swanky upscale restaurants to the cosiest hidden gems serving the
          most incredible food, we covers it all. Explore menus, and millions of
          restaurant photos and reviews from users just like you, to find your
          next great meal.
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, color: "white" }}
          className="bg-gradient-to-br from-orange-400  to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          onClick={() => {
            navigate("/setAdress");
          }}
        >
          Order Now
        </motion.button>
      </div>

      <div
        className="py-2 flex-1 relative picSize"
        style={{ height: "30rem", width: "30rem" }}
      >
        <div style={bgImgStyle} className="picSize2"></div>
      </div>
    </section>
  );
};

export default Home;
