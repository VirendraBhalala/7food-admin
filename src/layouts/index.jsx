import React, { createContext, useEffect, useState } from "react";
import { getAdminDataHome } from "../redux/auth/slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Provider } from "./layoutContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export const AdminContext = createContext({});

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const [windowScreenWidth, setwindowScreenWidth] = useState(window.innerWidth);

  const getAccessToken = sessionStorage.getItem("accessToken");
  const getProfileStatus = sessionStorage.getItem("profileComplete");

  const [profileStatus, setProfileStatus] = useState("");

  useEffect(() => {
    setProfileStatus(getProfileStatus);
  }, [getProfileStatus]);

  useEffect(() => {
    if (profileStatus === "false") {
      navigate("/restaurant");
    }
  }, [location.pathname, profileStatus]);

  const {
    adminDataGetHome,
    getProfileDataPutReload,
    getRestaurantDataPutReload,
    adminDataGetPageLoading,
  } = useSelector((store) => ({
    adminDataGetHome: store?.authData?.getAdminDataHomeStatus?.data?.data,
    adminDataGetPageLoading: store?.authData?.loading,
    getProfileDataPutReload: store?.authData?.adminProfileStatus?.data?.data,
    getRestaurantDataPutReload:
      store?.homeadminData?.restaurantDetailsStatus?.data?.data,
  }));

  useEffect(() => {
    function handleResize() {
      setwindowScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    windowScreenWidth < 767 && setIsAsideOpen(false);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowScreenWidth]);

  useEffect(() => {
    if (adminDataGetHome) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = `${adminDataGetHome?.favicon_logo}`;
      document.title = `${adminDataGetHome?.restaurant_name ?? "7-Food App"}`;
      localStorage.setItem('pendingDate', adminDataGetHome?.date)
    }
  }, [adminDataGetHome]);

  useEffect(() => {
    dispatch(getAdminDataHome());
  }, [dispatch, getProfileDataPutReload, getRestaurantDataPutReload]);

  return (
    <div className="flex bg-lightyellow">
      {/* {adminDataGetPageLoading && <LazyloadLoader />} */}
      {getAccessToken ? (
        <>
          <AdminContext.Provider value={adminDataGetHome}>
            <Provider value={{ isAsideOpen, setIsAsideOpen }}>
              <Sidebar profileStatus={profileStatus} />
              <div
                className={`h-screen flex flex-col min-w-0 flex-1 overflow-y-hidden overflow-x-hidden`}
              >
                <Header />
                <div className="h-[calc(100vh-6.5rem)] overflow-y-auto">
                  <Outlet />
                </div>
                <Footer />
              </div>
            </Provider>
          </AdminContext.Provider>
        </>
      ) : (
        <>
          <Navigate to={"/login"} replace />
        </>
      )}
    </div>
  );
};

export default MainLayout;
