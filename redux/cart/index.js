import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.pid !== action.payload.pid);
    },
    updateCart: (state, action) => {
      var index = state.cart.findIndex(
        (item) => item.pid === action.payload.pid,
      );
      const cart = state.cart;
      cart[index] = action.payload;
      state.cart = cart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const getCart = (state) => state.cart;

export const { addToCart, removeFromCart, updateCart, clearCart } =
  cart.actions;
export default cart.reducer;
