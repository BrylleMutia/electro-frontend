import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { RegisterInfo, LoginInfo } from "../../components/Auth"
import { AuthState, AuthResponse, ErrorResponse } from "./types"



// Define the initial state using that type
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  userType: null,
  userDetails: null,
  error: { message: "" },
};


// BUYER / USER AUTH

// createAsyncThunk<return type, parameter type, {dispatch?, state?, extra?, rejectValue?}>
// `extra` is useful when we need to pass 
// some static data to the request function,
// like jwt-token or HTTP-headers.
//
// `rejectValue` is useful when we need to type 
// possible errors.
export const registerUser = createAsyncThunk<AuthResponse, RegisterInfo, { rejectValue: ErrorResponse }>("auth/registerUser", async (regInfo, thunkAPI) => {
  return axios.post("/user/register", regInfo)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      // The second argument, `thunkApi`, is an object
      // that contains all those fields
      // and the `rejectWithValue` function:

      return thunkAPI.rejectWithValue({ 
        message: err.response.data 
      })
    });
});

export const loginUser = createAsyncThunk<AuthResponse, LoginInfo, { rejectValue: ErrorResponse }>("auth/loginUser", async (loginInfo, thunkAPI) => {
  return axios
    .post("/user/login", loginInfo)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return thunkAPI.rejectWithValue({ 
        message: err.response.data 
      })
    });
});

// SELLER AUTH
export const registerSeller = createAsyncThunk<AuthResponse, RegisterInfo, { rejectValue: ErrorResponse }>("auth/registerSeller", async (regInfo, thunkAPI) => {
  return axios.post("/seller/register", regInfo)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return thunkAPI.rejectWithValue({ 
        message: err.response.data 
      })
    });
});

export const loginSeller = createAsyncThunk<AuthResponse, LoginInfo, { rejectValue: ErrorResponse }>("auth/loginSeller", async (loginInfo, thunkAPI) => {
  return axios
    .post("/seller/login", loginInfo)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return thunkAPI.rejectWithValue({ 
        message: err.response.data 
      })
    });
});

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  // extraReducers field is used for listening to other actions dispatched by other slices or async actions
  // builder is used for adding cases, matchers (multiple actions, same mutation), default cases.
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(registerUser.pending, registerSeller.pending), (state) => {
      state.error = { message: ""};
      state.isLoading = true;
    });

    builder.addMatcher(isAnyOf(registerUser.fulfilled, registerSeller.fulfilled), (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userDetails = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addMatcher(isAnyOf(registerUser.rejected, registerSeller.rejected), (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const { loginUser, logout, loadUser } = authSlice.actions


// can access this specific slice using useSelector(authSelector)
// other code such as selectors can use the imported `RootState` type
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
