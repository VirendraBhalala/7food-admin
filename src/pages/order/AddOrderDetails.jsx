import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { viewOrderInvoice } from "../../redux/order/slice";
import { useDispatch, useSelector } from "react-redux";
import RippleLoader from "../../commons/RippleLoader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Breadcrumb from "../../commons/Breadcrumb";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import Datamovies from "./Invoice";

const AddOrderDetails = () => {
  const dispatch = useDispatch();
  const orderId = useParams();

  const { getOrderData, orderDetailsLoading, orderDetailsError } = useSelector(
    (store) => ({
      getOrderData: store?.orderData?.viewOrderInvoiceStatus?.data?.data,
      orderDetailsLoading: store?.orderData?.loading,
      orderDetailsError: store?.orderData?.error,
    })
  );

  useEffect(() => {
    if (orderId.id) {
      dispatch(viewOrderInvoice(orderId.id));
    }
  }, [dispatch, orderId.id]);

  // React best pdf download

  return (
    <>
      {orderDetailsLoading && <RippleLoader />}

      <section className={`${orderDetailsLoading && ` hidden `}`}>
        <div className=" border-b border-gray-200">
          <div className="container px-4 py-2.5 mx-auto flex justify-between items-center flex-wrap gap-4">
            <Breadcrumb
              breadCrumbTitle={"Order Invoice"}
              breadCrumbParent={"Dashboard"}
              breadCrumbActive={"Order Invoice"}
            />

            {
              getOrderData &&
              <PDFDownloadLink
                document={<Datamovies getOrderData={getOrderData} />}
                fileName={`#${getOrderData?.orderId?.order_number} invoice.pdf`}
                style={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  padding: "7px 15px",
                  color: "#rgb(0 0 0 / var(--tw-text-opacity))",
                  backgroundColor: "rgb(246 191 99 / var(--tw-bg-opacity))",
                  border: "1px solid rgb(246 191 99 / var(--tw-bg-opacity))",
                  borderRadius: "4px",
                }}
              >
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
              </PDFDownloadLink>
            }

            <div className="lg:max-w-full max-w-[800px] w-full overflow-auto bg-white  shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg">
              <div className="container mx-auto overflow-auto min-w-[800px] custom-scroll p-4">
                <div
                  className={`flex justify-between items-center text-white mb-4 ${getOrderData?.orderId?.status === "Pending" && `bg-theme  `
                    } ${getOrderData?.orderId?.status === "Canceled" && `bg-red `
                    }  ${getOrderData?.orderId?.status === "Receive" &&
                    `bg-green-600 `
                    } ${getOrderData?.orderId?.status === "On_the_way" &&
                    `bg-cyan-600  `
                    } ${getOrderData?.orderId?.status === "Delivered" &&
                    `bg-lime-400 `
                    }}  bg-theme `}
                >
                  <div className="w-40 h-16 overflow-hidden mx-4">
                    <LazyLoadImage
                      effect="blur"
                      width="100%"
                      height="100%"
                      src={getOrderData?.restaurant_logo}
                      alt="Invoice"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className=" p-4">
                    <div className="text-lg font-semibold">
                      {getOrderData?.orderId?.userId?.first_name}{" "}
                      {getOrderData?.orderId?.userId?.last_name}
                    </div>
                    <div className="">
                      <p
                        href={`mailto:${getOrderData?.orderId?.userId?.email}`}
                      >
                        {getOrderData?.orderId?.userId?.email}
                      </p>
                    </div>
                    <div className="">
                      <p href={`tel:${getOrderData?.orderId?.contact_number}`}>
                        {getOrderData?.orderId?.contact_number}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 p-4">
                  <div className="col-span-4">
                    <p className="font-semibold xl:text-lg text-base">
                      BILL TO
                    </p>
                    <address className="not-italic">
                      <p className="max-w-[200px] w-full">
                        {getOrderData?.orderId?.delivery_address?.address}
                        <br />
                        {
                          getOrderData?.orderId?.delivery_address?.city?.label
                        }{" "}
                        {getOrderData?.orderId?.delivery_address?.country} -{" "}
                        {getOrderData?.orderId?.delivery_address?.pincode}
                      </p>
                    </address>
                  </div>
                  <div className="col-span-4 text-center">
                    <p className="font-semibold xl:text-lg text-base">
                      Invoice No.
                    </p>
                    <p>#{getOrderData?.orderId?.order_number}</p>
                    <p className="font-semibold xl:text-lg text-base">
                      Issue Date
                    </p>
                    <p>
                      {moment(getOrderData?.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="col-span-4 text-end">
                    <p className="font-semibold xl:text-lg text-base">
                      Invoice Total
                    </p>
                    <p className="font-semibold xl:text-lg text-base text-theme">
                      {getOrderData?.currency_symbol}
                      {getOrderData?.total_amount}
                    </p>
                    <p className="font-semibold xl:text-lg text-base">
                      Payment Method
                    </p>
                    <p>Bank Transfer</p>
                  </div>
                </div>

                <table className="w-full text-sm  my-4">
                  <thead>
                    <tr className="font-semibold bg-gray-200">
                      <th
                        scope="col"
                        className="min-w-[50px] rounded-tl-md border-r border-lightyellow w-20 p-2.5"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="min-w-[300px] border-r border-lightyellow"
                      >
                        Product name
                      </th>
                      <th
                        scope="col"
                        className="min-w-[70px] rounded-tr-md border-r border-lightyellow"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOrderData?.orderId?.products?.map((element, index) => {
                      return (
                        <tr className="bg-white border-b" key={index}>
                          <td>
                            <div className="p-3 text-black text-center">
                              {index + 1}
                            </div>
                          </td>
                          <th>
                            <div className="p-3 font-medium text-gray-900 whitespace-nowrap flex gap-4">
                              <div>
                                <LazyLoadImage
                                  effect="blur"
                                  width="100%"
                                  height="100%"
                                  src={element?.productId?.productImage[0]}
                                  alt="images"
                                  className="w-14 h-14 rounded-md object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-base">
                                  {element?.productId?.product_name}
                                </p>
                                {element?.addons?.map((data, i) => {
                                  return (
                                    <p
                                      className="text-gray-500 text-sm whitespace-nowrap text-ellipsis overflow-hidden"
                                      key={i}
                                    >
                                      {data?.addonsDescription}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          </th>
                          <td>
                            <div className="p-3">
                              <div className="flex justify-end items-center">
                                {getOrderData?.currency_symbol}
                                {element?.productId?.price} *{" "}
                                {element?.quantity}
                              </div>
                              {/* {element?.addons?.map((data, mrpindex) => {
                                return ( */}
                              {/* <div
                                className="flex justify-end items-center"
                              // key={mrpindex}
                              >
                                {getOrderData?.currency_symbol}
                                {element?.addons?.ProductPrice} * {""}
                                {element?.quantity}
                              </div> */}
                              {/* );
                              })} */}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex justify-end my-5">
                  <div className="border border-gray-200 rounded-lg">
                    <div className="flex justify-between gap-20 px-4 py-2 text-sm">
                      <p className="text-black font-medium">SubTotal</p>
                      <p className="flex items-center">
                        {getOrderData?.currency_symbol}
                        {getOrderData?.orderId?.net_amount}
                      </p>
                    </div>
                    <div className="flex justify-between gap-20 px-4 py-2 text-sm">
                      <p className="text-black font-medium">discount</p>
                      <p className="flex items-center">
                        {getOrderData?.discount}
                        {getOrderData?.discount_type}
                      </p>
                    </div>
                    <div className="flex justify-between gap-20 px-4 py-2 text-sm">
                      <p className="text-black font-medium">
                        Tax ({getOrderData?.tax_status})
                      </p>
                      <p className="flex items-center">
                        {getOrderData?.tax_rate}%
                      </p>
                    </div>
                    <div className="flex justify-between gap-20 px-4 py-2 text-sm">
                      <p className="text-black font-medium">Delivery charge</p>
                      <p className="flex items-center">
                        {getOrderData?.currency_symbol}
                        {getOrderData?.delivery_charge}
                      </p>
                    </div>
                    <div className="flex justify-between gap-20 px-4 py-2 text-sm border-t  bg-gray-200">
                      <p className="text-black font-bold">Total</p>

                      <p className="flex items-center">
                        {getOrderData?.currency_symbol}
                        {getOrderData?.total_amount}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between mb-3">
                  <p className="text-lg text-black font-medium">
                    #{getOrderData?.invoice_number}
                  </p>
                  <p className="text-base text-black font-medium">
                    Status : {getOrderData?.contact_number}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddOrderDetails;
