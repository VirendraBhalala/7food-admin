import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// Get User Details
export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async ({ search, pageLimit, pageCount }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `auth/userList?page=${pageCount}&limit=${pageLimit}&search=${search}`
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
// Admin Block User
export const adminBlockUser = createAsyncThunk(
  "adminBlockUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`adminAuth/block-user/${id}`);
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
// Get Contact Details
export const getContactDetails = createAsyncThunk(
  "getContactDetails",
  async ({ search, pageLimit, pageCount }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `contactUs/message-list?search=${search}&page=${pageCount}&limit=${pageLimit}`
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

const userDetails = createSlice({
  name: "user",
  initialState: initialStates,
  extraReducers: {
    // Get User Details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.getUserDetailsStatus.data = action.payload;
      state.error = false;
    },
    [getUserDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Admin Block User
    [adminBlockUser.pending]: (state) => {
      state.loading = true;
    },
    [adminBlockUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminBlockUserStatus.data = action.payload;
      state.error = false;
    },
    [adminBlockUser.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Get Contact Details
    [getContactDetails.pending]: (state) => {
      state.loading = true;
    },
    [getContactDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.getContactDetailsStatus.data = action.payload;
      state.error = false;
    },
    [getContactDetails.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
const { reducer } = userDetails;
export default reducer;
