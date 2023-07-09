import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Bank, CloseSquare, Import } from "iconsax-react";
import LazyloadLoader from "../../layouts/LazyloadLoader";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "../../commons/DataNotFound";
import "react-datepicker/dist/react-datepicker.css";
import CustomTable from "../../commons/CustomTable";
import Breadcrumb from "../../commons/Breadcrumb";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  adminCancelOrder,
  allOrderGetApi,
  exportAllOrder,
  orderChangeStatus,
} from "../../redux/order/slice";

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //  Modal State
  const [startDate, setStartDate] = useState(new Date(localStorage.getItem('pendingDate')).setHours(0, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date().setHours(0, 0, 0, 0));
  const [orderTab, setOrderTab] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [modalExport, setModalExport] = useState(false);
  const [miniLoding, setMiniLoding] = useState(false);

  const {
    getAllOrderData,
    statusChangeOrder,
    adminCancelOrderData,
    pageLoading,
    exportAllOrderData,
  } = useSelector((store) => ({
    getAllOrderData: store?.orderData?.allOrderGetStatus?.data?.data,
    exportAllOrderData: store?.orderData?.exportAllOrderStatus?.data?.data,
    statusChangeOrder: store?.orderData?.orderStatusChange?.data?.data,
    adminCancelOrderData: store?.orderData?.adminCancelOrderStatus?.data?.data,
    pageLoading: store?.orderData?.loading,
    pageError: store?.orderData?.error,
  }));

  useEffect(() => {
    dispatch(
      allOrderGetApi({
        status: orderTab,
        pageCount: pageCount,
        pageLimit: pageLimit,
        startDate: startDate,
        endDate: endDate,
      })
    );

  }, [
    dispatch,
    pageCount,
    pageLimit,
    orderTab,
    statusChangeOrder,
    adminCancelOrderData,
    startDate,
    endDate
  ]);

  useEffect(() => {
    setPageCount(1);
  }, [pageLimit, orderTab, startDate,
    endDate]);

  const ColumnHeaders = () => {
    return (
      <>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200 rounded-tl-md"
        >
          Order Id
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Full Name
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Amount
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Date
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Order Status
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200 rounded-tr-md"
        >
          Payment Status
        </th>
      </>
    );
  };

  const DataRows = () => {
    return (
      <>
        {(getAllOrderData?.results || [])?.map((element, index) => (
          <tr key={index} className={"border-b text-sm"}>
            <td className="px-5 py-2 text-center">
              <button
                type="button"
                className="text-blue-500 hover:text-black"
                onClick={() => navigate(`/order-invoice/${element.id}`)}
              >
                #{element.order_number}
              </button>
            </td>
            <td className="px-5 py-2 ">
              {element.userId?.first_name} {""}
              {element.userId?.last_name}
            </td>
            <td className="px-5 py-2 ">
              {getAllOrderData?.currency_symbol}
              {element.net_amount}
            </td>
            <td className="px-5 py-2">
              {moment(element.createdAt).format("DD/MM/YYYY")}
            </td>
            <td className="px-5 py-2 min-w-[150px]">
              {(orderTab === "" ||
                orderTab === "Cancel" ||
                orderTab === "Delivered") && (
                  <>
                    <div className="flex items-center">
                      <p
                        className={`${element.status === "Pending" &&
                          `bg-yellowishOrange  border-2 border-theme`
                          } ${element.status === "Canceled" &&
                          `bg-rose-200 border-2 border-red`
                          }  ${element.status === "Receive" &&
                          `bg-green-200 border-2 border-green-500`
                          } ${element.status === "On_the_way" &&
                          `bg-cyan-200  border-2 border-cyan-500`
                          } ${element.status === "Delivered" &&
                          `bg-lime-200  border-2 border-lime-600`
                          } px-2 rounded-md `}
                      >
                        {element.status}
                      </p>
                    </div>
                  </>
                )}

              {orderTab === "Pending" && (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        dispatch(orderChangeStatus(element.id));
                      }}
                      className="px-2 py-0.5 transition duration-200 bg-green-200 border-2 border-green-600 rounded-md hover:bg-transparent hover:shadow-md"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        dispatch(adminCancelOrder(element.id));
                      }}
                      className="px-2 py-0.5 border-2 rounded-md bg-rose-200 border-red hover:shadow-md"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {orderTab === "Receive" && (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        dispatch(orderChangeStatus(element.id));
                      }}
                      className="px-2 py-0.5 bg-blue-200 border-2 border-blue-600 rounded-md hover:shadow-md whitespace-nowrap"
                    >
                      Ready For Delivery
                    </button>
                  </div>
                </>
              )}
              {orderTab === "On_the_way" && (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        dispatch(orderChangeStatus(element.id));
                      }}
                      className="px-2 py-0.5 bg-blue-200 border-2 border-blue-600 rounded-md hover:shadow-md whitespace-nowrap"
                    >
                      On The Way
                    </button>
                  </div>
                </>
              )}
            </td>
            <td className="px-5 py-2 max-w-[400px] mr-4 overflow-auto">
              <Bank size="24" color="#FF8A65" className="mx-auto" />
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <>
      {miniLoding && <LazyloadLoader />}

      <div className={`w-full custom-scroll  `}>
        <section>
          <div className="mb-4 border-b border-gray-200">
            <div className="container px-4 py-2.5 mx-auto flex justify-between items-center flex-wrap gap-4">
              <Breadcrumb
                breadCrumbTitle={"Orders List"}
                breadCrumbParent={"Dashboard"}
                breadCrumbActive={"Orders List"}
              />
              <div className="flex justify-between items-end gap-2 flex-wrap">
                <div className="max-w-[240px] w-full">
                  <label htmlFor="" className="text-sm">
                    Start Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    maxDate={new Date()}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={"Start Date"}
                    className={`border border-1 rounded-lg w-full px-4 py-2`}
                  />
                </div>
                <div className="max-w-[240px] w-full">
                  <label htmlFor="" className="text-sm">
                    End Date
                  </label>
                  <DatePicker
                    selected={endDate}
                    placeholderText={"End Date"}
                    onChange={(date) => setEndDate(date)}
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    minDate={startDate}
                    className={`border border-1 rounded-lg w-full px-4 py-2`}
                  />
                </div>
                <button
                  className={`${`bg-theme`} relative pl-3 pr-9 py-2 flex items-center gap-2 font-semibold text-black rounded-md shadow-md bg-theme text-base hover:bg-theme/90`}
                  onClick={() => {
                    setMiniLoding(true);
                    Promise.all([
                      dispatch(
                        exportAllOrder({
                          startDate: startDate,
                          endDate: endDate,
                        })
                      ),
                    ]).then(() => {
                      setMiniLoding(false);
                      setModalExport(true);
                    });
                  }}
                >
                  Export CSV
                  <Import
                    size="22"
                    className=" absolute top-2 right-2 pointer-events-none"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="container px-4 py-2.5 mx-auto ">
            <div className="mb-4 overflow-auto dateRangePicker">
              <div className="grid grid-cols-6 gap-2 bg-theme/20 p-1.5 rounded-lg overflow-x-auto min-w-[800px] custom-scroll my-2">
                <button
                  type="button"
                  onClick={() => setOrderTab("")}
                  className={`${orderTab === "" ? `bg-theme` : ` bg-theme/20 `
                    } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center flex-wrap justify-center gap-1.5`}
                >
                  All Order
                  <span className="flex items-center justify-center px-1 py-0.5 text-xs text-white bg-gray-400 rounded-full">
                    {getAllOrderData?.all_order ?? 0}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderTab("Pending")}
                  className={`${orderTab === "Pending" ? `bg-theme` : ` bg-theme/20 `
                    } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
                >
                  Pending
                  <span className="flex items-center justify-center px-1 py-0.5 text-xs text-white bg-green-600 rounded-full">
                    {getAllOrderData?.total_pending_order ?? 0}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderTab("Receive")}
                  className={`${orderTab === "Receive" ? `bg-theme` : ` bg-theme/20 `
                    } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
                >
                  Receive
                  <span className="flex items-center justify-center px-1 py-0.5 text-xs text-white bg-blue-600 rounded-full">
                    {getAllOrderData?.total_receive_order ?? 0}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderTab("On_the_way")}
                  className={`${orderTab === "On_the_way" ? `bg-theme` : ` bg-theme/20 `
                    }  font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5 whitespace-nowrap`}
                >
                  On the way
                  <span className="flex items-center justify-center px-1 py-0.5 text-xs text-white bg-cyan-500 rounded-full">
                    {getAllOrderData?.total_onTheWay_order ?? 0}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderTab("Delivered")}
                  className={`${orderTab === "Delivered" ? `bg-theme` : ` bg-theme/20 `
                    } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
                >
                  Delivered
                  <span className="flex items-center justify-center px-1 py-0.5 text-xs text-white bg-green-500 rounded-full">
                    {getAllOrderData?.total_delivered_order ?? 0}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderTab("Cancel")}
                  className={`${orderTab === "Cancel" ? `bg-theme` : ` bg-theme/20 `
                    } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
                >
                  Canceled
                  <span className="flex items-center justify-center px-1 py-0.5 text-xs text-white bg-red rounded-full">
                    {getAllOrderData?.total_canceled_order ?? 0}
                  </span>
                </button>
              </div>
            </div>

            <CustomTable
              columnHeaders={<ColumnHeaders />}
              dataRows={<DataRows />}
              data={getAllOrderData}
              // loader
              loading={pageLoading}
              // showLimit
              setPaginationCurrentLimit={setPageLimit}
              paginationCurrentLimit={pageLimit}
              // paginationData
              total={getAllOrderData?.totalPages}
              current={pageCount}
              paginationData={(crPage) => setPageCount(crPage)}
            />
            <div>
              {modalExport && (
                <div className="backdrop-blur-sm bg-black/40 flex items-center justify-center w-full fixed top-0 left-0 right-0 z-[999999] mx-auto h-screen">
                  <div className="bg-[#fffcf7] flex flex-col items-center drop-shadow-lg rounded-lg w-full max-w-xl min-h-[200px] py-8 px-6 mx-auto relative">
                    {exportAllOrderData?.length > 0 ? (
                      <>
                        <div className="text-center">
                          <p className="text-xl font-bold">Are you sure?</p>{" "}
                          <p className="my-1">
                            Download data <strong>26/09/2022</strong> to{" "}
                            <strong>08/10/2022</strong>
                          </p>
                          <p>Order List in Excel File</p>
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-auto">
                          <div
                            className={`bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2  font-semibold shadow-lg transition duration-200`}
                            onClick={() => {
                              setModalExport(false);
                            }}
                          >
                            {/* ReactHTMLTableToExcel */}
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="download-table-xls-button px-4 py-2"
                              table="table-to-xls"
                              filename={`Order List`}
                              sheet={`Order List`}
                              buttonText="Download"
                            />
                          </div>
                          <button
                            onClick={() => {
                              setModalExport(false);
                            }}
                            className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 px-6 py-2 font-semibold shadow-lg transition duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute top-[10px] right-[10px] z-50">
                          <button
                            type="button"
                            onClick={() => {
                              setModalExport(false);
                            }}
                          >
                            <CloseSquare size={25} color={"#FF8A65"} />
                          </button>
                        </div>
                        <DataNotFound />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <table
              className="w-full text-sm overflow-auto min-w-[800px] custom-scroll hidden"
              id="table-to-xls"
            >
              <thead>
                <tr className="font-semibold bg-gray-200">
                  <th scope="col" className="w-20 p-2.5 ">
                    No.
                  </th>
                  <th scope="col" className="w-20 p-2.5 ">
                    Name
                  </th>
                  <th scope="col" className=" w-20 p-2.5">
                    Amount
                  </th>
                  <th scope="col" className="w-20  p-2.5">
                    Date
                  </th>
                  <th scope="col" className="w-20 p-2.5 ">
                    Order Status
                  </th>
                  <th scope="col" className="w-20 p-2.5 ">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {exportAllOrderData?.map((items, index) => {
                  return (
                    <tr className=" border-b" key={index}>
                      <td className="px-4 py-2">#{items?.order_number}</td>
                      <td className="px-4 py-2">
                        {items?.userId?.first_name + items?.userId?.last_name}
                      </td>
                      <td className="w-[calc(100%-22rem)] p-2.5 truncate 2xl:max-w-[400px] max-w-[400px] ">
                        {items?.net_amount}
                      </td>
                      {/* <td className="  px-4 py-2">
                        {items?.product_data.map((e, i) => `${e}, `)}
                      </td> */}

                      <td> {moment(items?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{items?.status}</td>
                      <td>Bank Transfer</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderList;
