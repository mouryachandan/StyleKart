import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://stylekart-1-u0g8.onrender.com/api";

const initialState = {
  isLoading: false,
  reviews: [],
};

// Add review
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    const response = await axios.post(
      `${BASE_URL}/shop/review/add`,
      formdata
    );

    return response.data;
  }
);

// Get reviews by product ID
export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id) => {
    const response = await axios.get(
      `${BASE_URL}/shop/review/${id}`
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
