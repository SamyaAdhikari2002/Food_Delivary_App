import React, { useState } from "react";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import FruitsComponent from "./FruitsComponent";
import { useStateValue } from "../context/StateProvider";
import { IoFastFoodSharp } from "react-icons/io5";
import "../style/foodMenu.css";
export default function FoodMenu() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [foodFilter, setFoodFilter] = useState("drinks");
  return (
    <section
      id="menu"
      style={{ width: "100%", marginTop: " 1.5rem", marginBottom: "1.5rem" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          className="heading  before:bg-gradient-to-tr from-orange-400 to-orange-600"
          style={{}}
        >
          All Delicious Foods
        </p>

        <div
          className=" lg:justify-center scrollbar-none"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            overflowX: "scroll",
          }}
        >
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={` foodFilter  min-w-[94px]  ${
                  foodFilter === category.urlParamName
                    ? "bg-cartNumBg"
                    : "bg-card"
                }`}
                onClick={() => setFoodFilter(category.urlParamName)}
              >
                <div
                  className={` foodItem  ${
                    foodFilter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  }`}
                >
                  <IoFastFoodSharp
                    className={`${
                      foodFilter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    }  foodItemIcon`}
                  />
                </div>
                <p
                  className={` foodItemText ${
                    foodFilter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } `}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div style={{ width: "100%" }}>
          <FruitsComponent
            flag={false}
            data={foodItems?.filter((n) => n.category == foodFilter)}
          />
        </div>
      </div>
    </section>
  );
}
