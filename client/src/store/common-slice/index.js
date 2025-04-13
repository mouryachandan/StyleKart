import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://stylekart-1-u0g8.onrender.com/api";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch all feature images
export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages",
  async () => {
    const response = await axios.get(`${BASE_URL}/common/feature/get`);
    return response.data;
  }
);

// Add a new feature image
export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage",
  async (image) => {
    const response = await axios.post(`${BASE_URL}/common/feature/add`, {
      image,
    });
    return response.data;
  }
);

const featureImageSlice = createSlice({
  name: "featureImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Feature Images
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })

      // Add Feature Image (you can also update list here if needed)
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.featureImageList.push(action.payload.data);
      });
  },
});

export default featureImageSlice.reducer;
