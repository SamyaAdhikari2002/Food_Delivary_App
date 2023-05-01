import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import MainContainer from "./components/MainContainer";
import AddItem from "./components/AddItem";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import { useStateValue } from "./context/StateProvider";

import { actionType } from "./context/Reducer";
import Dashbord from "./components/Dashbord";
import { getData } from "./utils/axiosFunction";
import PrivateRoute from "./components/PrivateRoute";
import WrongUser from "./components/WrongUser";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/Aboutus";
import Services from "./components/Services";
import Footer from "./components/Footer";
import AddressForm from "./components/AddressForm";
import { PaymentPage } from "./components/PaymentPage";
import { Order } from "./components/Order";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchItems = async () => {
    await getData().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <>
      <AnimatePresence>
        <div
          className="flex flex-col "
          style={{
            height: "auto",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(245 243 243)",
          }}
        >
          <Header />

          <SideBar />
          <main
            className="md:mt-20 md:px-16 "
            style={{
              marginTop: "4rem",
              padding: "0rem",
              width: "100%",
            }}
          >
            <Routes>
              <Route exact path="/dashbord" element={<PrivateRoute />}>
                <Route exact path="/dashbord" element={<Dashbord />} />
              </Route>

              <Route path="/*" element={<MainContainer />} />
              <Route path="/createItem" element={<AddItem />} />
              <Route path="/wrongUser" element={<WrongUser />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/service" element={<Services />} />
              <Route path="/setAdress" element={<AddressForm />} />
              <Route path="/makePayment" element={<PaymentPage />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </>
  );
}

export default App;
