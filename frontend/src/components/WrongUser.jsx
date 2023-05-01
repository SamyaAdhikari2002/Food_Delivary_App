import React from "react";
import not from "../img/404Not.png";
import { motion } from "framer-motion";

export default function WrongUser() {
  return (
    <div
      style={{
        height: "100vh",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <motion.img
        src={not}
        alt="not found"
        style={{
          height: "14rem",
          marginRight: "auto",
          marginLeft: "auto",
          paddingTop: "2rem",
        }}
        whileHover={{ scale: 1.2 }}
      />
      <h1
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "red",
          fontWeight: "bold",
        }}
      >
        You are not admin{" "}
      </h1>
      <h2 style={{ textAlign: "center" }}>
        If you want to access this page please log in using admin email
      </h2>
    </div>
  );
}
