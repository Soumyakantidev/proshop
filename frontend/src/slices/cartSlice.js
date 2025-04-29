import { createSlice } from "@reduxjs/toolkit";
import { addDecimal } from "../utils/cardUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //Calculate items price
      state.itemPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //Calculate shipping price (If order is over ₹100 then free,else ₹10 shipping)
      state.shippingPrice = addDecimal(state.itemPrice > 100 ? 0 : 10);

      //Calculate tax price (15% tax)

      state.taxPrice = addDecimal(Number((state.itemPrice * 0.15).toFixed(2)));

      //Calculate total price

      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
