import React, { useEffect, useState } from "react";
import Home from "./Home";
import { motion } from "framer-motion";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import FruitsComponent from "./FruitsComponent";
import { useStateValue } from "../context/StateProvider";
import FoodMenu from "./FoodMenu";
import "../style/mainContainer.css";
import CartContainer from "./CartContainer";
import Footer from "./Footer";
const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [valueScroll, setValueScroll] = useState(0);
  // const [x, setX] = useState(0);
  // const changeNum = () => {
  //   x += 1;
  //   setX(x);
  // };

  useEffect(() => {}, [cartShow, valueScroll]);
  return (
    <div
      style={{
        padding: "1rem",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Home />

      <section
        className="w-full my-6"
        style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            className=" before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100"
            style={{
              fontSize: "1.5rem",
              lineHeight: "2rem",
              fontWeight: "600",
              textTransform: "capitalize",
              color: "rgb(46 46 46)",
              position: "relative",
            }}
          >
            Our Fresh Fruits
          </p>

          <div
            style={{ gap: "0.75rem", alignItems: "center" }}
            className="hidden md:flex"
          >
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="leftRight hover:shadow-lg "
              onClick={() => setValueScroll(valueScroll - 300)}
            >
              <AiOutlineDoubleLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="leftRight hover:shadow-lg"
              onClick={() => setValueScroll(valueScroll + 300)}
            >
              <AiOutlineDoubleRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <FruitsComponent
          valueScroll={valueScroll}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
        <FoodMenu />
        {cartShow && <CartContainer />}
      </section>
    </div>
  );
};

export default MainContainer;
