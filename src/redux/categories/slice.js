import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// Categories Post Api
export const categoriesAddApi = createAsyncThunk(
  "categoriesAddApi",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AxiosApi.post("categories", data);
      toast.success(res.data.msg);
      return res.data;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Categories Get Api
export const categoriesDataGet = createAsyncThunk(
  "categoriesDataGet",
  async ({ countPage, countLimit, search, disable }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `categories?page=${countPage}&limit=${countLimit}&search=${search}&disable=${disable}`
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

// Categories Get Id Api
export const categoriesGetIDApi = createAsyncThunk(
  "categoriesGetIDApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(`categories/${id}`);
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

// Catrgories Put Api
export const categoriesDataEdit = createAsyncThunk(
  "categoriesDataEdit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`categories/${id}`, data);
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

// Catrgories Disable Api
export const categoriesDisableApi = createAsyncThunk(
  "categoriesDisableApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(`categories/disable/${id}`);
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

// Catrgories Delete Api
export const categoriesDataDelete = createAsyncThunk(
  "categoriesDataDelete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.delete(`categories/${id}`);
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

// category Id View In Products
export const category_Id_View_Products = createAsyncThunk(
  "category_Id_View_Products",
  async ({ id, countLimit, search, pageCount }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get(
        `product/get-product-by-categoryId/${id}?search=${search}&limit=${countLimit}&page=${pageCount}`
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
// Remove Category By Product Id
export const removeCategoryByProductId = createAsyncThunk(
  "removeCategoryByProductId",
  async ({ categoryId, productId }, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.put(
        `product/remove-category/${productId}?categoryId=${categoryId}`
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

// Export Categories All Data
export const exportCategoriesAllData = createAsyncThunk(
  "exportCategoriesAllData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("categories/export-categories");
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialStates,
  extraReducers: {
    // Categories Post Api
    [categoriesAddApi.pending]: (state) => {
      state.categoriesAddStatus.loading = true;
    },
    [categoriesAddApi.fulfilled]: (state, action) => {
      state.categoriesAddStatus.loading = false;
      state.categoriesAddStatus.data = action.payload;
      state.categoriesAddStatus.error = false;
    },
    [categoriesAddApi.rejected]: (state) => {
      state.categoriesAddStatus.loading = false;
      state.categoriesAddStatus.error = true;
    },
    // Categories Get Api
    [categoriesDataGet.pending]: (state) => {
      state.categoriesGetStatus.loading = true;
    },
    [categoriesDataGet.fulfilled]: (state, action) => {
      state.categoriesGetStatus.loading = false;
      state.categoriesGetStatus.data = action.payload;
      state.categoriesGetStatus.error = false;
    },
    [categoriesDataGet.rejected]: (state) => {
      state.categoriesGetStatus.loading = false;
      state.categoriesGetStatus.error = true;
    },
    // Categories Get Id Api
    [categoriesGetIDApi.pending]: (state) => {
      state.categoriesGetIDStatus.loading = true;
    },
    [categoriesGetIDApi.fulfilled]: (state, action) => {
      state.categoriesGetIDStatus.loading = false;
      state.categoriesGetIDStatus.data = action.payload;
      state.categoriesGetIDStatus.error = false;
    },
    [categoriesGetIDApi.rejected]: (state) => {
      state.categoriesGetIDStatus.loading = false;
      state.categoriesGetIDStatus.error = true;
    },
    // Catrgories Put Api
    [categoriesDataEdit.pending]: (state) => {
      state.categoriesEditStatus.loading = true;
    },
    [categoriesDataEdit.fulfilled]: (state, action) => {
      state.categoriesEditStatus.loading = false;
      state.categoriesEditStatus.data = action.payload;
      state.categoriesEditStatus.error = false;
    },
    [categoriesDataEdit.rejected]: (state) => {
      state.categoriesEditStatus.loading = false;
      state.categoriesEditStatus.error = true;
    },
    // Catrgories Disable Api
    [categoriesDisableApi.pending]: (state) => {
      state.categoriesDisableStatus.loading = true;
    },
    [categoriesDisableApi.fulfilled]: (state, action) => {
      state.categoriesDisableStatus.loading = false;
      state.categoriesDisableStatus.data = action.payload;
      state.categoriesDisableStatus.error = false;
    },
    [categoriesDisableApi.rejected]: (state) => {
      state.categoriesDisableStatus.loading = false;
      state.categoriesDisableStatus.error = true;
    },
    // Catrgories Delete Api
    [categoriesDataDelete.pending]: (state) => {
      state.categoriesDeleteStatus.loading = true;
    },
    [categoriesDataDelete.fulfilled]: (state, action) => {
      state.categoriesDeleteStatus.loading = false;
      state.categoriesDeleteStatus.data = action.payload;
      state.categoriesDeleteStatus.error = false;
    },
    [categoriesDataDelete.rejected]: (state) => {
      state.categoriesDeleteStatus.loading = false;
      state.categoriesDeleteStatus.error = true;
    },
    // category Id View In Products
    [category_Id_View_Products.pending]: (state) => {
      state.categoryIdViewProductsStatus.loading = true;
    },
    [category_Id_View_Products.fulfilled]: (state, action) => {
      state.categoryIdViewProductsStatus.loading = false;
      state.categoryIdViewProductsStatus.data = action.payload;
      state.categoryIdViewProductsStatus.error = false;
    },
    [category_Id_View_Products.rejected]: (state) => {
      state.categoryIdViewProductsStatus.loading = false;
      state.categoryIdViewProductsStatus.error = true;
    },
    // Remove Category By Product Id
    [removeCategoryByProductId.pending]: (state) => {
      state.removeCategoryByProductStatus.loading = true;
    },
    [removeCategoryByProductId.fulfilled]: (state, action) => {
      state.removeCategoryByProductStatus.loading = false;
      state.removeCategoryByProductStatus.data = action.payload;
      state.removeCategoryByProductStatus.error = false;
    },
    [removeCategoryByProductId.rejected]: (state) => {
      state.removeCategoryByProductStatus.loading = false;
      state.removeCategoryByProductStatus.error = true;
    },
    // Export CSV All Categories Data
    [exportCategoriesAllData.pending]: (state) => {
      state.exportCategoriesStatus.loading = true;
    },
    [exportCategoriesAllData.fulfilled]: (state, action) => {
      state.exportCategoriesStatus.loading = false;
      state.exportCategoriesStatus.data = action.payload;
      state.exportCategoriesStatus.error = false;
    },
    [exportCategoriesAllData.rejected]: (state) => {
      state.exportCategoriesStatus.loading = false;
      state.exportCategoriesStatus.error = true;
    },
  },

  reducers: {
    liveCategory: (state, action) => {
      const categoriesDataModify = JSON.parse(
        JSON.stringify(state.categoriesGetStatus.data)
      );

      const categoriesIndex = categoriesDataModify?.data?.results?.findIndex(
        (data) => data.id === action.payload
      );

      categoriesDataModify?.data?.results?.splice(categoriesIndex, 1);
      state.categoriesGetStatus.data = categoriesDataModify;
      // Livecategory
      state.categoriesGetStatus.data.Livecategory =
        categoriesDataModify.data.Livecategory -= 1;
      // disablecategory
      state.categoriesGetStatus.data.disablecategory =
        categoriesDataModify.data.disablecategory += 1;

      // totalResults
      state.categoriesGetStatus.data.totalResults =
        categoriesDataModify.data.totalResults -= 1;

      const page = (categoriesDataModify.data.totalPages = Math.ceil(
        categoriesDataModify.data.totalResults / categoriesDataModify.data.limit
      ));

      // totalPages
      state.categoriesGetStatus.data.totalPages = page;
    },
    disableCategory: (state, action) => {
      const categoriesDataModify = JSON.parse(
        JSON.stringify(state.categoriesGetStatus.data)
      );

      const categoriesIndex = categoriesDataModify?.data?.results?.findIndex(
        (data) => data.id === action.payload
      );

      categoriesDataModify?.data?.results?.splice(categoriesIndex, 1);
      state.categoriesGetStatus.data = categoriesDataModify;
      // Livecategory;
      state.categoriesGetStatus.data.Livecategory =
        categoriesDataModify.data.Livecategory += 1;
      // disablecategory
      state.categoriesGetStatus.data.disablecategory =
        categoriesDataModify.data.disablecategory -= 1;
      // totalResults
      state.categoriesGetStatus.data.totalResults =
        categoriesDataModify.data.totalResults -= 1;
      // totalPages;
      const page = (categoriesDataModify.data.totalPages = Math.ceil(
        categoriesDataModify.data.totalResults / categoriesDataModify.data.limit
      ));

      // totalPages
      state.categoriesGetStatus.data.totalPages = page;
    },

    setCategories: (state) => {
      state.status = null;
      state.type = null;
      state.error = null;
    },
  },
});

export const { setCategories, liveCategory, disableCategory } =
  categoriesSlice.actions;
const { reducer } = categoriesSlice;
export default reducer;
