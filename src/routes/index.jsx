import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "../layouts";
import Dashboard from "../pages/dashboard/Dashboard";
import Auth from "../pages/auth/Auth";
import Profile from "../pages/user-details/Profile";
import Categories from "../pages/categories/Categories";
import AddCategory from "../pages/categories/AddCategory";
import CategoriesDetails from "../pages/categories/CategoriesDetails";
import Products from "../pages/products/Products";
import AddProduct from "../pages/products/AddProduct";
import Review from "../pages/review/Review";
import OrderList from "../pages/order/OrderList";
import AddOrderDetails from "../pages/order/AddOrderDetails";
import Restaurant from "../pages/custom-pages/Restaurant";
import CustomDetails from "../pages/custom-pages/CustomDetails";
import About from "../pages/custom-pages/About";
import UserDetails from "../pages/user-details/UserDetails";
import ContactDetails from "../pages/user-details/ContactDetails";
import Helper1 from "../pages/user-details/Helper1";
import Page404 from "../commons/Page404";
import Page500 from "../commons/Page500";
import DiscountOffers from "../pages/discount-page/DiscountOffers";
import PinCode from "../pages/pin-code/PinCode";

const AppRoutes = () => {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      <Routes>
        {/* Auth */}
        <Route exact path="/login" element={<Auth />} />

        {/* DefaultLayout */}
        <Route path="/" element={<DefaultLayout />}>
          {/* Dashboard */}
          <Route index exact element={<Dashboard />} />

          {/* Categories */}
          <Route exact path="/categories" element={<Categories />} />
          {/* Add AddCategory */}
          <Route exact path="/add-category" element={<AddCategory />} />
          {/* Edit AddCategory */}
          <Route exact path="/edit-category" element={<AddCategory />} />
          {/* CategoriesDetails */}
          <Route
            exact
            path="/categories-details/:id"
            element={<CategoriesDetails />}
          />

          {/* Products */}
          <Route exact path="/products" element={<Products />} />
          {/* Add CreateProduct */}
          <Route exact path="/create-product" element={<AddProduct />} />
          {/* Edit CreateProduct */}
          <Route exact path="/edit-product" element={<AddProduct />} />

          {/* Review */}
          <Route exact path="/reviews" element={<Review />} />

          {/* OrderList */}
          <Route exact path="/order-list" element={<OrderList />} />
          {/* AddOrder Details */}
          <Route
            exact
            path="/order-invoice/:id"
            element={<AddOrderDetails />}
          />

          {/* Discount Pages */}
          <Route exact path="/discount" element={<DiscountOffers />} />

          {/* Pin Code */}
          <Route exact path="/pin-code" element={<PinCode />} />

          {/* Profile */}
          <Route exact path="/profile" element={<Profile />} />
          {/* Restaurant Details */}
          <Route exact path="/restaurant" element={<Restaurant />} />
          {/* Custom Details */}
          <Route exact path="/custom-details" element={<CustomDetails />} />
          {/* About Us */}
          <Route exact path="/about-us" element={<About />} />
          {/* User Details */}
          <Route exact path="/user-details" element={<UserDetails />} />
          {/* Contact Details */}
          <Route exact path="/contact-details" element={<ContactDetails />} />
          {/* Helper1 */}
          <Route exact path="/helper1" element={<Helper1 />} />
          {/* Page 404 */}
          <Route
            exact
            path="*"
            name="Page 404"
            status={404}
            element={<Page404 />}
          />
          {/* Page 500 */}
          <Route
            exact
            path="/500"
            name="Page 500"
            status={500}
            element={<Page500 />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
