import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
export default function Cart({ key, item, setFlag, flag }) {
  const [{ cartItems }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(item.qty);
  let items = [];
  const updateQuantity = (id, str) => {
    if (str === "addItem") {
      setQuantity(quantity + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      dispatchCart();
    } else {
      if (quantity === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        dispatchCart();
      } else {
        setQuantity(quantity - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        dispatchCart();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [quantity, items]);

  const dispatchCart = () => {
    if (items.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(items));
    }

    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };
  return (
    <div
      style={{
        width: "100%",
        padding: "0.25rem",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "rgb(46 48 51)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <img
        style={{
          width: "5rem",
          height: "5rem",
          borderRadius: "9999px",
          objectFit: "contain",
        }}
        src={item?.imageURL}
        alt=""
      />

      {/* name section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.5rem",
            color: "rgb(249 250 251)",
          }}
        >
          {item?.title}
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            display: "block",
            color: "rgb(209 213 219)",
            fontWeight: "600",
          }}
        >
          <BiRupee />
          {parseFloat(item?.price) * quantity}
        </p>
      </div>

      {/* button section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginLeft: "auto",
          cursor: "pointer",
        }}
      >
        <motion.div
          onClick={() => updateQuantity(item?.id, "removeItem")}
          whileTap={{ scale: 0.75 }}
        >
          <FiMinus style={{ color: "rgb(249 250 251)" }} />
        </motion.div>

        <p
          style={{
            width: "1.25rem",
            height: "1.25rem",
            borderRadius: "0.125rem",
            backgroundColor: "rgb(40 42 44)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {quantity}
        </p>

        <motion.div
          onClick={() => updateQuantity(item?.id, "addItem")}
          whileTap={{ scale: 0.75 }}
        >
          <FiPlus style={{ color: "rgb(249 250 251)" }} />
        </motion.div>
      </div>
    </div>
  );
}
