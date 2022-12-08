import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: undefined,
  name: undefined,
  email: undefined,
  password: undefined,
  role_id: undefined,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action) => action.payload,
    logout: (_, _action) => initialState,
  },
});

export const getUser = (state) => state.user;

export const { login, logout } = user.actions;
export default user.reducer;
