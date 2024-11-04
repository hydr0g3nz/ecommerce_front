import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Variation } from "@/types/product";

export interface CartItem {
  product_id: string;
  name: string;
  brand: string;
  category: string;
  variations: Variation;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  totalDiscount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalDiscount: 0,
};

const calculateTotals = (items: CartItem[]) => {
  return items.reduce(
    (totals, item) => ({
      totalQuantity: totals.totalQuantity + item.quantity,
      totalPrice:
        totals.totalPrice +
        item.variations.price *
          (1 - (item.variations.sale / 100 || 0)) *
          item.quantity,
      totalDiscount:totals.totalDiscount + ((item.variations.sale / 100 || 0) * item.variations.price) * item.quantity,
    }),
    { totalQuantity: 0, totalPrice: 0 ,totalDiscount:0}
  );
};
const calculateDiscount = (items: CartItem[]) => {
  return items.reduce(
    (totals, item) => ({
      totalDiscount: totals.totalDiscount + ((item.variations.sale / 100 || 0) * item.variations.price) * item.quantity,
    }),
    { totalDiscount: 0 }
  );
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.variations.sku === action.payload.variations.sku
      );

      if (existingItemIndex >= 0) {
        // Check stock limit
        const newQuantity =
          state.items[existingItemIndex].quantity + action.payload.quantity;
        if (newQuantity <= action.payload.variations.stock) {
          state.items[existingItemIndex].quantity = newQuantity;
        }
      } else {
        // Verify stock before adding
        if (action.payload.quantity <= action.payload.variations.stock) {
          state.items.push(action.payload);
        }
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = Math.floor(totals.totalPrice);
      state.totalDiscount=Math.floor(totals.totalDiscount)

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
          (item) =>
            !(item.product_id === product_id && item.variations.sku === sku)
        );
      } else {
        const item = state.items.find(
          (item) =>
            item.product_id === product_id && item.variations.sku === sku
        );

        if (item && quantity <= item.variations.stock) {
          item.quantity = quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalDiscount=Math.floor(totals.totalDiscount)
    },

    removeItem: (
      state,
      action: PayloadAction<{ product_id: string; sku: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.product_id === action.payload.product_id &&
            item.variations.sku === action.payload.sku
          )
      );

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      state.totalDiscount=Math.floor(totals.totalDiscount)

    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotals = (state: { cart: CartState }) => ({
  quantity: state.cart.totalQuantity,
  price: state.cart.totalPrice,
  discount: state.cart.totalDiscount
});
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.totalQuantity;

// Helper selectors
export const selectCartItemBySkuAndId =
  (product_id: string, sku: string) => (state: { cart: CartState }) =>
    state.cart.items.find(
      (item) => item.product_id === product_id && item.variations.sku === sku
    );

export default cartSlice.reducer;
