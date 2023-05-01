import React from "react";
import "../style/sidebar.css";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineContacts,
} from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import {
  MdOutlineRestaurantMenu,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
import { Link } from "react-router-dom";

export default function SideBar({ sidebar, closeSidebar }) {
  const [{ user, cartShow }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
      //  setSidebar(false);
    });
    closeSidebar();
  };
  return (
    <div className={sidebar ? "sidebar sidebar--open" : "sidebar"}>
      <li onClick={closeSidebar}>
        <AiOutlineHome />
        <Link to={"/"}>Home</Link>
      </li>

      <li onClick={closeSidebar}>
        <FcAbout />
        <Link to={"/aboutUs"}> About Us</Link>
      </li>
      <li onClick={closeSidebar}>
        <MdOutlineMiscellaneousServices />
        <Link to={"/service"}> Service</Link>
      </li>
      <li onClick={closeSidebar}>
        <AiOutlineContacts />
        <Link to={"/contact"}>Contact Us</Link>
      </li>
      <li onClick={showCart}>
        <AiOutlineShoppingCart />
        My Cart
      </li>
      <li onClick={closeSidebar}>
        <BsCart4 />
        <Link to={"/order"}>My Order</Link>
      </li>
    </div>
  );
}
