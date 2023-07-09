import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import aboutSlice from "./about/slice";
import authSlice from "./auth/slice";
import categoriesSlice from "./categories/slice";
import customHomeSlice from "./custom-home/slice";
import dashboardSlice from "./dashboard/slice";
import discountSlice from "./discount/slice";
import orderSlice from "./order/slice";
import policySlice from "./policy/slice";
import productsSlice from "./products/slice";
import restaurantSlice from "./restaurant/slice";
import reviewSlice from "./review/slice";
import userDetails from "./userDetails/slice";
import pincodeSlice from "./pincode/slice";

const rootReducer = {
  authData: authSlice,
  dashboardData: dashboardSlice,
  categoriesData: categoriesSlice,
  orderData: orderSlice,
  reviewData: reviewSlice,
  discountData: discountSlice,
  productsData: productsSlice,
  homeadminData: restaurantSlice,
  customHomeData: customHomeSlice,
  aboutData: aboutSlice,
  userData: userDetails,
  policyData: policySlice,
  pincodeData: pincodeSlice,
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

export default store;
