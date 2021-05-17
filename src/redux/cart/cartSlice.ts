import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItemInterface } from "redux/cart/types";
import type { RootState } from "../store";
import type { CartState } from "./types";

// --------------- STATE
const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
  total: 0
};

// -------------- SLICE
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartDrawer(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addItemToCart(state, action: PayloadAction<CartItemInterface>) {
      // just increase quantity if same product is already in cart
      const { id } = action.payload.product;

      let productIndex = state.cartItems.findIndex((item) => item.product.id === id);
      if (productIndex >= 0) {
        let product = state.cartItems[productIndex];
        product.quantity = product.quantity + action.payload.quantity;
      } else {
        state.cartItems.unshift(action.payload);
      }

      // update cart total
      state.total = calculateCartTotal(state.cartItems);
    },
    removeCartItem(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product.id !== id);

      // update cart total
      state.total = calculateCartTotal(state.cartItems);
    },
  },
});

const calculateCartTotal = (cartItems: CartItemInterface[]) => {
  let totalPrice = cartItems.reduce((totalValue, currentItem) => {
    const { product, quantity } = currentItem;
    let currentItemTotal = Number(product.price) * quantity;
    return totalValue = totalValue + currentItemTotal;
  }, 0)

  return totalPrice;
}

export const { toggleCartDrawer, addItemToCart, removeCartItem } = cartSlice.actions;

// can access this specific slice using useSelector(authSelector)
// other code such as selectors can use the imported `RootState` type
export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
