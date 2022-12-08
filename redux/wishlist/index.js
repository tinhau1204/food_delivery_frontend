import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist = [...state.wishlist, action.payload];
    },
    removeFromWishlist: (state, action) => {
      state = state.wishlist.filter((item) => item.id !== action.payload.id);
    },
    // updateCart: (state, action) =>{
    //     var index = state.cart.findIndex(item => item.id === action.payload.id)
    //     const cart = state.cart;
    //     cart[index] = action.payload;
    //     state.cart = cart;
    // },
  },
});

export const getWishlist = (state) => state.wishlist;

export const { addToWishlist, removeFromWishlist } = wishlist.actions;
export default wishlist.reducer;
