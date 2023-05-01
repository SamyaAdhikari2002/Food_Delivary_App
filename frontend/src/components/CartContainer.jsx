import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiRupee } from "react-icons/bi";
import { MdKeyboardBackspace } from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
import empty from "../img/emptyCart.svg";
import Cart from "./Cart";
import "../style/cartContainer.css";
import { Link } from "react-router-dom";
export default function CartContainer() {
  const [{ user, cartItems, cartShow }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(1);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTotal(totalPrice);
  }, [total, flag]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      style={{
        height: "89vh",
        position: "fixed",
        top: "0px",
        right: "0px",
        display: "flex",
        backgroundColor: "rgb(255 255 255)",
        flexDirection: "column",
        zIndex: "101",
      }}
      className="w-full h-screen md:w-375 drop-shadow-md "
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          cursor: "pointer",
        }}
      >
        <motion.div onClick={showCart} whileTap={{ scale: 0.75 }}>
          <MdKeyboardBackspace
            style={{
              color: "rgb(81 81 81)",
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
            }}
          />
        </motion.div>
        <p
          style={{
            color: "rgb(81 81 81)",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            fontWeight: "600",
          }}
        >
          Cart
        </p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          onClick={clearCart}
          className="clear "
        >
          <AiOutlineClear /> Clear
        </motion.p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(40 42 44)",
            borderTopLeftRadius: "2rem",
            borderTopRightRadius: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="md:h-42 scrollbar-none"
            style={{
              width: "100%",
              height: "340px",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              paddingTop: "2.5rem",
              paddingBottom: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              overflowY: "scroll",
            }}
          >
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <Cart key={item.id} item={item} flag={flag} setFlag={setFlag} />
              ))}
          </div>

          <div
            style={{
              width: "100%",
              flex: "1 1 0%",
              backgroundColor: "rgb(52 55 57)",
              borderTopLeftRadius: " 2rem",
              borderTopRightRadius: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            <div className="lower">
              <p>Sub Total</p>
              <p style={{ alignItems: "center" }}>
                <BiRupee /> {total}
              </p>
            </div>
            <div className="lower">
              <p>Delivery</p>
              <p style={{ alignItems: "center" }}>
                {" "}
                <BiRupee /> 20
              </p>
            </div>

            <div className="cartLower "></div>

            <div className="lower">
              <p
                style={{
                  color: "rgb(229 231 235)",
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  fontWeight: 600,
                }}
              >
                Total
              </p>
              <p
                style={{
                  color: "rgb(229 231 235)",
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  fontWeight: 600,
                  alignItems: "center",
                }}
              >
                <BiRupee />
                {total + 20}
              </p>
            </div>

            {user ? (
              <Link to="/setAdress" style={{ width: "100%" }}>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className=" btna "
                  onClick={showCart}
                >
                  Check Out
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="btna"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <img src={empty} style={{ width: "300px" }} alt="" />
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: " 1.75rem",
              color: "rgb(81 81 81)",
              fontWeight: "600",
            }}
          >
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}
