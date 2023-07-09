import React, { useEffect } from "react";
import { Category, Profile2User, Money, Reserve } from "iconsax-react";
import { dashboardDetaila } from "../../redux/dashboard/slice";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "./BarChart";
import RippleLoader from "../../commons/RippleLoader";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboardGetData, loadingPage } = useSelector((store) => ({
    dashboardGetData: store?.dashboardData?.data?.data,
    loadingPage: store?.dashboardData?.loading,
  }));

  useEffect(() => {
    dispatch(dashboardDetaila());
  }, [dispatch]);

  return (
    <>
      {loadingPage && <RippleLoader />}
      {/* dashboard */}
      {loadingPage ? (
        <></>
      ) : (
        <>
          <div className="w-full mt-8 px-6">
            <section>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-center gap-5 mb-4">
                <div className="bg-white drop-shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg p-5">
                  <div className="flex justify-between items-center mb-1">
                    <p className="xl:text-3xl text-2xl font-bold text-balck">
                      {dashboardGetData?.categoryCount}
                    </p>
                    <Category
                      size="50"
                      className="text-white bg-amber-400 rounded-md p-2.5"
                    />
                  </div>
                  <div className="xl:text-lg md:text-base text-sm text-black/80">
                    Categories
                  </div>
                </div>
                <div className="bg-white drop-shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg p-5">
                  <div className="flex justify-between items-center mb-1">
                    <p className="xl:text-3xl text-2xl font-bold text-balck">
                      {dashboardGetData?.orderCount}
                    </p>
                    <Reserve
                      size="50"
                      className="text-white bg-amber-400 rounded-md p-2.5"
                    />
                  </div>
                  <div className="xl:text-lg md:text-base text-sm text-black/80">
                    Orders
                  </div>
                </div>

                <div className="bg-white drop-shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg p-5">
                  <div className="flex justify-between items-center mb-1">
                    <p className="xl:text-3xl text-2xl font-bold text-balck">
                      {dashboardGetData?.userCount}
                    </p>
                    <Profile2User
                      size="50"
                      className="text-white bg-amber-400 rounded-md p-2.5"
                    />
                  </div>
                  <div className="xl:text-lg md:text-base text-sm text-black/80">
                    Customer
                  </div>
                </div>

                <div className="bg-white drop-shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg p-5">
                  <div className="flex justify-between items-center mb-1">
                    <p className="xl:text-3xl text-2xl font-bold text-balck">
                      {dashboardGetData?.currency_symbol}{" "}
                      {dashboardGetData?.revenue?.toFixed(2) ?? 0}
                    </p>
                    <Money
                      size="50"
                      className="text-white bg-amber-400 rounded-md p-2.5"
                    />
                  </div>
                  <div className="xl:text-lg md:text-base text-sm text-black/80">
                    Revenue
                  </div>
                </div>
              </div>
              <div>
                <BarChart
                  orderData={dashboardGetData?.orderChart}
                  revanueData={dashboardGetData?.revenueChart}
                />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
