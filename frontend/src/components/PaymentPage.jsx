import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  givePayment,
  saveOrderItems,
  updateOrderItems,
} from "../utils/axiosFunction";
import { useStateValue } from "../context/StateProvider";
import { BsCurrencyRupee } from "react-icons/bs";
import empty from "../img/emptyCart.svg";
import img from "../img/food-delivery-app.png";
import "../style/payment.css";
import { actionType } from "../context/Reducer";
import swal from "sweetalert";
export const PaymentPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const [{ cartItems, user }, dispatch] = useStateValue();
  console.log(cartItems);
  let totalPrice = cartItems.reduce(function (accumulator, item) {
    return accumulator + item.qty * item.price;
  }, 0);
  if (cartItems.length !== 0) {
    totalPrice += 20;
  }

  const pay = () => {
    givePayment(totalPrice).then((r) => {
      if (r.status === "created") {
        let options = {
          key: "rzp_test_k4rrUScAmRbFkY",
          amount: r.amount,
          currency: "INR",
          name: "Fast Food Delivery",
          description: "Test Transaction",
          image:
            "https://firebasestorage.googleapis.com/v0/b/shopping-backend-79635.appspot.com/o/Images%2F1682798591011-food-delivery-app.png?alt=media&token=173d9780-f12d-4990-b153-602c873d434c",
          order_id: r.id,

          handler: function (response) {
            const date1 = new Date();
            cartItems.map((i) => {
              const data = {
                item: i,
                orderId: response.razorpay_order_id,
                amount: i.price * i.qty,
                status: "paid",
                user: user.email,
                qty: i.qty,
                paymentId: response.razorpay_payment_id,
                firstName: location.state.firstName,
                lastName: location.state.lastName,
                mobile: location.state.mobile,
                city: location.state.city,
                state: location.state.state,
                pinCode: location.state.pincode,
                address: location.state.address,
                date:
                  date1.getDate() +
                  "-" +
                  (date1.getMonth() + 1) +
                  "-" +
                  date1.getFullYear(),
                time:
                  date1.getHours() +
                  ":" +
                  date1.getMinutes() +
                  ":" +
                  date1.getSeconds(),
              };
              saveOrderItems(data);
            });
            dispatch({
              type: actionType.SET_CART_ITEMS,
              cartItems: [],
            });
            localStorage.setItem("cartItems", JSON.stringify([]));
            swal("Good job!", "Your payment successful!", "success");
            navigate("/");
          },
          prefill: {
            name: location.state.firstName + " " + location.state.lastName,
            email: user,
            contact: location.state.mobile,
          },
          notes: {
            address: "Fast Food Delivery",
          },
          theme: {
            color: "#3399cc",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          const date1 = new Date();
          cartItems.map((i) => {
            const data = {
              item: i,
              orderId: response.razorpay_order_id,
              amount: i.price * i.qty,
              status: "failed",
              user: user.email,
              qty: i.qty,
              paymentId: response.razorpay_payment_id,
              firstName: location.state.firstName,
              lastName: location.state.lastName,
              mobile: location.state.mobile,
              city: location.state.city,
              state: location.state.state,
              pinCode: location.state.pincode,
              address: location.state.address,
              date:
                date1.getDate() +
                "-" +
                (date1.getMonth() + 1) +
                "-" +
                date1.getFullYear(),
              time:
                date1.getHours() +
                ":" +
                date1.getMinutes() +
                ":" +
                date1.getSeconds(),
            };
            updateOrderItems(data);
          });
          swal("Failed!!", "Oops payment failed!!", "error");
        });
        rzp1.open();
      }
    });
  };

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <div>
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              height: "3rem",
              color: "rgb(249 115 22)",
              fontWeight: "bold",
              fontSize: "2rem",
              marginBottom: "3rem",
            }}
          >
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 xmd:grid-cols-2 gap-2 px-6 w-full  ">
          <div>
            <div style={{ textAlign: "center", fontSize: "1.2rem" }}>Items</div>
            <div
              // className="grid-cols-5 gap-28 "
              style={{
                display: "grid",
                gridTemplateColumns: " repeat(5, minmax(0, 1fr))",
                alignItems: "center",
                borderTopWidth: "2px",
                backgroundColor: "rgb(239 177 49)",
                color: "white",
                borderRadius: "0.5rem",
                gap: "7rem",
                padding: "1rem",
              }}
            >
              <div style={{ marginLeft: "3rem" }}>Image</div>
              <div>Title</div>
              <div>Quantity</div>
              <div>Price</div>
            </div>

            <div style={{ marginBottom: "3rem" }}>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className="gridItem"
                      style={{
                        display: "grid",
                        gridTemplateColumns: " repeat(5, minmax(0, 1fr))",
                        alignItems: "center",
                        borderTopWidth: "2px",
                        borderWidth: "2px",
                        borderColor: "rgb(209 213 219)",
                        borderRadius: "0.5rem",
                        gap: "7rem",
                      }}
                    >
                      <img
                        src={item?.imageURL}
                        alt=""
                        style={{ marginLeft: "3rem" }}
                        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                      ></img>
                      <div>{item.title}</div>
                      <div>{item.qty}</div>
                      <div style={{ display: "flex" }}>{item.price}</div>
                    </div>
                  </div>
                ))
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
            </div>
          </div>

          <div style={{ paddingLeft: "2.5rem", paddingRight: "2rem" }}>
            <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
              Delivery Address
            </div>
            <div
              style={{
                display: "grid",

                gridTemplateColumns: "  [first] 11rem [line2] auto",
                padding: "1rem",
                borderWidth: "1px",
                borderColor: "rgb(209 213 219)",
                borderTopRightRadius: "0.5rem",
                borderTopLeftRadius: "0.5rem",
              }}
            >
              <p>First Name:</p>
              <p style={{}}>{location.state.firstName}</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "[first] 10rem [line2] auto",
                padding: "1rem",
                borderWidth: "1px",
                borderColor: "rgb(209 213 219)",
              }}
            >
              <p style={{}}>Last Name:</p>
              <p style={{}}>{location.state.lastName}</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "[first] 10rem [line2] auto",
                padding: "1rem",
                borderWidth: "1px",
                borderColor: "rgb(209 213 219)",
              }}
            >
              <p style={{}}>Mobile Number:</p>
              <p style={{}}>{location.state.mobile}</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "[first] 10rem [line2] auto",
                padding: "1rem",
                borderWidth: "1px",
                borderColor: "rgb(209 213 219)",
              }}
            >
              <p style={{}}>City:</p>
              <p style={{}}>{location.state.city}</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "[first] 10rem [line2] auto",
                padding: "1rem",
                borderWidth: "1px",
                borderColor: "rgb(209 213 219)",
              }}
            >
              <p style={{}}>State:</p>
              <p style={{}}>{location.state.state}</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "[first] 10rem [line2] auto",
                padding: "1rem",
                borderWidth: "1px",
                borderColor: "rgb(209 213 219)",
              }}
            >
              <p style={{}}>Pin Code:</p>
              <p style={{}}>{location.state.pincode}</p>
            </div>
            {location.state.landmark !== "" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "[first] 10rem [line2] auto",
                  padding: "1rem",
                  borderWidth: "1px",
                  borderColor: "rgb(209 213 219)",
                }}
              >
                <p style={{}}>Landmark:</p>
                <p style={{}}>{location.state.landmark}</p>
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "[first] 10rem [line2] auto",
                padding: "1rem",
                borderWidth: "1px",
                borderColor: "rgb(209 213 219)",
                borderBottomLeftRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
              }}
            >
              <p style={{}}>Address:</p>
              <p style={{}}>{location.state.address}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2rem",
                padding: "2rem",
              }}
            >
              <button className="btnb" onClick={pay}>
                <BsCurrencyRupee />
                {totalPrice} Pay now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
