import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

export const dashboardDetaila = createAsyncThunk(
  "dashboardDetaila",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(`adminAuth/dashboard`);
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

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialStates,
  extraReducers: {
    [dashboardDetaila.pending]: (state) => {
      state.loading = true;
    },
    [dashboardDetaila.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    },
    [dashboardDetaila.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

const { reducer } = dashboardSlice;
export default reducer;
