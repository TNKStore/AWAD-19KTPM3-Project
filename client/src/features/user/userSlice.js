/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  saveLocalStorage,
  removeLocaStorage,
  getLocalStorage
} from "../../utils/localStorage";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    token: null
  },
  reducers: {
    saveUser: (state, action) => {
      saveLocalStorage("user", action.payload.user);
      saveLocalStorage("token", action.payload.token);
      state = {
        userInfo: action.payload.user,
        token: action.payload.token
      };
    },
    deleteUser: (state) => {
      removeLocaStorage("user");
      removeLocaStorage("token");
      state = {
        userInfo: null,
        token: null
      };
    },
    loadUserFromLocalStorage: (state) => {
      state = {
        userInfo: getLocalStorage("user"),
        token: getLocalStorage("token")
      };
    }
  }
});

// Action creators are generated for each case reducer function
export const { saveUser, deleteUser, loadUserFromLocalStorage } =
  userSlice.actions;

export default userSlice.reducer;
