import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import notFound from "../img/NotFound.svg";
import "../style/fruitsComponent.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
import { fetchCart } from "../utils/fetchLocalData";
export default function FruitsComponent({ data, valueScroll, flag }) {
  // console.log(data);
  const fruitRef = useRef();

  useEffect(() => {
    fruitRef.current.scrollLeft = valueScroll;
  }, [valueScroll]);

  // const cartLocal = fetchCart();
  // console.log(cartLocal);

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();
  console.log(cartItems);

  const addcart = () => {
    //setItems(fetchCart);

    if (items.length > 0) {
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: items,
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
      console.log(items, "aaaa");
    }
  };
  useEffect(() => {
    addcart();
    console.log(cartItems);
  }, [items]);
  return (
    <div
      ref={fruitRef}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
      //style={{ scrollBehavior: "smooth" }}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdOutlineAddShoppingCart className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={notFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
}
