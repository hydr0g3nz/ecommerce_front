"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/features/cart/cartSlice";
import  authReducer from "../app/features/auth/authSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer
    },
  });
};
export type AppStore= ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore ["getState"]>;
export type AppDispatch = AppStore["dispatch"];
