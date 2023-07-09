import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// Custom Put Details
export const customHomeDetails = createAsyncThunk(
  "customHomeDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put("adminAuth/update-home-custom", data);
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
// Get Custom Details
export const getCustomHomeDetails = createAsyncThunk(
  "getCustomHomeDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        "adminAuth/get-admin/home_customs_details"
      );
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
// Add Offer Details
export const addOfferDetails = createAsyncThunk(
  "addOfferDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.post("adminAuth/add-offer", data);
      // toast.success(response.data.msg);
      return response;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
//  Get All Offer Details
export const getAllOfferDetails = createAsyncThunk(
  "getAllOfferDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("adminAuth/get-all-offer");
      // toast.success(response.data.msg);
      return response;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
//   Offer Get By Id Details
export const offerGetByIdDetails = createAsyncThunk(
  "offerGetByIdDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(`adminAuth/get-offer-by-id/${id}`);
      // toast.success(response.data.msg);
      return response;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
//  Edit Offer Details
export const editOfferDetails = createAsyncThunk(
  "editOfferDetails",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`adminAuth/update-offer/${id}`, data);
      toast.success(response.data.msg);
      return response;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
//  Delete Offer Details
export const deleteOfferDetails = createAsyncThunk(
  "deleteOfferDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`adminAuth/remove-offer/${id}`);
      toast.success(response.data.msg);
      return response;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);
//  Popular Categories
export const popularCategories = createAsyncThunk(
  "popularCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(`categories/categoryList`);
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

const customHomeSlice = createSlice({
  name: "customHome",
  initialState: initialStates,
  extraReducers: {
    //  Put Custom Details
    [customHomeDetails.pending]: (state) => {
      state.loading = true;
    },
    [customHomeDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.customHomeDetailsStatus.data = action.payload;
      state.error = false;
    },
    [customHomeDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    //  Get Custom Details
    [getCustomHomeDetails.pending]: (state) => {
      state.getCustomHomeDetailsStatus.loading = true;
    },
    [getCustomHomeDetails.fulfilled]: (state, action) => {
      state.getCustomHomeDetailsStatus.loading = false;
      state.getCustomHomeDetailsStatus.data = action.payload;
      state.getCustomHomeDetailsStatus.error = false;
    },
    [getCustomHomeDetails.rejected]: (state) => {
      state.getCustomHomeDetailsStatus.loading = false;
      state.getCustomHomeDetailsStatus.error = true;
    },
    //  Add Offer Details
    [addOfferDetails.pending]: (state) => {
      state.loading = true;
    },
    [addOfferDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.addOfferDetailsStatus.data = action.payload;
      state.error = false;
    },
    [addOfferDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    //  Get All Offer Details
    [getAllOfferDetails.pending]: (state) => {
      state.loading = true;
    },
    [getAllOfferDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.getAllOfferStatus.data = action.payload;
      state.error = false;
    },
    [getAllOfferDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    //  Offer Get By Id Details
    [offerGetByIdDetails.pending]: (state) => {
      state.loading = true;
    },
    [offerGetByIdDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.offerGetByIdStatus.data = action.payload;
      state.error = false;
    },
    [offerGetByIdDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    //  Edit Offer Details
    [editOfferDetails.pending]: (state) => {
      state.loading = true;
    },
    [editOfferDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.editOfferStatus.data = action.payload;
      state.error = false;
    },
    [editOfferDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    //  Delete Offer Details
    [deleteOfferDetails.pending]: (state) => {
      state.loading = true;
    },
    [deleteOfferDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.deleteOfferStatus.data = action.payload;
      state.error = false;
    },
    [deleteOfferDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    //  Popular Categories
    [popularCategories.pending]: (state) => {
      state.popularCategoriesStatus.loading = true;
    },
    [popularCategories.fulfilled]: (state, action) => {
      state.popularCategoriesStatus.loading = false;
      state.popularCategoriesStatus.data = action.payload;
      state.popularCategoriesStatus.error = false;
    },
    [popularCategories.rejected]: (state) => {
      state.popularCategoriesStatus.loading = false;
      state.popularCategoriesStatus.error = true;
    },
  },
});
const { reducer } = customHomeSlice;
export default reducer;
