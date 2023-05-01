import React from "react";
import "../style/sidebar.css";
export default function BackSideBar({ sidebar, closeSidebar }) {
  return (
    <div
      className={sidebar ? "backdrop--open" : "backdrop"}
      onClick={closeSidebar}
    ></div>
  );
}
