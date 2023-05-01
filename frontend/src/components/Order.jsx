import React, { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { getAllOrder } from "../utils/axiosFunction";
import { actionType } from "../context/Reducer";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import notFound from "../img/NotFound.svg";
import "../style/order.css";
import CartContainer from "./CartContainer";
export const Order = () => {
  const [{ setOrder, user, cartItems, cartShow }, dispatch] = useStateValue();
  const fetchOrders = async (data) => {
    console.log(data);
    await getAllOrder(data).then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        setOrder: data,
      });
      console.log(data);
    });
  };
  useEffect(() => {
    fetchOrders(user.email);
  }, []);

  const [items, setItems] = useState([]);
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
      style={{ marginTop: "2rem", marginLeft: "1.4rem", marginRight: "1.4rem" }}
    >
      <div
        style={{ paddingTop: "2rem", paddingBottom: "2rem", fontSize: "2rem" }}
      >
        Your Orders
      </div>
      <div>
        {setOrder && setOrder.length > 0 ? (
          setOrder.map((i) => (
            <div key={i.myOrderId} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderWidth: "1px",
                  backgroundColor: "#E3E4E3",
                  borderColor: "#BABABA",
                  color: "#5C5C5C",
                  borderRadius: "0.5rem",
                }}
              >
                <div style={{ paddingLeft: "1rem" }}>
                  <p>ORDER PLACED</p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>{i.date}</p>
                    <p>{i.time}</p>
                  </div>
                </div>
                <div>
                  <p>TOTAL</p>
                  <p
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <BiRupee /> {i.amount}
                  </p>
                </div>
                <div style={{ paddingRight: "1.2rem" }}>
                  <p>ORDER ID</p>
                  <p>{i.orderId}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",

                  borderWidth: "1px",
                  backgroundColor: "white",
                  borderColor: "#BABABA",
                  color: "#5C5C5C",
                  borderRadius: "0.5rem",
                }}
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <img
                    src={i.item.imageURL}
                    style={{
                      marginLeft: "3rem",
                      width: "5rem",
                      height: "5rem",
                      borderRadius: "9999px",
                      objectFit: "contain",
                    }}
                    className="max-w-[60px] "
                    alt="img"
                  ></img>
                </motion.div>

                <div
                  style={{
                    marginBottom: "auto",
                    marginTop: "auto",
                    padding: "2rem",
                    width: "15rem",
                  }}
                >
                  <p>{i.item.title}</p>
                  <p>
                    <span style={{ paddingRight: "0.5rem" }}>Quantity:</span>
                    {i.qty}
                  </p>
                </div>
                <div style={{ margin: "auto" }}>
                  <button
                    style={{}}
                    className="btnd"
                    onClick={() => setItems([...cartItems, i.item])}
                  >
                    <img
                      src="	https://m.media-amazon.com/images/S/sash/7uhR68oBHEcdiIr.png"
                      style={{ height: "1.3rem" }}
                      alt=""
                    ></img>
                    Buy it again
                  </button>
                </div>
                <div style={{ marginLeft: "auto", paddingRight: "4rem" }}>
                  <p>
                    <span style={{ paddingRight: "1rem" }}>{i.firstName}</span>
                    {i.lastName}
                  </p>
                  <p>{i.landmark}</p>
                  <p>
                    {i.city},{i.state}
                  </p>
                  <p>{i.pinCode}</p>
                  <p>
                    <span>mobile no:</span>
                    {i.mobile}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <img src={notFound} alt="" className="h-340" />
            <p
              className="text-xl text-headingColor font-semibold my-2"
              style={{ textAlign: "center" }}
            >
              Order Not Available
            </p>
          </div>
        )}
      </div>
      {cartShow && <CartContainer />}
    </div>
  );
};
