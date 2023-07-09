import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";

import initialStates from "./state";

// Restaurant Put Details
export const restaurantDetails = createAsyncThunk(
  "restaurantDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put("adminAuth/update-restaurants", data);
      toast.success(response.data.msg);
      return response.data;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
// Restaurant Get Details
export const getRestaurantDetails = createAsyncThunk(
  "getRestaurantDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("adminAuth/get-admin/restaurants");
      // toast.success(response.data.msg);
      return response.data;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Country Data
export const getCountryData = createAsyncThunk(
  "getCountryData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("country/countryList");
      return response.data;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.massage);
      return rejectWithValue(error.response.data);
    }
  }
);
// Get State Data
export const getStateData = createAsyncThunk(
  "getStateData",
  async (isoCode, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `state/get-state-by-country/${isoCode}`
      );
      return response.data;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.massage);
      return rejectWithValue(error.response.data);
    }
  }
);

const restaurantSlice = createSlice({
  name: "adminHomeData",
  initialState: initialStates,

  extraReducers: {
    // Restaurant Put Details
    [restaurantDetails.pending]: (state) => {
      state.restaurantDetailsStatus.loading = true;
    },
    [restaurantDetails.fulfilled]: (state, action) => {
      state.restaurantDetailsStatus.loading = false;
      state.restaurantDetailsStatus.data = action.payload;
      state.restaurantDetailsStatus.error = false;
    },
    [restaurantDetails.rejected]: (state) => {
      state.restaurantDetailsStatus.loading = false;
      state.restaurantDetailsStatus.error = true;
    },
    // Restaurant Get Details
    [getRestaurantDetails.pending]: (state) => {
      state.getRestaurantDetailsStatus.loading = true;
    },
    [getRestaurantDetails.fulfilled]: (state, action) => {
      state.getRestaurantDetailsStatus.loading = false;
      state.getRestaurantDetailsStatus.data = action.payload;
      state.getRestaurantDetailsStatus.error = false;
    },
    [getRestaurantDetails.rejected]: (state) => {
      state.getRestaurantDetailsStatus.loading = false;
      state.getRestaurantDetailsStatus.error = true;
    },
    // Get Country Data
    [getCountryData.pending]: (state) => {
      state.getCountryDataStatus.loading = true;
    },
    [getCountryData.fulfilled]: (state, action) => {
      state.getCountryDataStatus.loading = false;
      state.getCountryDataStatus.data = action.payload;
      state.getCountryDataStatus.error = false;
    },
    [getCountryData.rejected]: (state) => {
      state.getCountryDataStatus.loading = false;
      state.getCountryDataStatus.error = true;
    },
    // Get State Data
    [getStateData.pending]: (state) => {
      state.getStateDataStatus.loading = true;
    },
    [getStateData.fulfilled]: (state, action) => {
      state.getStateDataStatus.loading = false;
      state.getStateDataStatus.data = action.payload;
      state.getStateDataStatus.error = false;
    },
    [getStateData.rejected]: (state) => {
      state.getStateDataStatus.loading = false;
      state.getStateDataStatus.error = true;
    },
  },
});
const { reducer } = restaurantSlice;
export default reducer;
