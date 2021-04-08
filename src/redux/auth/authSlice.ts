import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface UserDetails {
  id: number,
  created_at: string,
  updated_at: string,
  name: string,
  email: string,
  email_verified_at: string | null,
  location: string
}

type UserType = "buyer" | "seller";

// Define a type for the slice state
interface AuthState {
  token: string | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  userType: UserType | null,
  userDetails: UserDetails | null
}

// Define the initial state using that type
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  userType: null,
  userDetails: null
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    registerUser: (state) => {
    
    },
    loginUser: (state) => {
    
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    logout: (state, action: PayloadAction<number>) => {

    },
    loadUser: (state) => {
      // check token and load user
      
    },
  },
})

export const { registerUser, loginUser, logout, loadUser } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth

export default authSlice.reducer