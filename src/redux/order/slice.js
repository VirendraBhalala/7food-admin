import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// All Order Get Api
export const allOrderGetApi = createAsyncThunk(
  "allOrderGetApi",
  async (
    { status, pageCount, pageLimit, startDate, endDate },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosApi.get(
        `order/order-list?status=${status}&page=${pageCount}&limit=${pageLimit}&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`
      );
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
// Order Change Status Api
export const orderChangeStatus = createAsyncThunk(
  "orderChangeStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`order/change-status/${id}`);
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
// Admin Cancel Order Api
export const adminCancelOrder = createAsyncThunk(
  "adminCancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`order/cancel-order/${id}`);
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
// View Order Invoice Api
export const viewOrderInvoice = createAsyncThunk(
  "viewOrderInvoice",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `invoice/get-invoice-by-orderId/${id}`
      );
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

export const exportAllOrder = createAsyncThunk(
  "exportAllOrder",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `order/order-list?start_date=${startDate}&end_date=${endDate}`
      );
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

const orderSlice = createSlice({
  name: "order",
  initialState: initialStates,
  extraReducers: {
    // All Order Get Api
    [allOrderGetApi.pending]: (state) => {
      state.loading = true;
    },
    [allOrderGetApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.allOrderGetStatus.data = action.payload;
      state.error = false;
    },
    [allOrderGetApi.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Order Change Status Api
    [orderChangeStatus.pending]: (state) => {
      state.loading = true;
    },
    [orderChangeStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderStatusChange.data = action.payload;
      state.error = false;
    },
    [orderChangeStatus.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Admin Cancel Order Api
    [adminCancelOrder.pending]: (state) => {
      state.loading = true;
    },
    [adminCancelOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminCancelOrderStatus.data = action.payload;
      state.error = false;
    },
    [adminCancelOrder.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // View Order Invoice Api
    [viewOrderInvoice.pending]: (state) => {
      state.loading = true;
    },
    [viewOrderInvoice.fulfilled]: (state, action) => {
      state.loading = false;
      state.viewOrderInvoiceStatus.data = action.payload;
      state.error = false;
    },
    [viewOrderInvoice.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Export All Order Api
    [exportAllOrder.pending]: (state) => {
      state.exportAllOrderStatus.loading = true;
    },
    [exportAllOrder.fulfilled]: (state, action) => {
      state.exportAllOrderStatus.loading = false;
      state.exportAllOrderStatus.data = action.payload;
      state.exportAllOrderStatus.error = false;
    },
    [exportAllOrder.rejected]: (state) => {
      state.exportAllOrderStatus.loading = false;
      state.exportAllOrderStatus.error = true;
    },
  },
});

const { reducer } = orderSlice;
export default reducer;
