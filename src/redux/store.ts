import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';
import shopReducer from './shop/shopSlice';
import cartReducer from "./cart/cartSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import controlReducer from "./control/controlSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
    control: controlReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch