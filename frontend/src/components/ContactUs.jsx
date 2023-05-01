import React, { useState } from "react";
import { BsFillPinMapFill } from "react-icons/bs";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

import "../style/contactUs.css";
import { sendFormData } from "../utils/axiosFunction";
import CartContainer from "./CartContainer";
import { useStateValue } from "../context/StateProvider";
export default function ContactUs() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [{ cartShow }, dispatch] = useStateValue();

  const onSubmit = () => {
    const data = {
      name: name,
      email: email,
      message: message,
      replyed: false,
    };
    sendFormData(data);
    clearForm();
  };
  const clearForm = () => {
    setName("");
    setMessage("");
    setEmail("");
  };
  return (
    <>
      <div className="containerx">
        <h1 className="contentx">Contact Us</h1>
        <div className="containerInfo">
          <div className="left">
            <div className="box">
              <div className="icon">
                <BsFillPinMapFill />
              </div>

              <div className="text">
                <h3>Address</h3>
                <h4> 751024 KIIT Rd,</h4>
                <h4>Bhubaneswar Odisha</h4>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <AiOutlineMail />
              </div>
              <div className="text">
                <h3>Email</h3>
                <h4>abcd@gmail.com</h4>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <AiOutlinePhone />
              </div>
              <div className="text">
                <h3>Phone No</h3>
                <h4>6876708707</h4>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.7115346130786!2d85.81723687360959!3d20.353532210630615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19093d69c9edc1%3A0x4f11974507a587f3!2sKIIT%20Campus%206!5e0!3m2!1sen!2sin!4v1681331523268!5m2!1sen!2sin"
              referrerpolicy="no-referrer-when-downgrade"
              style={{ width: "25%", height: "4%" }}
            ></iframe>
          </div>

          <div className="contactForm">
            <div>
              <h2>Send Message</h2>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Type your full name..."
                />
              </div>
              <div className="inputBox">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Type your email..."
                />
              </div>
              <div className="inputBox">
                <textarea
                  type="text"
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  placeholder="Type your Message"
                />
              </div>
              <button type="button" className="btn" onClick={onSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
        {cartShow && <CartContainer />}
      </div>
    </>
  );
}
