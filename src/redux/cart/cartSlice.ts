import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItemInterface } from "redux/cart/types";
import type { RootState } from "../store";
import type { CartState } from "./types";

// --------------- STATE
const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
  total: 0,
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
        // update item in state
        let product = state.cartItems[productIndex];
        product.quantity = product.quantity + action.payload.quantity;

        // update cart in localstorage
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      } else {
        // add item in current state
        state.cartItems.unshift(action.payload);
        // update cart in localstorage
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }

      // update cart total
      state.total = calculateCartTotal(state.cartItems);
    },
    removeCartItem(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.product.id !== id);
      
      // update item in localstorage
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      
      // update cart total
      state.total = calculateCartTotal(state.cartItems);
    },
    updateCartFromLocalStorage(state) {
      let itemsInStorage = localStorage.getItem("cart");

      if (itemsInStorage) {
        let parsedItemsInStorage = JSON.parse(itemsInStorage);
        state.cartItems = parsedItemsInStorage;

        // update cart total
        state.total = calculateCartTotal(parsedItemsInStorage);
      } else {
        localStorage.setItem("cart", JSON.stringify([]));
      }
    },
  },
});

const calculateCartTotal = (cartItems: CartItemInterface[]) => {
  let totalPrice = cartItems.reduce((totalValue, currentItem) => {
    const { product, quantity } = currentItem;
    let currentItemTotal = Number(product.price) * quantity;
    return (totalValue = totalValue + currentItemTotal);
  }, 0);

  return totalPrice;
};

export const { toggleCartDrawer, addItemToCart, removeCartItem, updateCartFromLocalStorage } = cartSlice.actions;

// can access this specific slice using useSelector(authSelector)
// other code such as selectors can use the imported `RootState` type
export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
