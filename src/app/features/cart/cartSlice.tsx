import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Variation } from '@/types/product';
export interface CartItem {
  product_id: string;
  sku: string;
  quantity: number;
  price: number;
  // Minimal display-related fields
  name: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
  return items.reduce(
    (totals, item) => ({
      totalQuantity: totals.totalQuantity + item.quantity,
      totalPrice: totals.totalPrice + item.price * item.quantity,
    }),
    { totalQuantity: 0, totalPrice: 0 }
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(
        item => item.product_id === action.payload.product_id && 
                item.sku === action.payload.sku
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        product_id: string;
        sku: string;
        quantity: number;
      }>
    ) => {
      const { product_id, sku, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter(
          item => !(item.product_id === product_id && item.sku === sku)
        );
      } else {
        const item = state.items.find(
          item => item.product_id === product_id && item.sku === sku
        );
        if (item) {
          item.quantity = quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    removeItem: (state, action: PayloadAction<{ product_id: string; sku: string }>) => {
      state.items = state.items.filter(
        item => !(item.product_id === action.payload.product_id && 
                 item.sku === action.payload.sku)
      );

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;

// // Essential selectors
// export const selectCartItems = (state: RootState) => state.cart.items;
// export const selectCartTotals = (state: RootState) => ({
//   quantity: state.cart.totalQuantity,
//   price: state.cart.totalPrice,
// });

export default cartSlice.reducer;