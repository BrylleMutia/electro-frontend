import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItemInterface } from "redux/cart/types";
import type { RootState } from "../store";
import type { CartState, OrderInterface } from "./types";
import type { PurchaseDetails } from "../../components/PaymentForm";
import { tokenConfig } from "../auth/authSlice";
import type { ErrorResponse } from "../auth/types";

export const confirmPurchase = createAsyncThunk<OrderInterface, PurchaseDetails, { rejectValue: ErrorResponse }>("shop/purchase", async (purchaseDetails, thunkAPI) => {
  return axios
    .post("/purchase", JSON.stringify(purchaseDetails), tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

// --------------- STATE
const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
  total: 0,
  orderDetails: null,
  isLoading: false,
  error: {
    message: "",
    errors: {},
  },
};

// -------------- SLICE
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartDrawer(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCartDrawer(state) {
      state.isCartOpen = false;
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
    clearCart(state) {
      state.cartItems = [];
      state.total = 0;

      // clear cart on localstorage
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(confirmPurchase.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(confirmPurchase.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
      state.orderDetails = action.payload;
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {},
      };
    });

    builder.addCase(confirmPurchase.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
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

export const { toggleCartDrawer, addItemToCart, removeCartItem, updateCartFromLocalStorage, clearCart, closeCartDrawer } = cartSlice.actions;

// can access this specific slice using useSelector(authSelector)
// other code such as selectors can use the imported `RootState` type
export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
