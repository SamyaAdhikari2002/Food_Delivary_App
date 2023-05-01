export const fetchCart = () => {
  const cartInfo =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();
  console.log(cartInfo, "fetch local");
  return cartInfo ? cartInfo : [];
};

export const fetchLocalUser = () => {
  const localUserData =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return localUserData;
};
