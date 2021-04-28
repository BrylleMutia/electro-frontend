import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { ShopState, ProductInterface, ErrorResponse } from "../types";
import { useHeaders } from "../hooks";

const initialState: ShopState = {
  products: [],
  offers: [],
  categories: [],
  isLoading: false,
  error: {
    message: "",
    errors: {}
  },
};

export const getAllProducts = createAsyncThunk<ProductInterface[], number, { rejectValue: ErrorResponse, }>("shop/getAllProducts", async (limit, thunkAPI) => {
  return axios
    .get(`/products?limit=${limit}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      });
    });
});

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<ProductInterface[]>) => {
      state.products = action.payload;
    });

    builder.addMatcher(isAnyOf(getAllProducts.rejected), (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
    })
  },
});

export const shopSelector = (state: RootState) => state.shop;

export default shopSlice.reducer;