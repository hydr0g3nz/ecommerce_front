"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  quantity: number;
}

interface CartState {
  lineItems: CartItem[];
}

const initialState: CartState = {
  lineItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.lineItems = [...state.lineItems, action.payload];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.lineItems = state.lineItems.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.lineItems = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;