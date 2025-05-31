import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "./store";
import { users } from "../utils/data";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? {},
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem("userInfo");
      window.location.href = "/user-auth"
    },
  },
});


console.log(userSlice.actions) // to check stuffs 
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

