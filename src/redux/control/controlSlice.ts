import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import type { ControlState, AlertInterface } from "./types";
import type { ErrorResponse, UserDetails } from "../auth/types";
import { login } from "../auth/authSlice";

const initialState: ControlState = {
  alert: {
    alertVariant: "success",
    alertMsg: null,
    isAlertShown: false,
  },
};

export const controlSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    showNotif(state, action: PayloadAction<AlertInterface>) {
      state.alert = action.payload;
      state.alert.isAlertShown = true;
    },
    hideNotif(state, action: PayloadAction<AlertInterface>) {
      state.alert = action.payload;
      state.alert.isAlertShown = false;
    },
  }
});


export const { showNotif, hideNotif } = controlSlice.actions;
export const controlSelector = (state: RootState) => state.control;
export default controlSlice.reducer;
