import React, { useEffect, useState } from "react";
import "../style/dashbord.css";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import notFound from "../img/NotFound.svg";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import {
  deleteData,
  getContectUsData,
  getData,
  getOrders,
  sendReply,
} from "../utils/axiosFunction";
import { deleteObject, ref } from "firebase/storage";

import { actionType } from "../context/Reducer";
import CartContainer from "./CartContainer";
import { storage } from "../firebase.config";
import Modal from "react-modal";
import { BiMessageDots } from "react-icons/bi";
import {
  AiOutlineDelete,
  AiOutlineFileAdd,
  AiOutlineEdit,
} from "react-icons/ai";
import { GrClose } from "react-icons/gr";
const customStyles = {
  content: {
    width: "90%",
    height: "80%",
    top: "55%",
    left: "50%",

    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function Dashbord() {
  const [{ foodItems, isEdit, setItem, cartShow }, dispatch] = useStateValue();
  const [query, setQuery] = useState("");
  const [data, setData] = useState();
  const [reply, setReply] = useState();

  const [id, setId] = useState(0);
  const [allOrders, setAllOrders] = useState([]);

  const fetchItems = async () => {
    console.log();
    await getData().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // useEffect(() => {
  //   setAllOrders(orders);
  //   console.log(allOrders);
  // }, []);
  // setAllOrders(orders);
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const fetchData = async () => {
    await getContectUsData().then((data) => {
      console.log(data);
      setData(data);
    });
    console.log("message");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchOrders = async () => {
    await getOrders().then((order) => {
      setAllOrders(order);
    });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div style={{ width: "100%", paddingTop: "1rem" }}>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs btnc" : "tabs btnc"}
          onClick={() => toggleTab(1)}
          style={{ color: "#5C5C5C" }}
        >
          Items Data
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs btnc" : "tabs btnc"}
          onClick={() => {
            toggleTab(2);
          }}
          style={{ color: "#5C5C5C" }}
        >
          All Orders
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div
            style={{
              // position: "fixed",
              width: "100%",
              // top: "4.8rem",
              backgroundColor: "rgb(245 243 243)",
              display: "flex",
              //zIndex: "51",
              paddingTop: "8px",
              gap: "5rem",
              // left: "5rem",
              justifyContent: "center",
              //alignItems: "center",
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Search here"
                onChange={(event) => setQuery(event.target.value)}
                style={{
                  padding: "0.4rem",
                  borderRadius: "0.5rem",
                  borderWidth: "1px",
                  borderColor: "#f779e4",
                }}
              />
            </div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to={"/createItem"}>
                <button
                  style={{
                    backgroundColor: "cornflowerblue",
                  }}
                  className="btn"
                >
                  <AiOutlineFileAdd />
                  Add
                </button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to={"/createItem"}>
                <button
                  style={{
                    backgroundColor: "green",
                  }}
                  className="btn"
                  onClick={() => {
                    dispatch({
                      type: actionType.SET_EDIT,
                      isEdit: true,
                    });
                  }}
                  disabled={setItem === null}
                >
                  <AiOutlineEdit />
                  Edit
                </button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <button
                style={{
                  backgroundColor: "red",
                }}
                className="btn"
                onClick={() => {
                  alert("Are you to delete this data?");
                  //const x = "Images/" + setItem.imageURL;

                  const deleteImg = ref(storage, setItem.imageURL);
                  deleteObject(deleteImg)
                    .then(() => {
                      // File deleted successfully
                    })
                    .catch((error) => {
                      // Uh-oh, an error occurred!
                    });

                  deleteData(id);
                  fetchItems();
                }}
                disabled={setItem === null}
              >
                <AiOutlineDelete />
                Delete
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <button
                style={{
                  backgroundColor: "cornflowerblue",
                }}
                className="btn"
                onClick={() => {
                  openModal();
                  fetchData();
                }}
              >
                <BiMessageDots />
                Messages
              </button>
            </motion.div>
          </div>
          <div
            className="w-full grid grid-cols-5 gap-36"
            style={{
              // position: "fixed",
              padding: "1rem",
              backgroundColor: "rgb(239 177 49)",
              // top: "8rem",
              width: "100vw",
              borderRadius: "0.5rem",
              //alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "3rem" }}>Image</div>
            <div>Title</div>
            <div>Category</div>
            <div>Price</div>
            <div>Calories</div>
          </div>
          <div>
            {foodItems && foodItems.length > 0 ? (
              foodItems
                .filter((post) => {
                  if (query === "") {
                    return post;
                  } else if (
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.category.toLowerCase().includes(query.toLowerCase())
                  ) {
                    return post;
                  }
                })
                .map((item) => (
                  <div key={item?.id}>
                    <div
                      className="grid-cols-5 gap-36 gridItem"
                      style={{
                        width: "100vw",
                        display: "grid",
                        alignItems: "center",
                        borderTopWidth: "2px",
                        borderWidth: "2px",
                        borderColor: "rgb(209 213 219)",
                        borderRadius: "0.5rem",
                      }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        setId(item.id);
                        console.log(item.id);
                        dispatch({
                          type: actionType.SET_ITEM,
                          setItem: item,
                        });
                      }}
                    >
                      <motion.div whileHover={{ scale: 1.3 }}>
                        <img
                          src={item?.imageURL}
                          style={{ marginLeft: "3rem" }}
                          className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                          alt=""
                        ></img>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.3 }}>
                        <p style={{ textTransform: "capitalize" }}>
                          {item.title}
                        </p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.3 }}>
                        <p style={{ textTransform: "capitalize" }}>
                          {item.category}
                        </p>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.3 }}>
                        <p>{item.price}</p>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.3 }}>
                        <p>{item.calories}</p>
                      </motion.div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <img src={notFound} alt="" className="h-340" />
                <p className="text-xl text-headingColor font-semibold my-2">
                  Items Not Available
                </p>
              </div>
            )}
          </div>
          <div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="popup">
                <div className="popup2">
                  <h2
                    ref={(_subtitle) => (subtitle = _subtitle)}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontWeight: "600",
                      fontSize: "30px",
                    }}
                  >
                    Messages
                  </h2>
                  <button
                    onClick={closeModal}
                    style={{ position: "absolute", right: "10px" }}
                  >
                    <GrClose />
                  </button>
                </div>

                <div>
                  <div
                    className="w-full grid grid-cols-4"
                    style={{
                      alignItems: "center",
                      textAlign: "center",

                      padding: "0.5rem",
                      backgroundColor: "rgb(170, 242, 102)",

                      borderRadius: "0.5rem",
                    }}
                  >
                    <div>Name</div>
                    <div>Email</div>
                    <div>Messages</div>
                    <div>Reply</div>
                  </div>
                  {data && data.length > 0 ? (
                    data
                      .filter((post) => {
                        if (post.replyed === false) {
                          return post;
                        }
                      })
                      .map((p) => (
                        <div
                          className="w-full grid grid-cols-4"
                          style={{
                            alignItems: "center",
                            textAlign: "center",
                            margin: "5px",
                            borderWidth: "1px",
                            padding: "2px",
                            backgroundColor: "rgb(245 204 140)",
                            borderColor: "rgb(209 213 219)",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <div>
                            <p>{p.name}</p>
                          </div>
                          <div>
                            <p>{p.email}</p>
                          </div>
                          <div>
                            <p>{p.message} </p>
                          </div>
                          <div>
                            <textarea
                              placeholder="reply...."
                              onChange={(e) => {
                                setReply(e.target.value);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  let replyData = {
                                    id: p.id,
                                    reply: reply,
                                    name: p.name,
                                    email: p.email,
                                    message: p.message,
                                    replyed: true,
                                  };
                                  sendReply(replyData);
                                  setReply();
                                  fetchData();
                                }
                              }}
                              style={{
                                borderRadius: "0.5rem",
                              }}
                            />
                          </div>
                        </div>
                      ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
          style={{ backgroundColor: " rgb(245 243 243)" }}
        >
          <div>
            <p style={{ textAlign: "center", fontSize: "1.4rem" }}>Orders</p>
            {allOrders && allOrders.length > 0 ? (
              allOrders.map((i) => (
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
                      <p>PAYMENT ORDER ID</p>
                      <p>{i.orderId}</p>
                    </div>
                  </div>
                  <div
                    className="hdb"
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
                        <span style={{ paddingRight: "0.5rem" }}>
                          Quantity:
                        </span>
                        {i.qty}
                      </p>
                    </div>
                    <div>
                      <p>
                        Payment Id: <span>{i.paymentId}</span>
                      </p>
                      <p>
                        Item Id: <span>{i.item.id}</span>
                      </p>
                      <p>
                        Order Id: <span>{i.myOrderId}</span>
                      </p>
                    </div>
                    <div style={{ marginLeft: "auto", paddingRight: "4rem" }}>
                      <p>
                        <span style={{ paddingRight: "1rem" }}>
                          {i.firstName}
                        </span>
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
                      <p>{i.user}</p>
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
        </div>
      </div>
      {cartShow && <CartContainer />}
    </div>
  );
}
