import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { tokenConfig } from "../auth/authSlice";
import type { ErrorResponse } from "../auth/types";
import type { DashboardState, ProductsWithOrderInterface } from "./types";

// ------------ STATE
const initialState: DashboardState = {
  sellerProducts: [],
  isLoading: false,
  error: { message: "", errors: {} },
};

// -------------- ASYNC ACTIONS
export const getSellerProducts = createAsyncThunk<ProductsWithOrderInterface[], string, { rejectValue: ErrorResponse }>("dashboard/getSellerProducts", (limit, thunkAPI) => {
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

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getSellerProducts.pending), (state) => {
      state.isLoading = true;
    })

    builder.addMatcher(isAnyOf(getSellerProducts.rejected), (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    builder.addCase(getSellerProducts.fulfilled, (state, action: PayloadAction<ProductsWithOrderInterface[]>) => {
      state.sellerProducts = action.payload;
      state.isLoading = false;
    })
  },
});


export const dashboardSelector = (state: RootState) => state.dashboard;
export default dashboardSlice.reducer;
