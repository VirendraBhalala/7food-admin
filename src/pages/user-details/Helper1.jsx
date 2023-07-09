import React, { useEffect, useState } from "react";
import ImageResize from "quill-image-resize-module-react";
import { Loader, RippleLoaderSVG } from "../../assets/svg/AllSvg";
import { formats, modules } from "../../commons/Editor";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../commons/Breadcrumb";
import ReactQuill, { Quill } from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getReturnRefundPolicy,
  getShippingPolicy,
  getTermsConditions,
  privacyPolicyGet,
  privacyPolicyPut,
  returnAndRefundPolicy,
  shippingPolicyPut,
  termsAndConditions,
} from "../../redux/policy/slice";
import { InputError } from "../../commons/MicroComponents";

Quill.register("modules/imageResize", ImageResize);

const Helper1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [policyTab, setPolicyTab] = useState("");
  const [privacyData, setPrivacyData] = useState(null);
  const [termandCondition, setTermandCondition] = useState(null);
  const [returnandRefundPolicy, setReturnandRefundPolicy] = useState(null);
  const [shippingPolicy, setShippingPolicy] = useState(null);

  const {
    privacyPolicyData,
    termsConditionsData,
    returnRefundPolicyData,
    shippingPolicyData,
    helperPageLoading,
    putPrivacyPolicyLoading,
    putTermsConditionsLoading,
    putReturnRefundPolicyLoading,
    putShippingPolicyLoading,
    helperPageError,
  } = useSelector((store) => ({
    privacyPolicyData: store?.policyData?.getPrivacyPolicyStatus?.data?.data,
    termsConditionsData:
      store?.policyData?.getTermsConditionsStatus?.data?.data,
    returnRefundPolicyData:
      store?.policyData?.getGeturnRefundPolicyStatus?.data?.data,
    shippingPolicyData: store?.policyData?.getShippingPolicyStatus?.data?.data,

    helperPageLoading: store?.policyData?.loading,
    putPrivacyPolicyLoading: store?.policyData?.putPrivacyPolicyStatus?.loading,
    putTermsConditionsLoading:
      store?.policyData?.termsAndConditionsStatus?.loading,
    putReturnRefundPolicyLoading:
      store?.policyData?.returnAndRefundPolicyStatus?.loading,
    putShippingPolicyLoading: store?.policyData?.shippingPolicyStatus?.loading,
    helperPageError: store?.userData?.error,
  }));

  useEffect(() => {
    if (policyTab === "") {
      dispatch(privacyPolicyGet());
    } else if (policyTab === "Terms and Conditions") {
      dispatch(getTermsConditions());
    } else if (policyTab === "Return & Refund Policy") {
      dispatch(getReturnRefundPolicy());
    } else if (policyTab === "Shipping Policy") {
      dispatch(getShippingPolicy());
    }
  }, [dispatch, policyTab]);

  // privacyPolicyData
  useEffect(() => {
    setPrivacyData(privacyPolicyData?.data);
  }, [privacyPolicyData?.data]);

  // termsConditionsData
  useEffect(() => {
    setTermandCondition(termsConditionsData?.data);
  }, [termsConditionsData?.data]);

  // returnRefundPolicyData
  useEffect(() => {
    setReturnandRefundPolicy(returnRefundPolicyData?.data);
  }, [returnRefundPolicyData?.data]);

  // shippingPolicyData
  useEffect(() => {
    setShippingPolicy(shippingPolicyData?.data);
  }, [shippingPolicyData?.data]);

  return (
    <>
      {/* {helperPageLoading && <RippleLoader />} */}
      <div>
        <div className="mb-4 border-b border-gray-200">
          <div className="container px-4 py-2.5 mx-auto">
            <Breadcrumb
              breadCrumbTitle={"Policy"}
              breadCrumbParent={"Dashboard"}
              breadCrumbActive={"Policy"}
            />
          </div>
        </div>
        {/* Home Custom Details */}
        <div className="container px-4 mx-auto custom-scroll">
          <div className="mb-4 overflow-auto ">
            <div className="grid grid-cols-4 gap-2 bg-theme/20 p-1.5 rounded-lg overflow-x-auto min-w-[800px] my-2">
              <button
                type="button"
                onClick={() => setPolicyTab("")}
                className={`${policyTab === "" ? `bg-theme` : ` bg-theme/20 `
                  } font-semibold xl:text-base text-sm w-full py-2 lg:px-4 px-2 rounded-md `}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setPolicyTab("Terms and Conditions")}
                className={`${policyTab === "Terms and Conditions"
                  ? `bg-theme`
                  : ` bg-theme/20 `
                  } font-semibold xl:text-base text-sm w-full py-2 lg:px-4 px-2 rounded-md `}
              >
                Terms and Conditions
              </button>
              <button
                type="button"
                onClick={() => setPolicyTab("Return & Refund Policy")}
                className={`${policyTab === "Return & Refund Policy"
                  ? `bg-theme`
                  : ` bg-theme/20 `
                  } font-semibold xl:text-base text-sm w-full py-2 lg:px-4 px-2 rounded-md `}
              >
                Return & Refund Policy
              </button>
              <button
                type="button"
                onClick={() => setPolicyTab("Shipping Policy")}
                className={`${policyTab === "Shipping Policy" ? `bg-theme` : ` bg-theme/20 `
                  } font-semibold xl:text-base text-sm w-full py-2 lg:px-4 px-2 rounded-md `}
              >
                Shipping Policy
              </button>
            </div>
          </div>

          {/* Privacy Policy */}
          {policyTab === "" && (
            <>
              {helperPageLoading ? (
                <>
                  <div className="flex justify-center items-center min-h-[600px]">
                    <RippleLoaderSVG />
                  </div>
                </>
              ) : (
                <>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      privacyPolicyTitle: privacyPolicyData?.title ?? "",
                      privacyPolicy: privacyData ?? null,
                    }}
                    validationSchema={Yup.object().shape({
                      privacyPolicyTitle: Yup.string().required(
                        "Please Title Required"
                      ),
                    })}
                    onSubmit={(values) => {
                      dispatch(
                        privacyPolicyPut({
                          title: values.privacyPolicyTitle,
                          data: values.privacyPolicy,
                        })
                      );
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 px-7 my-5">
                          <div className="mb-3 text-black font-bold text-xl">
                            <div
                              className={`w-full ${errors.privacyPolicyTitle &&
                                touched.privacyPolicyTitle &&
                                ` input-error `
                                } px-4 mt-4`}
                            >
                              <input
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.privacyPolicyTitle}
                                id="privacyPolicyTitle"
                                className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                placeholder="Privacy Policy Title "
                              />
                              {errors.privacyPolicyTitle &&
                                touched.privacyPolicyTitle ? (
                                <>
                                  <InputError
                                    errorTitle={errors.privacyPolicyTitle}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>
                          <div className="container p-4 mx-auto">
                            <ReactQuill
                              theme={"snow"}
                              id="privacyPolicy"
                              name="privacyPolicy"
                              onChange={handleChange("privacyPolicy")}
                              value={values.privacyPolicy}
                              modules={modules}
                              formats={formats}
                              bounds={"#root"}
                              placeholder={"Write something awesome..."}
                            />
                          </div>
                          <div className="flex justify-center gap-4 pt-3">
                            {putPrivacyPolicyLoading ? (
                              <>
                                <Loader width={45} />
                              </>
                            ) : (
                              <>
                                <button
                                  type="submit"
                                  className="bg-theme border-theme border-2 px-8 py-2 lg:text-base text-sm font-semibold shadow-lg hover:border-theme rounded-md hover:bg-transparent transition duration-200"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => navigate("/")}
                                  className="bg-rose-500 text-white rounded-md hover:border-rose-500 border-2 px-6 py-2 lg:text-base text-sm font-semibold shadow-lg hover:text-black border-rose-500 hover:bg-transparent transition duration-200"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </>
          )}

          {/*  Terms and Conditions */}
          {policyTab === "Terms and Conditions" && (
            <>
              {helperPageLoading ? (
                <>
                  <div className="flex justify-center items-center min-h-[600px]">
                    <RippleLoaderSVG />
                  </div>
                </>
              ) : (
                <>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      termsAndConditionsTitle: termsConditionsData?.title ?? "",
                      termsAndConditions: termandCondition ?? null,
                    }}
                    validationSchema={Yup.object().shape({
                      termsAndConditionsTitle: Yup.string().required(
                        "Please Title Required"
                      ),
                    })}
                    onSubmit={(values) => {
                      dispatch(
                        termsAndConditions({
                          title: values.termsAndConditionsTitle,
                          data: values.termsAndConditions,
                        })
                      );
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 px-7 my-5">
                          <div className="mb-3 text-black font-bold text-xl">
                            <div
                              className={`w-full ${errors.termsAndConditionsTitle &&
                                touched.termsAndConditionsTitle &&
                                ` input-error `
                                } px-4 mt-4`}
                            >
                              <input
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.termsAndConditionsTitle}
                                id="termsAndConditionsTitle"
                                className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                placeholder=" Terms And Conditions Title "
                              />
                              {errors.termsAndConditionsTitle &&
                                touched.termsAndConditionsTitle ? (
                                <>
                                  <InputError
                                    errorTitle={errors.termsAndConditionsTitle}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>
                          <div className="container p-4 mx-auto">
                            <ReactQuill
                              theme={"snow"}
                              id="termsAndConditions"
                              name="termsAndConditions"
                              onChange={handleChange("termsAndConditions")}
                              value={values.termsAndConditions}
                              modules={modules}
                              formats={formats}
                              bounds={"#root"}
                              placeholder={"Write something awesome..."}
                            />
                          </div>
                          <div className="flex justify-center gap-4 pt-3">
                            {putTermsConditionsLoading ? (
                              <>
                                <Loader width={45} />
                              </>
                            ) : (
                              <>
                                <button
                                  type="submit"
                                  className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-8 py-2 font-semibold shadow-lg transition duration-200"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => navigate("/")}
                                  className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 px-6 py-2 font-semibold shadow-lg transition duration-200"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </>
          )}

          {/*  Return & Refund Policy */}
          {policyTab === "Return & Refund Policy" && (
            <>
              {helperPageLoading ? (
                <>
                  <div className="flex justify-center items-center min-h-[600px]">
                    <RippleLoaderSVG />
                  </div>
                </>
              ) : (
                <>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      returnAndRefundPolicyTitle:
                        returnRefundPolicyData?.title ?? "",
                      refundPolicy: returnandRefundPolicy ?? null,
                    }}
                    validationSchema={Yup.object().shape({
                      returnAndRefundPolicyTitle: Yup.string().required(
                        "Please Title Required"
                      ),
                    })}
                    onSubmit={(values) => {
                      dispatch(
                        returnAndRefundPolicy({
                          title: values.returnAndRefundPolicyTitle,
                          data: values.refundPolicy,
                        })
                      );
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 px-7 my-5">
                          <div className="mb-3 text-black font-bold text-xl">
                            <div
                              className={`w-full ${errors.returnAndRefundPolicyTitle &&
                                touched.returnAndRefundPolicyTitle &&
                                ` input-error `
                                } px-4 mt-4`}
                            >
                              <input
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.returnAndRefundPolicyTitle}
                                id="returnAndRefundPolicyTitle"
                                className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                placeholder="  Return & Refund Policy Title "
                              />
                              {errors.returnAndRefundPolicyTitle &&
                                touched.returnAndRefundPolicyTitle ? (
                                <>
                                  <InputError
                                    errorTitle={
                                      errors.returnAndRefundPolicyTitle
                                    }
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>
                          <div className="container p-4 mx-auto">
                            <ReactQuill
                              theme={"snow"}
                              id="refundPolicy"
                              name="refundPolicy"
                              onChange={handleChange("refundPolicy")}
                              value={values.refundPolicy}
                              modules={modules}
                              formats={formats}
                              bounds={"#root"}
                              placeholder={"Write something awesome..."}
                            />
                          </div>
                          <div className="flex justify-center gap-4 pt-3">
                            {putReturnRefundPolicyLoading ? (
                              <>
                                <Loader width={45} />
                              </>
                            ) : (
                              <>
                                <button
                                  type="submit"
                                  className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-8 py-2 font-semibold shadow-lg transition duration-200"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => navigate("/")}
                                  className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 px-6 py-2 font-semibold shadow-lg transition duration-200"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </>
          )}

          {/*  Shipping Policy */}
          {policyTab === "Shipping Policy" && (
            <>
              {helperPageLoading ? (
                <>
                  <div className="flex justify-center items-center min-h-[600px]">
                    <RippleLoaderSVG />
                  </div>
                </>
              ) : (
                <>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      shippingPolicyTitle: shippingPolicyData?.title ?? "",
                      shippingPolicy: shippingPolicy ?? null,
                    }}
                    validationSchema={Yup.object().shape({
                      shippingPolicyTitle: Yup.string().required(
                        "Please Title Required"
                      ),
                    })}
                    onSubmit={(values) => {
                      dispatch(
                        shippingPolicyPut({
                          title: values.shippingPolicyTitle,
                          data: values.shippingPolicy,
                        })
                      );
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 px-7 my-5">
                          <div className="mb-3 text-black font-bold text-xl">
                            <div
                              className={`w-full ${errors.shippingPolicyTitle &&
                                touched.shippingPolicyTitle &&
                                ` input-error `
                                } px-4 mt-4`}
                            >
                              <input
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.shippingPolicyTitle}
                                id="shippingPolicyTitle"
                                className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                placeholder="Shipping Policy Title "
                              />
                              {errors.shippingPolicyTitle &&
                                touched.shippingPolicyTitle ? (
                                <>
                                  <InputError
                                    errorTitle={errors.shippingPolicyTitle}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>
                          <div className="container p-4 mx-auto">
                            <ReactQuill
                              theme={"snow"}
                              id="shippingPolicy"
                              name="shippingPolicy"
                              onChange={handleChange("shippingPolicy")}
                              value={values.shippingPolicy}
                              modules={modules}
                              formats={formats}
                              bounds={"#root"}
                              placeholder={"Write something awesome..."}
                            />
                          </div>
                          <div className="flex justify-center gap-4 pt-3">
                            {putShippingPolicyLoading ? (
                              <>
                                <Loader width={45} />
                              </>
                            ) : (
                              <>
                                <button
                                  type="submit"
                                  className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-8 py-2 font-semibold shadow-lg transition duration-200"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => navigate("/")}
                                  className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 px-6 py-2 font-semibold shadow-lg transition duration-200"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Helper1;
