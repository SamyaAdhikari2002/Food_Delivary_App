import React, { useState } from "react";
import "../style/addressForm.css";
import { useLocation, useNavigate } from "react-router-dom";

function AddressForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    navigate("/makePayment", {
      state: {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        address: address,
        city: city,
        state: state,
        landmark: landmark,
        pincode: pincode,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h2>Shipping Address</h2>
      <div className="name-group">
        <div className="name-group-item">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              fontSize: "1.2rem",
              border: "none",
              borderBottom: "2px solid #ccc",
              backgroundColor: "#f5f5f5",
              marginBottom: "1.5rem",
            }}
          />
        </div>
        <div className="name-group-item">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              fontSize: "1.2rem",
              border: "none",
              borderBottom: "2px solid #ccc",
              backgroundColor: "#f5f5f5",
              marginBottom: "1.5rem",
            }}
          />
        </div>
      </div>
      <label htmlFor="mobile">Mobile Number</label>
      <input
        type="tel"
        id="mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
        style={{
          display: "block",
          width: "100%",
          padding: "0.5rem",
          fontSize: "1.2rem",
          border: "none",
          borderBottom: "2px solid #ccc",
          backgroundColor: "#f5f5f5",
          marginBottom: "1.5rem",
        }}
      />
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        style={{
          display: "block",
          width: "100%",
          padding: "0.5rem",
          fontSize: "1.2rem",
          border: "none",
          borderBottom: "2px solid #ccc",
          backgroundColor: "#f5f5f5",
          marginBottom: "1.5rem",
        }}
      />
      <div className="address-group">
        <div className="address-group-item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              fontSize: "1.2rem",
              border: "none",
              borderBottom: "2px solid #ccc",
              backgroundColor: "#f5f5f5",
              marginBottom: "1.5rem",
            }}
          />
        </div>
        <div className="address-group-item">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              fontSize: "1.2rem",
              border: "none",
              borderBottom: "2px solid #ccc",
              backgroundColor: "#f5f5f5",
              marginBottom: "1.5rem",
            }}
          />
        </div>
        <div className="address-group-item">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              fontSize: "1.2rem",
              border: "none",
              borderBottom: "2px solid #ccc",
              backgroundColor: "#f5f5f5",
              marginBottom: "1.5rem",
            }}
          />
        </div>
      </div>
      <label htmlFor="landmark">Landmark (optional)</label>
      <input
        type="text"
        id="landmark"
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          padding: "0.5rem",
          fontSize: "1.2rem",
          border: "none",
          borderBottom: "2px solid #ccc",
          backgroundColor: "#f5f5f5",
          marginBottom: "1.5rem",
        }}
      />
      <button type="submit">Use this address</button>
    </form>
  );
}

export default AddressForm;
