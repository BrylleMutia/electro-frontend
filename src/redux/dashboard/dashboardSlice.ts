import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { tokenConfig } from "../auth/authSlice";
import type { ErrorResponse } from "../auth/types";
import type { DashboardState, ProductsWithOrderInterface, OrderWithUserProductsAndStatusInterface } from "./types";
import type { OrderInterface } from "../cart/types";

// ------------ STATE
const initialState: DashboardState = {
  sellerProducts: [],
  productOrders: [],
  isLoading: false,
  error: { message: "", errors: {} },
};

// -------------- ASYNC ACTIONS
export const getSellerProducts = createAsyncThunk<ProductsWithOrderInterface[], number, { rejectValue: ErrorResponse }>("dashboard/getSellerProducts", (limit, thunkAPI) => {
  return axios
    .get("/seller/products", tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const getProductOrders = createAsyncThunk<OrderWithUserProductsAndStatusInterface[], number, { rejectValue: ErrorResponse }>("dashboard/getProductOrders", (limit, thunkAPI) => {
  return axios
    .get("/seller/orders", tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const updateOrderStatus = createAsyncThunk<OrderInterface, { id: number; status_id: number }, { rejectValue: ErrorResponse }>("dashbord/updateOrderStatus", (orderDetails, thunkAPI) => {
  return axios
    .patch(`orders/update/${orderDetails.id}`, orderDetails, tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSellerProducts.fulfilled, (state, action: PayloadAction<ProductsWithOrderInterface[]>) => {
      state.sellerProducts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getProductOrders.fulfilled, (state, action: PayloadAction<OrderWithUserProductsAndStatusInterface[]>) => {
      state.productOrders = action.payload;
      state.isLoading = false;
    });

    builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<OrderInterface>) => {
      // find updated product index using id
      let updatedOrderIndex = state.productOrders.findIndex((order) => order.id === action.payload.id);
      state.productOrders[updatedOrderIndex] = { ...state.productOrders[updatedOrderIndex], ...action.payload };
      state.isLoading = false;
    });

    builder.addMatcher(isAnyOf(getSellerProducts.pending, updateOrderStatus.pending), (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(isAnyOf(getSellerProducts.rejected, updateOrderStatus.rejected), (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const dashboardSelector = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
