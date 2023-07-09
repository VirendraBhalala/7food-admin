import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialStates from "./state";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";

// Discount Add Offer
export const discountAddOffer = createAsyncThunk(
  "discountAddOffer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put("adminAuth/update-discount", data);
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
// Discount Get Offer
export const discountGetOffer = createAsyncThunk(
  "discountGetOffer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        "adminAuth/get-admin/discount_details"
      );
      //   toast.success(response.data.msg);
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

const discountSlice = createSlice({
  name: "discount",
  initialState: initialStates,

  extraReducers: {
    // Discount Add Offer
    [discountAddOffer.pending]: (state) => {
      state.loading = true;
    },
    [discountAddOffer.fulfilled]: (state, action) => {
      state.loading = false;
      state.discountAddOfferStatus.data = action.payload;
      state.error = false;
    },
    [discountAddOffer.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Discount Get Offer
    [discountGetOffer.pending]: (state) => {
      state.loading = true;
    },
    [discountGetOffer.fulfilled]: (state, action) => {
      state.loading = false;
      state.discountGetOfferStatus.data = action.payload;
      state.error = false;
    },
    [discountGetOffer.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

const { reducer } = discountSlice;
export default reducer;
