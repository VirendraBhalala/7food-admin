import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// Put Privacy Policy
export const privacyPolicyPut = createAsyncThunk(
  "privacyPolicyPut",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(
        "adminAuth/update-policy/privacy_policy",
        data
      );
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
// Put Terms and Conditions
export const termsAndConditions = createAsyncThunk(
  "termsAndConditions",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(
        "adminAuth/update-policy/terms_conditions",
        data
      );
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
// Put Return & Refund Policy
export const returnAndRefundPolicy = createAsyncThunk(
  "returnAndRefundPolicy",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(
        "adminAuth/update-policy/return_refund_policy",
        data
      );
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
// Put Shipping Policy
export const shippingPolicyPut = createAsyncThunk(
  "shippingPolicyPut",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(
        "adminAuth/update-policy/shipping_policy",
        data
      );
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
//  Get Privacy Policy
export const privacyPolicyGet = createAsyncThunk(
  "privacyPolicyGet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        "adminAuth/get-policy/privacy_policy"
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
//  Get Get Terms Conditions
export const getTermsConditions = createAsyncThunk(
  "getTermsConditions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        "adminAuth/get-policy/terms_conditions"
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
//  Get Return Refund Policy
export const getReturnRefundPolicy = createAsyncThunk(
  "getReturnRefundPolicy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        "adminAuth/get-policy/return_refund_policy"
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
//  Get Shipping Policy
export const getShippingPolicy = createAsyncThunk(
  "getShippingPolicy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        "adminAuth/get-policy/shipping_policy"
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

const policySlice = createSlice({
  name: "policy",
  initialState: initialStates,
  extraReducers: {
    // Put Privacy Policy
    [privacyPolicyPut.pending]: (state) => {
      state.putPrivacyPolicyStatus.loading = true;
    },
    [privacyPolicyPut.fulfilled]: (state, action) => {
      state.putPrivacyPolicyStatus.loading = false;
      state.putPrivacyPolicyStatus.data = action.payload;
      state.putPrivacyPolicyStatus.error = false;
    },
    [privacyPolicyPut.rejected]: (state) => {
      state.putPrivacyPolicyStatus.loading = false;
      state.putPrivacyPolicyStatus.error = true;
    },
    // Put Terms And Conditions
    [termsAndConditions.pending]: (state) => {
      state.termsAndConditionsStatus.loading = true;
    },
    [termsAndConditions.fulfilled]: (state, action) => {
      state.termsAndConditionsStatus.loading = false;
      state.termsAndConditionsStatus.data = action.payload;
      state.termsAndConditionsStatus.error = false;
    },
    [termsAndConditions.rejected]: (state) => {
      state.termsAndConditionsStatus.loading = false;
      state.termsAndConditionsStatus.error = true;
    },
    // Put Return And Refund Policy
    [returnAndRefundPolicy.pending]: (state) => {
      state.returnAndRefundPolicyStatus.loading = true;
    },
    [returnAndRefundPolicy.fulfilled]: (state, action) => {
      state.returnAndRefundPolicyStatus.loading = false;
      state.returnAndRefundPolicyStatus.data = action.payload;
      state.returnAndRefundPolicyStatus.error = false;
    },
    [returnAndRefundPolicy.rejected]: (state) => {
      state.returnAndRefundPolicyStatus.loading = false;
      state.returnAndRefundPolicyStatus.error = true;
    },
    // Put Shipping Policy
    [shippingPolicyPut.pending]: (state) => {
      state.shippingPolicyStatus.loading = true;
    },
    [shippingPolicyPut.fulfilled]: (state, action) => {
      state.shippingPolicyStatus.loading = false;
      state.shippingPolicyStatus.data = action.payload;
      state.shippingPolicyStatus.error = false;
    },
    [shippingPolicyPut.rejected]: (state) => {
      state.shippingPolicyStatus.loading = false;
      state.shippingPolicyStatus.error = true;
    },
    // Get Privacy Policy
    [privacyPolicyGet.pending]: (state) => {
      state.loading = true;
    },
    [privacyPolicyGet.fulfilled]: (state, action) => {
      state.loading = false;
      state.getPrivacyPolicyStatus.data = action.payload;
      state.error = false;
    },
    [privacyPolicyGet.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Get Terms Conditions
    [getTermsConditions.pending]: (state) => {
      state.loading = true;
    },
    [getTermsConditions.fulfilled]: (state, action) => {
      state.loading = false;
      state.getTermsConditionsStatus.data = action.payload;
      state.error = false;
    },
    [getTermsConditions.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Get Return Refund Policy
    [getReturnRefundPolicy.pending]: (state) => {
      state.loading = true;
    },
    [getReturnRefundPolicy.fulfilled]: (state, action) => {
      state.loading = false;
      state.getGeturnRefundPolicyStatus.data = action.payload;
      state.error = false;
    },
    [getReturnRefundPolicy.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Get Shipping Policy
    [getShippingPolicy.pending]: (state) => {
      state.loading = true;
    },
    [getShippingPolicy.fulfilled]: (state, action) => {
      state.loading = false;
      state.getShippingPolicyStatus.data = action.payload;
      state.error = false;
    },
    [getShippingPolicy.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
const { reducer } = policySlice;
export default reducer;
