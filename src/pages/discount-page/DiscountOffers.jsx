import React, { useState, useEffect, useContext } from "react";
import { discountAddOffer, discountGetOffer } from "../../redux/discount/slice";
import { InputError } from "../../commons/MicroComponents";
import { useDispatch, useSelector } from "react-redux";
import RippleLoader from "../../commons/RippleLoader";
import { FieldArray, Form, Formik } from "formik";
import Breadcrumb from "../../commons/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../layouts";
import { Trash } from "iconsax-react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const DiscountOffers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currency_symbol = useContext(AdminContext);

  const [checkedState, setCheckedState] = useState(false);
  const [checkedAllOrder, setCheckedAllOrder] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const {
    discountGetData,
    discountPageLoading,
    discountPageError,
    discountPutData,
  } = useSelector((store) => ({
    discountGetData: store?.discountData?.discountGetOfferStatus?.data?.data,
    discountPutData:
      store?.discountData?.discountAddOfferStatus?.data?.data.data,
    discountPageLoading: store?.discountData?.loading,
    discountPageError: store?.discountData?.error,
  }));

  // handleDelete
  const handleDelete = (arrayHelpers, indexId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "error",
      type: "warning",
      html: `You won't be able to revert this!`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((response) => {
      if (response.isConfirmed === true) {
        arrayHelpers.remove(indexId);
      }
    });
  };

  useEffect(() => {
    dispatch(discountGetOffer());
  }, [dispatch, discountPutData]);

  useEffect(() => {
    setCheckedState(discountGetData?.delivery_offer?.amount_wise_free_delivery);
    setCheckedAllOrder(discountGetData?.delivery_offer?.for_all_free_delivery);
  }, [discountGetData]);

  // useEffect(() => {
  //   if (!discountPageLoading && !discountPageError && formSubmit) {
  //     navigate("/");
  //   }
  // }, [discountPageLoading, discountPageError]);

  const getOfferDetailsArray = discountGetData?.discount_offer?.map(
    (items, index) => ({
      above_amount: items.above_amount,
      discount: items.discount,
      discount_type: items.discount_type,
    })
  );

  return (
    <>
      {discountPageLoading ? (
        <RippleLoader />
      ) : (
        <>
          <div className="mb-4 border-b border-gray-200">
            <div className="container px-4 py-2.5 mx-auto">
              <Breadcrumb
                breadCrumbTitle={"Discount"}
                breadCrumbParent={"Dashboard"}
                breadCrumbActive={"Discount"}
              />
            </div>
          </div>
          <div className="container mx-auto px-4">
            <Formik
              // enableReinitialize={true}
              initialValues={{
                above_amount: "",
                discount: "",
                discount_type: "",
                promo_code: '',

                discount_offer: getOfferDetailsArray || [],

                amount_wise_free_delivery: checkedState,
                for_all_free_delivery: checkedAllOrder,
                more_than_amount:
                  discountGetData?.delivery_offer?.more_than_amount ?? 0,
              }}
              validationSchema={Yup.object().shape({
                more_than_amount:
                  checkedState &&
                  Yup.number()
                    .min(0, "Please Enter Valid Offer Amount")
                    .required("Please Enter Delivery Offer Amount "),
                // promo_code: Yup.string().required('ent')
              })}
              onSubmit={(values) => {
                dispatch(
                  discountAddOffer({
                    discount_offer: values.discount_offer,
                    more_than_amount: values.more_than_amount,
                    for_all_free_delivery: checkedAllOrder,
                    amount_wise_free_delivery: checkedState,
                  })
                );
                setFormSubmit(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  {/* Offer Discount */}

                  <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg md:py-5 md:px-7 px-5 py-3 my-5">

                    <div className="mb-3 text-black font-bold text-2xl">
                      Promo code Offer
                    </div>
                    {/* Promo code */}
                    <div className="mb-3">
                      <div
                        className={`w-full ${errors.promo_code &&
                          touched.promo_code &&
                          ` input-error `
                          }`}
                      >
                        <label
                          htmlFor="promo_code"
                          className="block mb-1 text-sm text-black"
                        >
                          Promo Code
                        </label>
                        <input
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.promo_code}
                          id="promo_code"
                          className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                          placeholder="Promo Code"
                        />
                        {errors.promo_code && touched.promo_code ? (
                          <>
                            <InputError errorTitle={errors.promo_code} />
                          </>
                        ) : null}
                      </div>
                    </div>


                    {/*  % Discount  */}
                    <div className="mb-3 text-black font-bold text-2xl">
                      Discount Offer
                    </div>
                    <FieldArray
                      name="discount_offer"
                      render={(arrayHelpers) => {
                        const discountArray = values.discount_offer;
                        return (
                          <>
                            <div className="flex items-center gap-4 flex-wrap">
                              <div className="">
                                <label
                                  htmlFor="discount_percent"
                                  className="whitespace-nowrap"
                                >
                                  &#x262F; If Buy Above
                                </label>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <input
                                    type="number"
                                    id="above_amount"
                                    name="above_amount"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.above_amount}
                                    placeholder="Amount"
                                    className="border pl-3 pr-6 py-2  text-sm rounded-lg placeholder:text-sm w-full  shadow-sm error-forms focus:border-theme/80"
                                  />
                                  <div className="absolute top-1.5 right-2 border-l pl-2 bg-white pointer-events-none">
                                    <p>{currency_symbol?.currency}</p>
                                  </div>
                                </div>
                                <p>Then</p>
                              </div>
                              <div className="flex items-center gap-4 w-full flex-wrap sm:flex-nowrap">
                                <div className="relative w-full">
                                  <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.discount}
                                    placeholder="Amount"
                                    className="border pl-3 pr-6  py-2 text-sm rounded-lg placeholder:text-sm w-full  shadow-sm error-forms focus:border-theme/80"
                                  />
                                  <div className="absolute top-1.5 right-0.5 border-l pl-2 bg-white">
                                    <select
                                      name="discount_type"
                                      id="discount_type"
                                      value={values.discount_type}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    >
                                      <option value="">Choose here</option>
                                      <option value="%">%</option>

                                      <option value={currency_symbol?.currency}>
                                        {currency_symbol?.currency}
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <p>Discount</p>
                                <div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (
                                        values.above_amount !== undefined &&
                                        values.above_amount !== "" &&
                                        values.discount !== undefined &&
                                        values.discount !== "" &&
                                        values.discount_type !== undefined &&
                                        values.discount_type !== ""
                                      ) {
                                        arrayHelpers.push({
                                          above_amount: values.above_amount,
                                          discount: values.discount,
                                          discount_type: values.discount_type,
                                        });
                                        setFieldValue("above_amount", "");
                                        setFieldValue("discount", "");
                                        setFieldValue("discount_type", "");
                                      }
                                    }}
                                    className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-3  py-1  md:text-base text-sm font-semibold shadow-lg transition duration-200"
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            </div>

                            {(discountArray || []).map((data, indexId) => {
                              return (
                                <>
                                  <div
                                    className="flex justify-between items-center bg-orange-50 py-2.5 px-3 rounded-lg my-3 text-sm"
                                    key={indexId}
                                  >
                                    <p onClick={() => { }}>
                                      <span className="">
                                        No. : {indexId + 1}
                                      </span>{" "}
                                      If Buy Above {currency_symbol?.currency}{" "}
                                      {data.above_amount} Then {data.discount}{" "}
                                      {data.discount_type} Discount
                                    </p>
                                    <button
                                      type="button"
                                      title="Delete"
                                      className="text-red"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(arrayHelpers, indexId);
                                      }}
                                    >
                                      <Trash size="18" />
                                    </button>
                                  </div>
                                </>
                              );
                            })}

                            {discountArray?.length > 0 ? (
                              <>
                                <div className="bg-rose-200 py-2.5 px-3 rounded-lg my-2 font-semibold text-sm">
                                  <p>
                                    Note: Change Country Remove Discount Offer
                                  </p>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      }}
                    />
                  </div>



                  {/* Delivery Offer */}
                  <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg md:py-5 md:px-7 px-5 py-3 my-5">
                    <div className="mb-3 text-black font-bold text-2xl">
                      Delivery Offer
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="flex items-center gap-2 ">
                        <input
                          type="checkbox"
                          id="amount_wise_free_delivery"
                          name="amount_wise_free_delivery"
                          value={values.amount_wise_free_delivery}
                          className={"w-5 h-5 "}
                          checked={checkedState}
                          onChange={() => {
                            setCheckedState(!checkedState);
                            setCheckedAllOrder(false);
                          }}
                        />
                        <label
                          htmlFor="amount_wise_free_delivery"
                          className="whitespace-nowrap"
                        >
                          {" "}
                          If Buy Above
                        </label>
                      </div>
                      <div className="flex items-center gap-4 ">
                        <div
                          className={`relative ${errors.more_than_amount &&
                            touched.more_than_amount &&
                            ` input-error `
                            } ${checkedState ? ` block ` : ` hidden `}`}
                        >
                          <input
                            id="more_than_amount"
                            name="more_than_amount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.more_than_amount}
                            type="number"
                            placeholder="Amount"
                            className="border pl-3 pr-6 py-2  text-sm rounded-lg placeholder:text-sm w-full  shadow-sm error-forms focus:border-theme/80"
                          />
                          <div className="absolute top-1.5 right-2 border-l pl-2 bg-white pointer-events-none">
                            <p>{currency_symbol?.currency}</p>
                          </div>
                        </div>
                        <p>Free Delivery</p>
                      </div>
                    </div>
                    {errors.more_than_amount && touched.more_than_amount ? (
                      <>
                        <InputError errorTitle={errors.more_than_amount} />
                      </>
                    ) : null}

                    {/* Delivery */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="for_all_free_delivery"
                          name="for_all_free_delivery"
                          value={values.for_all_free_delivery}
                          checked={checkedAllOrder}
                          className={" h-5 w-5"}
                          onChange={() => {
                            setCheckedAllOrder(!checkedAllOrder);
                            setCheckedState(false);
                          }}
                        />
                        <label htmlFor="for_all_free_delivery">
                          All Order Free Delivery
                        </label>
                      </div>
                    </div>
                    <div className="bg-rose-200 py-2.5 px-3 rounded-lg my-2 font-semibold text-sm">
                      <p>
                        Note: Apply any delivery offer to not Apply delivery
                        charge
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 my-5">
                    <button
                      type="submit"
                      className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-8 py-2 font-semibold shadow-lg transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 px-6 py-2 lg:text-base text-sm font-semibold shadow-lg transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default DiscountOffers;
