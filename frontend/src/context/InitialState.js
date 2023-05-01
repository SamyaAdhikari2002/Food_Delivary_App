import { fetchCart, fetchLocalUser } from "../utils/fetchLocalData";

const cartInfo = fetchCart();
const userInfo = fetchLocalUser();

export const initialState = {
  cartShow: false,
  user: userInfo,
  cartItems: cartInfo,
  foodItems: null,
  setItem: null,
  isEdit: false,
  setOrder: null,
};
