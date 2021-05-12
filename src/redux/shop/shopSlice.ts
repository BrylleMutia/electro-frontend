import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { ShopState, ProductInterface, ErrorResponse, GroupedProductsInterface, UserDetails } from "../types";
import { useHeaders } from "../hooks";

const MAX_PRODUCTS_PER_OFFER = 7;

const initialState: ShopState = {
  products: [],
  offers: {},
  categories: {},
  sellers: null,
  currentProduct: null,
  isLoading: false,
  error: {
    message: "",
    errors: {},
  },
};

// -------------- ACTIONS
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

export const getProductDetails = createAsyncThunk<ProductInterface, string, { rejectValue: ErrorResponse }>("shop/getProductDetails", async (id, thunkAPI) => {
  return axios
    .get(`/products/${id}`)
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


// --------------- SLICE
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<ProductInterface[]>) => {
      state.products = action.payload;
      state.offers = groupProductsByOffer(action.payload);
      state.categories = groupProductsByCategory(action.payload);
      state.sellers = getAllSellers(action.payload);
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {}
      }
    });

    builder.addCase(getProductDetails.fulfilled, (state, action: PayloadAction<ProductInterface>) => {
      state.currentProduct = action.payload;
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {}
      }
    });

    builder.addMatcher(isAnyOf(getAllProducts.pending, getProductDetails.pending), (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(isAnyOf(getAllProducts.rejected, getAllProducts.rejected), (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
    });
  },
});


// --------------- HELPER FUNCTIONS
const groupProductsByOffer = (products: ProductInterface[]) => {
  // group products by similar offer
  let newProducts: GroupedProductsInterface = {};

  products.map((product) => {
    const { offer } = product;

    if (newProducts.hasOwnProperty(offer.offer_title)) {
      if (newProducts[offer.offer_title].length < MAX_PRODUCTS_PER_OFFER) {
        newProducts[offer.offer_title].push(product);
      }
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
    categories.forEach((category) => {
      if (newProducts.hasOwnProperty(category.name)) {
        newProducts[category.name].push(product);
      } else newProducts[category.name] = [product];
    });
  });

  return newProducts;
};

const getAllSellers = (products: ProductInterface[]) => {
  let sellers: UserDetails[] = [];

  products.map((product) => {
    const { seller } = product;
    sellers.push(seller);
  });

  // 1. store unique ids using SET to remove duplicates
  // 2. find the index of that unique id from original sellers array
  // 3. use those index to get unique seller details
  // NOTE: You can provide the MAP function as 2nd param to FROM method.
  const uniqueSellers = Array.from(new Set(products.map((product) => product.seller_id)))
    .map((uniqueSellerId) => sellers.findIndex((seller) => seller.id === uniqueSellerId))
    .map((uniqueSellerIndex) => sellers[uniqueSellerIndex]);

  return uniqueSellers;
};



export const shopSelector = (state: RootState) => state.shop;
export default shopSlice.reducer;
