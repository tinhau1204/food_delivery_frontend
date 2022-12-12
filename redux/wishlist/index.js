import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (state.wishlist.find((value) => value.pid === action.payload.pid)) {
        state.wishlist = state.wishlist.filter(
          (item) => item.pid !== action.payload.pid,
        );
      } else {
        state.wishlist = [...state.wishlist, action.payload];
      }
    },
  },
});

export const getWishlist = (state) => state.wishlist;

export const { addToWishlist } = wishlist.actions;
export default wishlist.reducer;
