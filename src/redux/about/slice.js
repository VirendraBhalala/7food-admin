import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// About Details Put Api
export const aboutDetailsPutData = createAsyncThunk(
  "aboutDetailsPutData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put("adminAuth/update-about", data);
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

// About Details Get Api
export const getAboutDetailesData = createAsyncThunk(
  "getAboutDetailesData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("adminAuth/get-admin/about_details");
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

const aboutSlice = createSlice({
  name: "about",
  initialState: initialStates,
  extraReducers: {
    // About Details Put Api
    [aboutDetailsPutData.pending]: (state) => {
      state.loading = true;
    },
    [aboutDetailsPutData.fulfilled]: (state, action) => {
      state.loading = false;
      state.aboutDetailsDataStatus.data = action.payload;
      state.error = false;
    },
    [aboutDetailsPutData.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // About Details Get Api
    [getAboutDetailesData.pending]: (state) => {
      state.getAboutDetailesDataSatus.loading = true;
    },
    [getAboutDetailesData.fulfilled]: (state, action) => {
      state.getAboutDetailesDataSatus.loading = false;
      state.getAboutDetailesDataSatus.data = action.payload;
      state.getAboutDetailesDataSatus.error = false;
    },
    [getAboutDetailesData.rejected]: (state) => {
      state.getAboutDetailesDataSatus.loading = false;
      state.getAboutDetailesDataSatus.error = true;
    },

    reducers: {
      setAbout: (state) => {
        state.loading = null;
        state.error = null;
      },
    },
  },
});

export const { setAbout } = aboutSlice.actions;
const { reducer } = aboutSlice;
export default reducer;
