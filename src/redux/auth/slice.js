import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// Login Api Admin;
export const loginApiAdmin = createAsyncThunk(
  "loginApiAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.post(`adminAuth/login`, data);
      if (response) {
        sessionStorage.setItem(
          "accessToken",
          response?.data?.token?.access?.token
        );
        sessionStorage.setItem(
          "profileComplete",
          `${response?.data?.profileComplete}`
        );
      }
      AxiosApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.token?.access?.token}`;
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

// Admin Get Profile Data
export const adminGetProfileData = createAsyncThunk(
  "adminGetProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("adminAuth/get-admin/profile");
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

// Admin Put Profile
export const adminProfile = createAsyncThunk(
  "adminProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put("adminAuth/update-profile", data);
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

// Get Admin Data Home
export const getAdminDataHome = createAsyncThunk(
  "getAdminDataHome",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(`adminAuth/get-admin-data`);
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

const authSlice = createSlice({
  name: "auth",
  initialState: initialStates,
  extraReducers: {
    // Login Api Admin;
    [loginApiAdmin.pending]: (state) => {
      state.loading = true;
    },
    [loginApiAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.loginStatus.data = action.payload;
      state.error = false;
    },
    [loginApiAdmin.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Admin Get Profile Data
    [adminGetProfileData.pending]: (state) => {
      state.loading = true;
    },
    [adminGetProfileData.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminGetProfileDataStatus.data = action.payload;
      state.error = false;
    },
    [adminGetProfileData.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Admin Put Profile
    [adminProfile.pending]: (state) => {
      state.loading = true;
    },
    [adminProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminProfileStatus.data = action.payload;
      state.error = false;
    },
    [adminProfile.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Get Admin Data Home
    [getAdminDataHome.pending]: (state) => {
      state.loading = true;
    },
    [getAdminDataHome.fulfilled]: (state, action) => {
      state.loading = false;
      state.getAdminDataHomeStatus.data = action.payload;
      state.error = false;
    },
    [getAdminDataHome.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  reducers: {
    setAuth: (state) => {
      state.loading = null;
      state.error = null;
    },
  },
});
export const { setAuth } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
