import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// Product Post Data Api
export const productPostDataApi = createAsyncThunk(
  "productPostDataApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.post("product/create-product", data);
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
// Product Get data Api
export const productsDataGetApi = createAsyncThunk(
  "productsDataGetApi",
  async ({ countPage, countLimit, search, disable }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `product/product-list?page=${countPage}&limit=${countLimit}&search=${search}&disable=${disable}`
      );
      // toast.success(response.data.msg)
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
// Product Get Id data Api
export const productsGetDataIdApi = createAsyncThunk(
  "productsGetDataIdApi",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(`product/get-product-by-id/${id}`);
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
// Product Put Id data Api
export const productsPutDataIdApi = createAsyncThunk(
  "productsPutDataIdApi",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`product/update-product/${id}`, data);
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
// Product Disable && Unable
export const productDisableUnable = createAsyncThunk(
  "productDisableUnable",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`product/disable/${id}`);
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
// Remove Products Put  Image
export const removeProductImage = createAsyncThunk(
  "removeProductImage",
  async ({ ProductId, ProductImageLink }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(
        `product/delete-image/${ProductId}/${ProductImageLink}`
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

// Export Products All Data
export const exportProductsAllData = createAsyncThunk(
  "exportProductsAllData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("product/export-products");
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

const productsSlice = createSlice({
  name: "product",
  initialState: initialStates,
  extraReducers: {
    // product Post Data Api
    [productPostDataApi.pending]: (state) => {
      state.loading = true;
    },
    [productPostDataApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.productPostStatus.data = action.payload;
      state.error = false;
    },
    [productPostDataApi.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Product Get data Api
    [productsDataGetApi.pending]: (state) => {
      state.loading = true;
    },
    [productsDataGetApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.productsDataGetStatus.data = action.payload;
      state.error = false;
    },
    [productsDataGetApi.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Product Get Id data Api
    [productsGetDataIdApi.pending]: (state) => {
      state.loading = true;
    },
    [productsGetDataIdApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.productsGetDataIdstatus.data = action.payload;
      state.error = false;
    },
    [productsGetDataIdApi.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Product Put Id data Api
    [productsPutDataIdApi.pending]: (state) => {
      state.loading = true;
    },
    [productsPutDataIdApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.productsPutDataSatus.data = action.payload;
      state.error = false;
    },
    [productsPutDataIdApi.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Product Disable && Unable
    [productDisableUnable.pending]: (state) => {
      state.loading = true;
    },
    [productDisableUnable.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDisableUnablestatus.data = action.payload;
      state.error = false;
    },
    [productDisableUnable.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Remove Products Put  Image
    [removeProductImage.pending]: (state) => {
      state.loading = true;
    },
    [removeProductImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.removeProductImageStatus.data = action.payload;
      state.error = false;
    },
    [removeProductImage.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Export Products All Data
    [exportProductsAllData.pending]: (state) => {
      state.exportProductsStatus.loading = true;
    },
    [exportProductsAllData.fulfilled]: (state, action) => {
      state.exportProductsStatus.loading = false;
      state.exportProductsStatus.data = action.payload;
      state.exportProductsStatus.error = false;
    },
    [exportProductsAllData.rejected]: (state) => {
      state.exportProductsStatus.loading = false;
      state.exportProductsStatus.error = true;
    },
  },
  reducers: {
    liveProducts: (state, action) => {
      const productsDataModify = JSON.parse(
        JSON.stringify(state.productsDataGetStatus.data)
      );

      const categoriesIndex = productsDataModify?.data?.results?.findIndex(
        (data) => data.id === action.payload
      );

      productsDataModify?.data?.results?.splice(categoriesIndex, 1);
      state.productsDataGetStatus.data = productsDataModify;
      // LiveProduct
      state.productsDataGetStatus.data.LiveProduct =
        productsDataModify.data.LiveProduct += 1;
      // disableProduct
      state.productsDataGetStatus.data.disableProduct =
        productsDataModify.data.disableProduct -= 1;

      // totalResults
      state.productsDataGetStatus.data.totalResults =
        productsDataModify.data.totalResults -= 1;

      const page = (productsDataModify.data.totalPages = Math.ceil(
        productsDataModify.data.totalResults / productsDataModify.data.limit
      ));

      // totalPages
      state.productsDataGetStatus.data.totalPages = page;
    },
    disableProducts: (state, action) => {
      const productsDataModify = JSON.parse(
        JSON.stringify(state.productsDataGetStatus.data)
      );

      const categoriesIndex = productsDataModify?.data?.results?.findIndex(
        (data) => data.id === action.payload
      );

      productsDataModify?.data?.results?.splice(categoriesIndex, 1);
      state.productsDataGetStatus.data = productsDataModify;
      // LiveProduct;
      state.productsDataGetStatus.data.LiveProduct =
        productsDataModify.data.LiveProduct -= 1;
      // disableProduct
      state.productsDataGetStatus.data.disableProduct =
        productsDataModify.data.disableProduct += 1;
      // totalResults
      state.productsDataGetStatus.data.totalResults =
        productsDataModify.data.totalResults -= 1;

      // totalPages;
      const page = (productsDataModify.data.totalPages = Math.ceil(
        productsDataModify.data.totalResults / productsDataModify.data.limit
      ));
      state.productsDataGetStatus.data.totalPages = page;
    },

    setProducts: (state) => {
      state.loading = false;
      state.error = false;
    },
  },
});

export const { setProducts, liveProducts, disableProducts } =
  productsSlice.actions;
const { reducer } = productsSlice;
export default reducer;
