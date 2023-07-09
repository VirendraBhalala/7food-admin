import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

//  Review All Data
export const getReviewAllData = createAsyncThunk(
  "getReviewAllData",
  async (
    { pageCount, pageLimit, reviewsPublish, searchReviewsValue },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosApi.get(
        `review/review-list?page=${pageCount}&limit=${pageLimit}&isPublish=${reviewsPublish}&search=${searchReviewsValue}`
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
// Change Publish Status Review
export const publishReviewStatus = createAsyncThunk(
  "publishReviewStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`review/publish/${id}`);
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

const reviewSlice = createSlice({
  name: "review",
  initialState: initialStates,
  extraReducers: {
    //  Review All Data
    [getReviewAllData.pending]: (state) => {
      state.loading = true;
    },
    [getReviewAllData.fulfilled]: (state, action) => {
      state.loading = false;
      state.getReviewStatus.data = action.payload;
      state.error = false;
    },
    [getReviewAllData.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Change Publish Status Review
    [publishReviewStatus.pending]: (state) => {
      state.loading = true;
    },
    [publishReviewStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.publishStatus.data = action.payload;
      state.error = false;
    },
    [publishReviewStatus.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

const { reducer } = reviewSlice;
export default reducer;
