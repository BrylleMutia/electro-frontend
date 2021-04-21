import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { OfferInterface, ProductInterface } from "./types";

const initialState: OfferInterface[] = [];


// export const getAllOffers = createAsyncThunk<>

export const offersSlice = createSlice({
  name: "Offers",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {

  // }
});
