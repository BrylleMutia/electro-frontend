import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { RegisterDetails, LoginDetails } from "../../components/AuthForm";
import { AuthState, AuthResponse, ErrorResponse, LogoutResponse, UserType, UserDetails, HeadersConfig } from "./types";

// Define the initial state using that type
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  userType: null,
  userDetails: null,
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
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      // The second argument, `thunkApi`, is an object
      // that contains all those fields
      // and the `rejectWithValue` function:

      return thunkAPI.rejectWithValue({
        message: err.response.data.message,
        errors: err.response.data?.errors,
      });
    });
});

export const login = createAsyncThunk<AuthResponse, LoginDetails, { rejectValue: ErrorResponse }>("auth/login", async (loginDetails, thunkAPI) => {
  return axios
    .post(`/${loginDetails.type}/login`, loginDetails.info)
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


export const loadDetails = createAsyncThunk<UserDetails, UserType, { rejectValue: ErrorResponse }>("auth/loadDetails", async (userType, thunkAPI) => {
  return axios
    .get(`/${userType}/verify`, tokenConfig())
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

export const logout = createAsyncThunk<{ message: string }, UserType, { rejectValue: ErrorResponse }>("auth/logout", async (userType, thunkAPI) => {
  return axios
    .get(`/${userType}/logout`, tokenConfig())
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
    });

    builder.addCase(loadDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userDetails = action.payload;
      state.token = localStorage.getItem("token");
      state.userType = action.payload.role_id === 1 ? UserType.BUYER : UserType.SELLER;
    });

    builder.addMatcher(isAnyOf(register.pending, login.pending, loadDetails.pending, logout.pending), (state) => {
      state.error = { message: "", errors: {} };
      state.isLoading = true;
    });

    builder.addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userDetails = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.user.role_id === 1 ? UserType.BUYER : UserType.SELLER;

      //store bearer token in localStorage
      localStorage.setItem("token", action.payload.token);
    });

    builder.addMatcher(isAnyOf(register.rejected, login.rejected, loadDetails.pending, logout.rejected), (state, action: PayloadAction<ErrorResponse>) => {
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
