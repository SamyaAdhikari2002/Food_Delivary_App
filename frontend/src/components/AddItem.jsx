import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { ImUpload2 } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import "../style/addItem.css";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Loading from "./Loading";
import { storage } from "../firebase.config";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
import { addData, getData } from "../utils/axiosFunction";
const AddItem = () => {
  const [{ foodItems, isEdit, setItem }, dispatch] = useStateValue();
  const [calories, setCalories] = useState(isEdit ? setItem.calories : "");
  const [category, setCategory] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [price, setPrice] = useState(isEdit ? setItem.price : "");
  const [fields, setFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [imageAsset, setImageAsset] = useState(
    isEdit ? setItem.imageURL : null
  );

  const [title, setTitle] = useState(isEdit ? setItem.title : "");

  const setImg = () => {
    setImageAsset(setItem.imageURL);
  };

  const imgUploading = (e) => {
    setIsLoading(true);
    console.log(e.target.files);
    const fileImg = e.target.files[0];
    const imgStoreRef = ref(storage, `Images/${Date.now()}-${fileImg.name}`);
    const upload = uploadBytesResumable(imgStoreRef, fileImg);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    upload.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setFields(true);
        setAlertStatus("danger");
        setMsg("Error uploading");
        setTimeout(() => {
          setIsLoading(false);
          setFields(false);
        }, 5000);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(upload.snapshot.ref).then((downloadUrl) => {
          setIsLoading(false);
          setImageAsset(downloadUrl);
          setFields(true);
          console.log(downloadUrl);
          setMsg("Image uploaded");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const fetchItems = async () => {
    await getData().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteImg = ref(storage, imageAsset);
    deleteObject(deleteImg)
      .then(() => {
        // File deleted successfully
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Image deleted successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const saveAllData = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setAlertStatus("danger");
        setFields(true);
        setMsg("Required fields can't be empty");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        if (isEdit) {
          const data = {
            id: `${setItem.id}`,
            title: title,
            calories: calories,
            price: price,
            imageURL: imageAsset,
            qty: 1,
            category: category,
          };
          addData(data);
          fetchItems();
        } else {
          const data = {
            // id: `${Date.now()}`,
            title: title,
            calories: calories,
            price: price,
            imageURL: imageAsset,
            qty: 1,
            category: category,
          };
          addData(data);
          fetchItems();
        }
        //saveData(data);
        setIsLoading(false);

        setFields(true);
        clearFileds();

        setMsg("Image uploaded");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      setFields(true);
      setAlertStatus("danger");
      setMsg("Error in saving");
      setTimeout(() => {
        setIsLoading(false);
        setFields(false);
      }, 5000);
    }
    fetchItems();
  };

  const clearFileds = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  };
  return (
    <>
      <div
        style={{
          width: "95%",
          minHeight: "100vh",
          display: "flex",

          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "70%",
            borderWidth: "1px",
            borderColor: "rgb(209 213 219)",
            borderRadius: "0.5rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            gap: "1rem",
            height: "fit-content",
          }}
          className="md:w-[50%]"
        >
          {fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fields ${
                alertStatus === "danger"
                  ? "bg-red-400 text-red-800"
                  : "bg-emerald-400 text-emerald-800"
              }`}
            >
              {msg}
            </motion.p>
          )}
          <div
            style={{
              width: "100%",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderBottomWidth: "1px",
              borderColor: "rgb(209 213 219)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <IoFastFood
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                color: "rgb(55 65 81)",
              }}
            />
            <input
              type="text"
              required
              // defaultValue={isEdit ? setItem.title : ""}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give me a title..."
              style={{
                width: "100%",
                height: "100%",
                fonSize: "1.125rem",
                lineHeight: "1.75rem",
                backgroundColor: "transparent",
                outline: "2px solid transparent",
                outlineOffset: "2px",
                borderStyle: "none",
                color: "rgb(81 81 81)",
              }}
            />
          </div>

          <div style={{ width: "100%" }}>
            <select
              onChange={(e) => setCategory(e.target.value)}
              //onChange={(e) => setCategory(setItem.category)}
              style={{
                outline: "2px solid transparent",
                outlineOffset: "2px",
                width: "100%",
                fontSize: "1rem",
                lineHeight: "1.5rem",
                borderBottomWidth: "2px",
                borderColor: "rgb(229 231 235)",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
            >
              <option style={{ backgroundColor: "white" }} value="other">
                Select Category
              </option>
              {categories &&
                categories.map((item) => (
                  <option
                    key={item.id}
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                      borderWidth: "0px",
                      outline: " 2px solid transparent",
                      outlineOffset: "2px",
                      textTransform: "capitalize",
                      backgroundColor: "white",
                      color: "rgb(46 46 46)",
                    }}
                    value={item.urlParamName}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div
            className="md:h-340"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderWidth: "2px",
              borderStyle: "dashed",
              borderColor: "rgb(209 213 219)",
              width: "100%",
              height: "20rem",
              cursor: "pointer",
              borderRadius: "0.5rem",
            }}
          >
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="imgLv " style={{ cursor: "pointer" }}>
                      <div className="imgLv" style={{ gap: " 0.5rem" }}>
                        <ImUpload2
                          style={{
                            color: "rgb(107 114 128 )",
                            fontSize: "1.875rem",
                            lineHeight: "2.25rem",
                          }}
                        />
                        <p style={{ color: "rgb(107 114 128)" }}>
                          Click here to upload
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={imgUploading}
                        style={{ width: "0px", height: "0px" }}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full">
                      <img
                        src={imageAsset}
                        alt="uploaded_image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                      <button
                        type="button"
                        className="  hover:shadow-md  transition-all ease-in-out"
                        onClick={deleteImage}
                        style={{
                          position: "absolute",
                          bottom: "0.75rem",
                          right: "0.75rem",
                          padding: "0.75rem",
                          borderRadius: "50%",
                          backgroundColor: "red",
                          cursor: "pointer",
                          outline: "2px solid transparent",
                          outlineOffset: "2px",
                          transitionDuration: "500ms",
                        }}
                      >
                        <RiDeleteBin5Fill style={{ color: "white" }} />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",

              gap: "0.75rem",
            }}
            className="md:flex-row"
          >
            <div
              style={{
                width: "100%",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                borderBottomWidth: "1px",
                borderColor: "rgb(209 213 219)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <MdFoodBank
                style={{
                  color: "rgb(55 65 81)",
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                }}
              />
              <input
                type="text"
                required
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Calories"
                className=" placeholder:text-gray-400 "
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "1.125rem",
                  lineHeight: "1.75rem",
                  backgroundColor: "transparent",
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                  borderStyle: "none",
                  color: "rgb(81 81 81)",
                }}
              />
            </div>

            <div
              style={{
                width: "100%",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                borderBottomWidth: "1px",
                borderColor: "rgb(209 213 219)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaRupeeSign
                style={{
                  color: "rgb(55 65 81)",
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                }}
              />
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className=" placeholder:text-gray-400 "
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "1.125rem",
                  lineHeight: "1.75rem",
                  backgroundColor: "transparent",
                  outline: "2px solid transparent",
                  outlineOffset: "2px",
                  borderStyle: "none",
                  color: "rgb(81 81 81)",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <button
              type="button"
              className="button md:ml-auto  md:w-auto  "
              onClick={saveAllData}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
