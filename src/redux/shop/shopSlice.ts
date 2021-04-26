import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { ShopState, ProductInterface, ErrorResponse } from "../types";
import { useHeaders } from "../hooks";

const initialState: ShopState = {
  products: [],
  offers: [],
  categories: [],
  error: "",
};

export const getAllProducts = createAsyncThunk<ProductInterface[], { rejectValue: ErrorResponse }>("shop/getAllProducts", async (thunkAPI) => {
  return axios
    .get("/products")
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
    builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<ProductInterface[]>) => {
      state.products = action.payload;
    });
  },
});
