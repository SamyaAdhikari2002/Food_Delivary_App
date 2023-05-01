import React, { useState } from "react";
import { motion } from "framer-motion";
import "../style/header-style.css";
import userPic from "../img/avatar.png";
import img from "../img/food-delivery-app.png";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import {
  MdShoppingCart,
  MdAddCircleOutline,
  MdOutlineLogout,
} from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { actionType } from "../context/Reducer";
import Toolbar from "./Toolbar";
import SideBar from "./SideBar";
import BackSideBar from "./BackSideBar";
import { getAllOrder, getData } from "../utils/axiosFunction";

const Header = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user, cartItems, cartShow, setOrder }, dispatch] = useStateValue();
  const [menu, setMenu] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const togglesidebar = () => {
    console.log("click");
    setSidebar((preState) => !preState);
  };
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  const fetchItems = async () => {
    await getData().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  const fetchOrders = async (data) => {
    console.log(data);
    await getAllOrder(data).then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        setOrder: data,
      });
    });
  };
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setMenu(!menu);
    }
  };
  const logout = () => {
    setMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
    dispatch({
      type: actionType.SET_ORDERS,
      setOrder: [],
    });
    navigate("/");
  };
  return (
    <header className="uper md:p-6 md:px-16" style={{ paddingLeft: "2rem" }}>
      {/* destop vertion */}

      <div
        className="hidden md:flex items-center justify-between"
        style={{ height: "100%", hight: "100%" }}
      >
        <Link
          to={"/"}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <img className="imgcss2 " src={img} alt="logo"></img>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <motion.ul
            className="menu"
            initial={{ opacity: 0, x: 200 }}
            exit={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <li
              className=" 
          ease-in-out transition-all "
              onClick={() => {
                setMenu(false);
                fetchItems();
              }}
            >
              <Link to={"/"}>Home</Link>
            </li>

            <li
              className=" 
          ease-in-out transition-all "
              onClick={() => {
                setMenu(false);
              }}
            >
              <Link to={"/aboutUs"}>About Us</Link>
            </li>
            <li
              className=" 
          ease-in-out transition-all "
              onClick={() => {
                setMenu(false);
              }}
            >
              <Link to={"/service"}>Service</Link>
            </li>
            <li
              className=" 
          ease-in-out transition-all "
              onClick={() => {
                setMenu(false);
              }}
            >
              <Link to={"/contact"}>Contact Us</Link>
            </li>
            {user && (
              <li
                className=" 
         ease-in-out transition-all "
                onClick={() => {
                  setMenu(false);
                  fetchOrders(user.email);
                }}
              >
                <Link to={"/order"}>My Orders</Link>
              </li>
            )}
            {user && user.email === "samyaadhikari@gmail.com" && (
              <li
                className=" 
          ease-in-out transition-all "
                onClick={() => {
                  setMenu(false);
                  fetchItems();
                }}
              >
                <Link to={"/dashbord"}>Dashbord</Link>
              </li>
            )}
          </motion.ul>
          <div
            onClick={() => {
              showCart();
              console.log("cart click");
            }}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdShoppingCart
              style={{
                color: "rgb(81 81 81)",
                fontSize: "1.5rem",
                lineHeight: "2rem",
                cursor: "pointer",
              }}
            />

            {cartItems && cartItems.length > 0 && (
              <div
                className="-top-2 -right-2"
                style={{
                  position: "absolute",
                  width: "1.25rem",
                  height: "1.25rem",
                  borderRadius: "50%",
                  background: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "0.7rem",
                    lineHeight: "1rem",
                  }}
                >
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : userPic}
              // className="w-5 h-5 min-w-[40px] rounded-full "

              style={{
                hight: "2rem",
                width: "2rem",
                marginLeft: "1.5rem",
                cursor: "pointer",
                borderRadius: "50%",
              }}
              alt="userprofile"
              onClick={login}
            />
            {menu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                style={{
                  width: "10rem",
                  boxShadow: "1px 2px 3px gray",
                  backgroundColor: "rgb(249 250 251)",
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  borderRadius: "10%",
                  right: "0px",
                  top: "1.75rem",
                }}
              >
                {/* {user && user.email === "samyaadhikari@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        gap: "0.75rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        color: "rgb(81 81 81)",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                      }}
                      className=" hover:bg-slate-100 transition-all duration-200 ease-in-out"
                      onClick={() => {
                        setMenu(false);
                      }}
                    >
                      New Item <MdAddCircleOutline />
                    </p>
                  </Link>
                )} */}

                <p
                  style={{
                    margin: "0.5rem",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    boxShadow: "1px 2px 7px grey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(229 231 235)",
                    gap: "0.75rem",
                    cursor: "pointer",
                    color: "rgb(81 81 81 )",
                    lineHeight: "1.5rem",
                    zIndex: "100",
                  }}
                  className=" hover:bg-gray-300 transition-all duration-100 ease-in-out"
                  onClick={logout}
                >
                  Logout <MdOutlineLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div
        // className="md:hidden w-full h-full flex items-center justify-center"
        className="flex items-center justify-between md:hidden w-full h-full "
      >
        <Toolbar openSidebar={togglesidebar} />
        <BackSideBar sidebar={sidebar} closeSidebar={togglesidebar} />
        <SideBar sidebar={sidebar} closeSidebar={togglesidebar} />
        <Link
          to={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "15px",
            gap: "0.5rem",
          }}
        >
          <img
            src={img}
            style={{ width: "3rem", hight: "3rem", objectFit: "cover" }}
            alt="logo"
          />
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : userPic}
            style={{
              width: "2rem",
              hight: "2rem",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            alt="userprofile"
            onClick={login}
          />
          {menu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              style={{
                width: "10rem",
                backgroundColor: "rgb(249 250 251)",
                boxShadow: "1px 1px 6px grey",
                borderRadius: "0.5rem",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "3rem",
                right: "0px",
              }}
            >
              {user && user.email === "samyaadhikari@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className=" hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor "
                    style={{
                      padding: "0.65rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      cursor: "pointer",
                      lineHeight: "1.5rem",
                    }}
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    New Item <MdAddCircleOutline />
                  </p>
                </Link>
              )}

              <p
                style={{
                  margin: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  boxShadow: "1px 2px 7px grey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgb(229 231 235)",
                  gap: "0.75rem",
                  cursor: "pointer",
                  color: "rgb(81 81 81 )",
                  lineHeight: "1.5rem",
                }}
                className=" hover:bg-gray-300 transition-all duration-100 ease-in-out  "
                onClick={logout}
              >
                Logout <MdOutlineLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
