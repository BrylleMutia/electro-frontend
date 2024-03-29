import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { ShopState, ProductInterface, GroupedProductsInterface, ProductDetailsInterface, ReviewInterface, CategoryInterface } from "./types";
import type { ErrorResponse, UserDetails } from "../auth/types";
import type { ReviewInfo } from "../../components/ProductTabs";
import { tokenConfig } from "../auth/authSlice";

const MAX_PRODUCTS_PER_OFFER = 7;

const initialState: ShopState = {
  products: [],
  offers: {},
  categories: {},
  availableCategories: [],
  sellers: null,
  searchResults: [],
  currentProduct: {
    id: 1,
    created_at: "",
    updated_at: "",
    product_name: "",
    slug: "",
    price: 0,
    product_image: "",
    description: "",
    categories: [
      {
        id: 1,
        name: "",
        created_at: "",
        updated_at: "",
        slug: "",
        pivot: {
          product_id: 1,
          category_id: 1,
        },
      },
    ],
    seller_id: 1,
    seller: {
      id: 1,
      created_at: "",
      updated_at: "",
      name: "",
      email: "",
      phone: "",
      image: "",
      email_verified_at: null,
      address: null,
      barangay: "",
      city: "",
      province: "",
      zip_code: "",
      role_id: 1,
    },
    offer_id: 1,
    offer: {
      id: 1,
      created_at: "",
      updated_at: "",
      offer_title: "",
    },
    reviews: [],
  },
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
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const getProductDetails = createAsyncThunk<ProductDetailsInterface, string, { rejectValue: ErrorResponse }>("shop/getProductDetails", async (id, thunkAPI) => {
  return axios
    .get(`/products/${id}`)
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const searchProducts = createAsyncThunk<ProductInterface[], string, { rejectValue: ErrorResponse }>("shop/searchProducts", async (query, thunkAPI) => {
  return axios
    .get(`/products/search/${query}`)
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const addNewProduct = createAsyncThunk<ProductInterface, FormData, { rejectValue: ErrorResponse }>("shop/addNewProduct", async (newProductInfo, thunkAPI) => {
  return axios
    .post("/products", newProductInfo, tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const submitProductReview = createAsyncThunk<ReviewInterface[], ReviewInfo, { rejectValue: ErrorResponse }>("shop/submitProductReview", async (reviewInfo, thunkAPI) => {
  return axios
    .post("/products/review", reviewInfo, tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const getAllCategories = createAsyncThunk<CategoryInterface[], string, { rejectValue: ErrorResponse }>("shop/getAllCategories", async (_, thunkAPI) => {
  return axios
    .get("/categories", tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const addNewCategory = createAsyncThunk<CategoryInterface, { name: string }, { rejectValue: ErrorResponse }>("shop/addNewCategory", async (newCategory, thunkAPI) => {
  return axios
    .post("/categories", newCategory, tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

// --------------- SLICE
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<ErrorResponse>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action: PayloadAction<ProductInterface[]>) => {
      state.products = action.payload;
      state.offers = groupProductsByOffer(action.payload);
      state.categories = groupProductsByCategory(action.payload);
      state.sellers = getAllSellers(action.payload);
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {},
      };
    });

    builder.addCase(getProductDetails.fulfilled, (state, action: PayloadAction<ProductDetailsInterface>) => {
      state.currentProduct = action.payload;
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {},
      };
    });

    builder.addCase(addNewProduct.fulfilled, (state, action: PayloadAction<ProductInterface>) => {
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {},
      };
    });

    builder.addCase(searchProducts.fulfilled, (state, action: PayloadAction<ProductInterface[]>) => {
      state.searchResults = action.payload;
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {},
      };
    });

    builder.addCase(submitProductReview.fulfilled, (state, action: PayloadAction<ReviewInterface[]>) => {
      state.currentProduct.reviews = action.payload;
      state.isLoading = false;
      state.error = {
        message: "",
        errors: {},
      };
    });

    builder.addCase(getAllCategories.fulfilled, (state, action: PayloadAction<CategoryInterface[]>) => {
      state.availableCategories = action.payload;
      state.isLoading = false;
    });

    builder.addCase(addNewCategory.fulfilled, (state, action: PayloadAction<CategoryInterface>) => {
      state.availableCategories.unshift(action.payload);
      state.isLoading = false;
    });

    builder.addMatcher(isAnyOf(getAllProducts.pending, getProductDetails.pending, addNewProduct.pending, searchProducts.pending, submitProductReview.pending, getAllCategories.pending, addNewCategory.pending), (state) => {
      state.isLoading = true;
      state.error = {
        message: "",
        errors: {},
      };
    });

    builder.addMatcher(
      isAnyOf(getAllProducts.rejected, getAllProducts.rejected, addNewProduct.rejected, getProductDetails.rejected, searchProducts.rejected, submitProductReview.rejected, getAllCategories.rejected, addNewCategory.rejected),
      (state, action: PayloadAction<ErrorResponse>) => {
        state.error = action.payload;
        state.isLoading = false;
      }
    );
  },
});

// --------------- HELPER FUNCTIONS
const groupProductsByOffer = (products: ProductInterface[]) => {
  // group products by similar offer
  let newProducts: GroupedProductsInterface = {};

  products.map((product) => {
    const { offer } = product;
    if (!offer) return;

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

export const { setError } = shopSlice.actions;
export const shopSelector = (state: RootState) => state.shop;
export default shopSlice.reducer;
