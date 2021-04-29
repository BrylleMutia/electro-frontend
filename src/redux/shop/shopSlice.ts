import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { ShopState, ProductInterface, ErrorResponse, GroupedProductsInterface } from "../types";
import { useHeaders } from "../hooks";

const initialState: ShopState = {
  products: [],
  offers: {},
  categories: {},
  isLoading: false,
  error: {
    message: "",
    errors: {},
  },
};

export const getAllProducts = createAsyncThunk<ProductInterface[], number, { rejectValue: ErrorResponse }>("shop/getAllProducts", async (limit, thunkAPI) => {
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

      state.offers = groupProductsByOffer(action.payload);
      state.categories = groupProductsByCategory(action.payload);
    });

    builder.addMatcher(isAnyOf(getAllProducts.rejected), (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
    });
  },
});

const groupProductsByOffer = (products: ProductInterface[]) => {
  // group products by similar offer
  let newProducts: GroupedProductsInterface = {};

  products.map((product) => {
    const { offer } = product;
  
    if (newProducts.hasOwnProperty(offer.offer_title)) {
      newProducts[offer.offer_title].push(product);
    } else newProducts[offer.offer_title] = [product];
  });

  return newProducts;
};

const groupProductsByCategory = (products: ProductInterface[]) => {
  // group products by similar category
  let newProducts: GroupedProductsInterface = {};

  products.map((product) => {
    const { categories } = product;
    
    // one product may have multiple categories
    categories.forEach(category => {
      if (newProducts.hasOwnProperty(category.name)) {
        newProducts[category.name].push(product);
      } else newProducts[category.name] = [product];
    })
  });

  return newProducts;
};


export const shopSelector = (state: RootState) => state.shop;
export default shopSlice.reducer;
