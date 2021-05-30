import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { RegisterDetails, LoginDetails } from "../../components/AuthForm";
import { AuthState, AuthResponse, ErrorResponse, UserType, UserDetails, HeadersConfig } from "./types";
import type { OrderInterface } from "../cart/types";

// Define the initial state using that type
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  userType: null,
  userDetails: null,
  orderHistory: [
    {
      id: 1,
      created_at: "",
      updated_at: "",
      user_id: 1,
      transaction_id: "",
      total: 1,
      products: [
        {
          id: 1,
          created_at: "",
          updated_at: "",
          product_name: "",
          slug: "",
          price: "",
          product_image: "",
          description: "",
          seller_id: 1,
          offer_id: 1,
          pivot: {
            order_id: 1,
            product_id: 1,
            quantity: 1,
          },
        },
      ],
    },
  ],
  error: { message: "", errors: {} },
};

// --------------- ACTIONS
// BUYER / USER AUTH

// createAsyncThunk<return type, parameter type, {dispatch?, state?, extra?, rejectValue?}>
// `extra` is useful when we need to pass
// some static data to the request function,
// like jwt-token or HTTP-headers.
//
// `rejectValue` is useful when we need to type
// possible errors.
export const register = createAsyncThunk<AuthResponse, RegisterDetails, { rejectValue: ErrorResponse }>("auth/register", async (regDetails, thunkAPI) => {
  return axios
    .post(`/${regDetails.type}/register`, regDetails.info)
    .then((response) => response.data)
    .catch((err) =>
      // The second argument, `thunkApi`, is an object
      // that contains all those fields
      // and the `rejectWithValue` function:
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const login = createAsyncThunk<AuthResponse, LoginDetails, { rejectValue: ErrorResponse }>("auth/login", async (loginDetails, thunkAPI) => {
  return axios
    .post(`/${loginDetails.type}/login`, loginDetails.info)
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const loadDetails = createAsyncThunk<UserDetails, number, { rejectValue: ErrorResponse }>("auth/loadDetails", async (_, thunkAPI) => {
  return axios
    .get("/verify", tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const logout = createAsyncThunk<{ message: string }, UserType, { rejectValue: ErrorResponse }>("auth/logout", async (userType, thunkAPI) => {
  return axios
    .get(`/${userType}/logout`, tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const getOrderHistory = createAsyncThunk<OrderInterface[], number, { rejectValue: ErrorResponse }>("auth/getOrderHistory", async (limit, thunkAPI) => {
  return axios
    .get(`/buyer/orders?limit=${limit}`, tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

export const updateUserInfo = createAsyncThunk<UserDetails, { userType: UserType; userInfo: FormData }, { rejectValue: ErrorResponse }>("auth/updateUserInfo", async (updateInfo, thunkAPI) => {
  return axios
    .post(`/${updateInfo.userType}/update`, updateInfo.userInfo, tokenConfig())
    .then((response) => response.data)
    .catch((err) =>
      thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      })
    );
});

// ----------------- SLICE
export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = { message: "", errors: {} };
    },
  },
  // extraReducers field is used for listening to other actions dispatched by other slices or async actions
  // builder is used for adding cases, matchers (multiple actions, same mutation), default cases.
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      // reset state
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.userType = null;
      state.userDetails = null;
      state.error = { message: "", errors: {} };

      // remove token in localstorage
      localStorage.removeItem("token");
    });

    builder.addCase(getOrderHistory.fulfilled, (state, action: PayloadAction<OrderInterface[]>) => {
      state.isLoading = false;
      state.orderHistory = action.payload;
    });

    builder.addMatcher(isAnyOf(loadDetails.fulfilled, updateUserInfo.fulfilled), (state, action: PayloadAction<UserDetails>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userDetails = action.payload;
      state.token = localStorage.getItem("token");
      state.userType = action.payload.role_id === 1 ? "buyer" : "seller";
    });

    builder.addMatcher(isAnyOf(register.pending, login.pending, loadDetails.pending, logout.pending, getOrderHistory.pending, updateUserInfo.pending), (state) => {
      state.error = { message: "", errors: {} };
      state.isLoading = true;
    });

    builder.addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userDetails = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.user.role_id === 1 ? "buyer" : "seller";

      //store bearer token in localStorage
      localStorage.setItem("token", action.payload.token);
    });

    builder.addMatcher(isAnyOf(register.rejected, login.rejected, loadDetails.rejected, logout.rejected, getOrderHistory.rejected, updateUserInfo.rejected), (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// -------------- HELPER FUNCTIONS
export const tokenConfig = () => {
  const token = localStorage.getItem("token");

  const config: HeadersConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // add token to headers
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

export const { clearErrors } = authSlice.actions;

// can access this specific slice using useSelector(authSelector)
// other code such as selectors can use the imported `RootState` type
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
