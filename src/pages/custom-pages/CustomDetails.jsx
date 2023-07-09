import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputError } from "../../commons/MicroComponents";
import { Edit2, GalleryAdd, Trash } from "iconsax-react";
import Breadcrumb from "../../commons/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import Select from "react-select";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  aboutDetailsPutData,
  getAboutDetailesData,
} from "../../redux/about/slice";
import {
  DefaultAbout,
  DefaultBanner,
  Defimage,
  OfferImageDefault,
} from "../../assets/image";
import {
  addOfferDetails,
  customHomeDetails,
  deleteOfferDetails,
  editOfferDetails,
  getAllOfferDetails,
  getCustomHomeDetails,
  offerGetByIdDetails,
  popularCategories,
} from "../../redux/custom-home/slice";
import { Loader, RippleLoaderSVG } from "../../assets/svg/AllSvg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CustomDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customTab, setCustomTab] = useState("");
  // Banner Image
  const [inputbanner, setInputbanner] = useState(null);
  // Offer State
  const [inputOfferImage, setInputOfferImage] = useState(null);
  // categories
  const [getCategories, setGetCategories] = useState([]);
  // About Image
  const [imageAbout, setImageAbout] = useState(null);
  // Form Submit State
  const [editForm, setEditForm] = useState(null);

  const {
    customDetailsGet,
    getCategoriesData,
    productsDataGet,
    customDetailsLoading,
    getcustomDetailsLoading,
    getCategoriesLoading,
    //About
    getDataAboutDetailes,
    aboutDetailesLoding,
    getAboutLoading,
    // getAllOfferData
    addOfferData,
    getAllOfferData,
    offerGetByIdData,
    deleteOfferData,
    editOfferData,
  } = useSelector((store) => ({
    customDetailsGet:
      store?.customHomeData?.getCustomHomeDetailsStatus?.data?.data,
    customDetailsLoading: store?.customHomeData?.loading,
    getcustomDetailsLoading:
      store?.customHomeData?.getCustomHomeDetailsStatus?.loading,
    getCategoriesData:
      store?.customHomeData?.popularCategoriesStatus?.data?.data,
    getCategoriesLoading:
      store?.customHomeData?.popularCategoriesStatus?.loading,
    // Get All Offer Details
    getAllOfferData: store?.customHomeData?.getAllOfferStatus?.data?.data?.data,
    addOfferData:
      store?.customHomeData?.addOfferDetailsStatus?.data?.data?.data,
    deleteOfferData: store?.customHomeData?.deleteOfferStatus?.data?.data?.data,
    editOfferData: store?.customHomeData?.editOfferStatus?.data?.data?.data,
    offerGetByIdData:
      store?.customHomeData?.offerGetByIdStatus?.data?.data?.data,

    // About Section
    getDataAboutDetailes:
      store?.aboutData?.getAboutDetailesDataSatus?.data?.data,
    aboutDetailesLoding: store?.aboutData?.loading,
    getAboutLoading: store?.aboutData?.getAboutDetailesDataSatus?.loading,
  }));

  // Banner Image Click
  const getClickBanner = () => {
    document.getElementById("banner_img").click();
  };

  // Offer Image Click
  const getClickOfferImage = () => {
    document.getElementById("offer_image").click();
  };

  // About Image Click
  const getClickAbout = () => {
    document.getElementById("about_img").click();
  };

  const categoriesList1 = (getCategoriesData || [])?.map((element) => {
    return { value: `${element.id}`, label: `${element.categories_name}` };
  });
  // handleDelete
  const handleDelete = (id) => {
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
        dispatch(deleteOfferDetails(id));
      }
    });
  };

  useEffect(() => {
    const temp = customDetailsGet?.popular_categories?.map((element) => ({
      value: element?.id,
      label: element?.categories_name,
    }));
    setGetCategories(temp);
    setInputbanner(customDetailsGet?.banner_image);
    return () => {
      setGetCategories([]);
    };
  }, [customDetailsGet]);

  useEffect(() => {
    if (customTab === "Home Custom Details") {
      dispatch(getAllOfferDetails());
    }
  }, [deleteOfferData, addOfferData, editOfferData, customTab, dispatch]);

  useEffect(() => {
    if (customTab === "") {
      dispatch(getCustomHomeDetails());
      dispatch(popularCategories());
    } else if (customTab === "About Details") {
      dispatch(getAboutDetailesData());
    }
  }, [dispatch, customTab]);

  useEffect(() => {
    setImageAbout(getDataAboutDetailes?.about_image);
  }, [getDataAboutDetailes]);

  useEffect(() => {
    setInputOfferImage(offerGetByIdData?.offer_image);
  }, [offerGetByIdData]);

  return (
    <>
      <div>
        <div className="mb-4 border-b border-gray-200">
          <div className="container px-4 py-2.5 mx-auto">
            <Breadcrumb
              breadCrumbTitle={" Customs Details"}
              breadCrumbParent={"Dashboard"}
              breadCrumbActive={"Custom Details"}
            />
          </div>
        </div>

        <section className="container px-4 mx-auto custom-scroll">
          <div className="mb-4 overflow-auto ">
            <div className="grid grid-cols-3 gap-2 bg-theme/20 p-1.5 rounded-lg overflow-x-auto min-w-[800px] my-2">
              <button
                type="button"
                onClick={() => setCustomTab("")}
                className={`${customTab === "" ? `bg-theme` : ` bg-theme/20 `
                  } font-semibold xl:text-base text-sm w-full py-2 lg:px-4 px-2 rounded-md `}
              >
                Home Custom Details
              </button>
              <button
                type="button"
                onClick={() => setCustomTab("Home Custom Details")}
                className={`${customTab === "Home Custom Details"
                  ? `bg-theme`
                  : ` bg-theme/20 `
                  } font-semibold xl:text-base text-sm w-full py-2 lg:px-4 px-2 rounded-md `}
              >
                Offer Details
              </button>

              <button
                type="button"
                onClick={() => setCustomTab("About Details")}
                className={`${customTab === "About Details" ? `bg-theme` : ` bg-theme/20 `
                  } font-semibold xl:text-base text-sm w-full py-2 lg:px-4 px-2 rounded-md `}
              >
                About Details
              </button>
            </div>
          </div>

          {/* Home Custom Details */}
          {customTab === "" && (
            <>
              {getcustomDetailsLoading ? (
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
                      // Banner Home Page
                      banner_img: customDetailsGet?.banner_image ?? "",
                      banner_title: customDetailsGet?.banner_title ?? "",
                      banner_favproduct:
                        customDetailsGet?.favourite_product_URL ?? "",
                      // Categories
                      select_categories: getCategories ?? [],
                    }}
                    validationSchema={Yup.object().shape({
                      // Banner Home Page
                      banner_img: Yup.string().required(
                        "Please Enter Banner image "
                      ),
                      banner_title: Yup.string().required(
                        "Please Enter Banner Title "
                      ),
                      banner_favproduct: Yup.string().required(
                        "Please Enter Favourite Product URL  "
                      ),
                      // Categories
                      select_categories: Yup.array()
                        .min(1, "Minimum Select 1")
                        .max(6, "Maximum Select 6")
                        .required("Please Enter Categories"),
                    })}
                    onSubmit={(values) => {
                      const formdata = new FormData();
                      formdata.append("banner_image", values.banner_img);
                      formdata.append("banner_title", values.banner_title);
                      formdata.append(
                        "favourite_product_URL",
                        values.banner_favproduct
                      );
                      formdata.append(
                        "popular_categories[]",
                        JSON.stringify(
                          values.select_categories.map((e) => e.value)
                        )
                      );
                      dispatch(customHomeDetails(formdata));
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
                        {/*  Banner Details */}
                        <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg md:py-5 md:px-7 px-5 py-3 my-5 ">
                          <div className="mb-3 text-black font-bold text-2xl">
                            Banner Details
                          </div>
                          <div className="grid lg:grid-cols-2 gap-4">
                            <div className="lg:mt-4">
                              {/*  Banner Title */}
                              <div
                                className={` w-full mb-3 ${errors.banner_title &&
                                  touched.banner_title &&
                                  ` input-error `
                                  }`}
                              >
                                <label
                                  htmlFor="banner_title"
                                  className="block mb-1 text-sm text-black"
                                >
                                  Banner Title
                                </label>
                                <input
                                  type="text"
                                  id="banner_title"
                                  name="banner_title"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.banner_title}
                                  className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                  placeholder="Banner title"
                                />
                                {errors.banner_title && touched.banner_title ? (
                                  <>
                                    <InputError
                                      errorTitle={errors.banner_title}
                                    />
                                  </>
                                ) : null}
                              </div>
                              {/* Favourite Product URL */}
                              <div
                                className={` w-full lg:mb-3 ${errors.banner_favproduct &&
                                  touched.banner_favproduct &&
                                  ` input-error `
                                  }`}
                              >
                                <label
                                  htmlFor="banner_favproduct"
                                  className="block mb-1 text-sm text-black"
                                >
                                  Favourite Product URL
                                </label>
                                <input
                                  type="url"
                                  id="banner_favproduct"
                                  name="banner_favproduct"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.banner_favproduct}
                                  className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 focus:border-theme/80 error-forms"
                                  placeholder="Add Favourite product url"
                                />
                                {errors.banner_favproduct &&
                                  touched.banner_favproduct ? (
                                  <>
                                    <InputError
                                      errorTitle={errors.banner_favproduct}
                                    />
                                  </>
                                ) : null}
                              </div>
                            </div>
                            {/*   Banner Image */}
                            <div className="">
                              <div className="lg:mb-0 mb-4">
                                <label
                                  htmlFor="banner_img"
                                  className="block mb-1 text-sm text-black"
                                >
                                  Banner Image
                                </label>
                                <input
                                  id="banner_img"
                                  name="banner_img"
                                  type="file"
                                  accept=".png, .jpg, .jpeg,"
                                  onBlur={handleBlur}
                                  // value={values.banner_img}
                                  onChange={(e) => {
                                    setInputbanner(
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                    setFieldValue(
                                      "banner_img",
                                      e.target.files[0]
                                    );
                                  }}
                                  className="hidden"
                                />
                                <div
                                  className="relative w-full sm:h-[300px] md:h-96 h-[200px] rounded-md border bg-orange-50"
                                  onClick={getClickBanner}
                                >
                                  <div className="w-full sm:h-[300px] md:h-96 h-[200px]  rounded-md overflow-hidden">
                                    <LazyLoadImage
                                      effect="blur"
                                      width="100%"
                                      height="100%"
                                      src={inputbanner ?? DefaultBanner}
                                      className="w-full h-full object-cover"
                                      alt="banner"
                                    />
                                  </div>
                                  <div className="w-8 h-8 rounded-full shadow-lg absolute -top-3 -right-3 z-[2] bg-amber-200 flex items-center justify-center">
                                    <GalleryAdd size="18" />
                                  </div>
                                </div>
                              </div>
                              {errors.banner_img && touched.banner_img ? (
                                <>
                                  <InputError errorTitle={errors.banner_img} />
                                </>
                              ) : null}
                            </div>
                          </div>

                          {/* Categories Popular */}
                          <div className="mb-3 text-black font-bold text-2xl">
                            Popular Categories
                          </div>
                          <div className="">
                            <div
                              className={`w-full mb-3 selectFocusRemove selectFocusdesign ${errors.select_categories &&
                                touched.select_categories &&
                                ` input-error `
                                }`}
                            >
                              <label
                                htmlFor="select_categories"
                                className="block mb-1 text-sm text-black"
                              >
                                Select Category(only 6)
                              </label>
                              <Select
                                id="select_categories"
                                name="select_categories"
                                isMulti
                                onChange={(e) =>
                                  setFieldValue("select_categories", e)
                                }
                                onBlur={handleBlur("select_categories")}
                                value={values.select_categories}
                                options={
                                  getCategoriesLoading ? [] : categoriesList1
                                }
                                isLoading={getCategoriesLoading}
                                className="text-sm froms-error focus:border-theme/80"
                              />
                              {errors.select_categories &&
                                touched.select_categories ? (
                                <>
                                  <InputError
                                    errorTitle={errors.select_categories}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>

                          {/* Banner Form Submit Button */}
                          <div className="flex justify-center gap-4 mt-5 mb-2">
                            {customDetailsLoading ? (
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

          {/* Offer Details */}
          {customTab === "Home Custom Details" && (
            <>
              {customDetailsLoading ? (
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
                      // Offer
                      offer_image: offerGetByIdData?.offer_image ?? "",
                      offer_title: editForm
                        ? offerGetByIdData?.offer_title
                        : "",
                      offer_link: editForm
                        ? offerGetByIdData?.offer_product_URL
                        : "",
                      offer_descriptions: editForm
                        ? offerGetByIdData?.offer_description
                        : "",
                    }}
                    validationSchema={Yup.object().shape({
                      offer_title: Yup.string().required(
                        "Please Enter Offer Title "
                      ),
                      offer_image: Yup.string().required(
                        "Please Enter Offer Image "
                      ),
                      offer_link: Yup.string().required(
                        "Please Enter Offer Link "
                      ),
                      offer_descriptions: Yup.string().required(
                        "Please Enter Offer Descriptions "
                      ),
                    })}
                    onSubmit={(values, { resetForm }) => {
                      const offerData = new FormData();
                      offerData.append("offer_image", values.offer_image);
                      offerData.append("offer_title", values.offer_title);
                      offerData.append("offer_product_URL", values.offer_link);
                      offerData.append(
                        "offer_description",
                        values.offer_descriptions
                      );

                      if (editForm) {
                        dispatch(
                          editOfferDetails({ id: editForm, data: offerData })
                        );
                        setEditForm(null);
                        // setInputOfferImage(null);
                      } else {
                        dispatch(addOfferDetails(offerData));
                      }
                      resetForm({ values: "" });
                      setInputOfferImage(null);
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
                      resetForm,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg md:py-5 md:px-7 px-5 py-3 my-5">
                          <div className="mb-3 text-black font-bold text-2xl">
                            Offer Details
                          </div>

                          {/* offerDetails */}
                          <div className="grid xl:grid-cols-12 gap-4 mb-7">
                            <div className="order-1 xl:order-1 col-span-8">
                              <div className="lg:flex justify-between gap-5">
                                <div>
                                  <label
                                    htmlFor="offer_image"
                                    className="block mb-1 text-sm text-black"
                                  >
                                    Offer Image
                                  </label>
                                  <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg,"
                                    className="border hidden"
                                    id="offer_image"
                                    name="offer_image"
                                    // value={values.offer_image}
                                    onChange={(e) => {
                                      setInputOfferImage(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                      setFieldValue(
                                        "offer_image",
                                        e.target.files[0]
                                      );
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  <div
                                    className="relative lg:h-54 h-44 lg:max-w-[340px] max-w-[200px] w-full rounded-md  bg-orange-50"
                                    onClick={getClickOfferImage}
                                  >
                                    <div className="lg:h-54 h-44 lg:max-w-[340px] max-w-[200px] w-full rounded-md overflow-hidden">
                                      <LazyLoadImage
                                        effect="blur"
                                        width="100%"
                                        height="100%"
                                        src={inputOfferImage ?? Defimage}
                                        alt="OfferImg"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="w-8 h-8 rounded-full shadow-lg absolute -top-3 -right-3 z-[2] bg-amber-200 flex items-center justify-center">
                                      <GalleryAdd size="18" />
                                    </div>
                                  </div>
                                  {errors.offer_image && touched.offer_image ? (
                                    <>
                                      <InputError
                                        errorTitle={errors.offer_image}
                                      />
                                    </>
                                  ) : null}
                                </div>
                                <div className="w-full lg:mt-0 mt-4">
                                  <div
                                    className={` ${errors.offer_title &&
                                      touched.offer_title &&
                                      ` input-error `
                                      } mb-3`}
                                  >
                                    <label
                                      htmlFor="offer_title"
                                      className="block mb-1 text-sm text-black"
                                    >
                                      Offer Title
                                    </label>
                                    <input
                                      type="text"
                                      id="offer_title"
                                      name="offer_title"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.offer_title}
                                      className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                    />
                                    {errors.offer_title &&
                                      touched.offer_title ? (
                                      <>
                                        <InputError
                                          errorTitle={errors.offer_title}
                                        />
                                      </>
                                    ) : null}
                                  </div>
                                  <div
                                    className={` ${errors.offer_link &&
                                      touched.offer_link &&
                                      ` input-error `
                                      } mb-3`}
                                  >
                                    <label
                                      htmlFor="offer_link"
                                      className="block mb-1 text-sm text-black"
                                    >
                                      Link Product Offer
                                    </label>
                                    <input
                                      type="url"
                                      id="offer_link"
                                      name="offer_link"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.offer_link}
                                      className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                    />
                                    {errors.offer_link && touched.offer_link ? (
                                      <>
                                        <InputError
                                          errorTitle={errors.offer_link}
                                        />
                                      </>
                                    ) : null}
                                  </div>
                                  <div
                                    className={` ${errors.offer_descriptions &&
                                      touched.offer_descriptions &&
                                      ` input-error `
                                      } mb-3`}
                                  >
                                    <label
                                      htmlFor="offer_descriptions"
                                      className="block mb-1 text-sm text-black"
                                    >
                                      Offer Description
                                    </label>
                                    <textarea
                                      type="text"
                                      id="offer_descriptions"
                                      name="offer_descriptions"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.offer_descriptions}
                                      className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                    />
                                    {errors.offer_descriptions &&
                                      touched.offer_descriptions ? (
                                      <>
                                        <InputError
                                          errorTitle={errors.offer_descriptions}
                                        />
                                      </>
                                    ) : null}
                                  </div>
                                  {errors.offerDetails &&
                                    touched.offerDetails ? (
                                    <>
                                      <InputError
                                        errorTitle={errors.offerDetails}
                                      />
                                    </>
                                  ) : null}
                                  <div className="mt-2">
                                    <button
                                      type="submit"
                                      className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 md:px-8 px-5 md:py-2 py-1.5 md:text-base text-sm font-semibold shadow-lg transition duration-200"
                                    >
                                      {editForm ? ` Update ` : ` Save `}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Offer View Demo */}
                            <div className="rounded-md overflow-hidden col-span-4 xl:order-2 xl:ml-3">
                              <p className="block mb-1 text-sm text-black">
                                Demo Offer Image
                              </p>
                              <div className="h-64 max-w-[300px] w-full rounded-md overflow-hidden">
                                <LazyLoadImage
                                  effect="blur"
                                  width="100%"
                                  height="100%"
                                  src={OfferImageDefault}
                                  alt="OfferImg"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          </div>
                          {/* View Add Offer Component */}
                          <div className="my-5 gap-5 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                            {getAllOfferData?.map((element, index) => {
                              return (
                                <div
                                  className="flex justify-between items-center gap-5 text-orange-900 bg-orange-50 p-3 rounded-md"
                                  key={index}
                                >
                                  <div className="h-44 w-44 rounded-full  overflow-hidden">
                                    <LazyLoadImage
                                      effect="blur"
                                      width="100%"
                                      height="100%"
                                      src={element.offer_image}
                                      alt=""
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div>
                                    <p className="break-words max-w-[200px] w-full mb-1 text-2xl font-semibold xl:text-xl lg:text-lg text-right">
                                      {element.offer_title}
                                    </p>
                                    <div className="flex items-end flex-col ">
                                      <p className="max-w-[150px] break-words">
                                        {element.offer_description}
                                      </p>
                                      <a
                                        target={"_blank"}
                                        href={`${element.offer_link}`}
                                        className="rounded-md bg-theme py-1 px-3 mt-2 font-semibold whitespace-nowrap"
                                        rel="noreferrer"
                                      >
                                        Order Now
                                      </a>
                                      <div className="flex justify-between items-center mt-8 gap-x-4">
                                        <button
                                          title="Edit"
                                          type="button"
                                          className="text-green-600"
                                          onClick={(e) => {
                                            setEditForm(element._id);
                                            dispatch(
                                              offerGetByIdDetails(element._id)
                                            );
                                          }}
                                        >
                                          <Edit2 size="18" />
                                        </button>
                                        <button
                                          type="button"
                                          title="Delete"
                                          className="text-red"
                                          onClick={(e) => {
                                            handleDelete(element._id);
                                          }}
                                        >
                                          <Trash size="18" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </>
          )}

          {/* About Details */}
          {customTab === "About Details" && (
            <>
              {getAboutLoading ? (
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
                      // About
                      about_img: getDataAboutDetailes?.about_image ?? "",
                      about_title: getDataAboutDetailes?.about_title ?? "",
                      about_description:
                        getDataAboutDetailes?.about_description ?? "",
                    }}
                    validationSchema={Yup.object().shape({
                      // About
                      about_img: Yup.string().required("Please Enter Image"),
                      about_title: Yup.string().required("Please Enter Title"),
                      about_description: Yup.string()
                        .min(15)
                        .required("Please Enter Description"),
                    })}
                    onSubmit={(values) => {
                      const aboutData = new FormData();
                      // About Section Api
                      aboutData.append("about_image", values.about_img);
                      aboutData.append("about_title", values.about_title);
                      aboutData.append(
                        "about_description",
                        values.about_description
                      );
                      dispatch(aboutDetailsPutData(aboutData));
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
                        <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 md:px-7 px-5 my-5">
                          <div className="mb-2 text-black font-bold text-xl">
                            About Details
                          </div>
                          <div className="grid lg:grid-cols-2 xl:gap-7 gap-4">
                            <div
                              className={`focus:outline-none focus:border-theme/80 w-full `}
                            >
                              <div className="h-full">
                                <label
                                  htmlFor="about_img"
                                  className="block mb-1 text-sm text-black"
                                >
                                  About image
                                </label>
                                <input
                                  id="about_img"
                                  type="file"
                                  accept=".png, .jpg, .jpeg,"
                                  name="about_img"
                                  onBlur={handleBlur}
                                  // value={values.about_img}
                                  onChange={(e) => {
                                    setImageAbout(
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                    setFieldValue(
                                      "about_img",
                                      e.target.files[0]
                                    );
                                  }}
                                  className="hidden"
                                />
                                <div
                                  className="relative w-full sm:h-[350px] md:h-[400px] h-[200px] rounded-md border bg-orange-50"
                                  onClick={() => {
                                    getClickAbout();
                                  }}
                                >
                                  <div className="w-full sm:h-[350px] md:h-[400px] h-[200px] rounded-md overflow-hidden">
                                    <LazyLoadImage
                                      effect="blur"
                                      width="100%"
                                      height="100%"
                                      src={imageAbout ?? DefaultAbout}
                                      className="w-full h-full object-contain"
                                      alt=""
                                    />
                                  </div>
                                  <div className="w-8 h-8 rounded-full shadow-lg absolute -top-3 -right-3 z-[0] bg-amber-200 flex items-center justify-center">
                                    <GalleryAdd size="18" />
                                  </div>
                                </div>
                                {errors.about_img && touched.about_img ? (
                                  <>
                                    <InputError errorTitle={errors.about_img} />
                                  </>
                                ) : null}
                              </div>
                            </div>
                            <div>
                              <div
                                className={`w-full mb-3 ${errors.about_title &&
                                  touched.about_title &&
                                  ` input-error `
                                  }`}
                              >
                                <label
                                  htmlFor="about_title"
                                  className="block mb-1 text-sm text-black"
                                >
                                  About title
                                </label>
                                <input
                                  type="text"
                                  id="about_title"
                                  name="about_title"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.about_title}
                                  className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                                  placeholder="About title"
                                />
                                {errors.about_title && touched.about_title ? (
                                  <>
                                    <InputError
                                      errorTitle={errors.about_title}
                                    />
                                  </>
                                ) : null}
                              </div>
                              <div
                                className={`${errors.about_description &&
                                  touched.about_description &&
                                  ` input-error `
                                  }`}
                              >
                                <label
                                  htmlFor="about_description"
                                  className="block mb-1 text-sm text-gray-90"
                                >
                                  About Description
                                </label>
                                <textarea
                                  id="about_description"
                                  rows="12"
                                  name="about_description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.about_description}
                                  className="border rounded-lg text-sm px-4 py-2 w-full shadow-sm block error-forms focus:border-theme/80"
                                  placeholder="Address..."
                                ></textarea>
                                {errors.about_description &&
                                  touched.about_description ? (
                                  <>
                                    <InputError
                                      errorTitle={errors.about_description}
                                    />
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          {/* About Form Submit Button */}
                          <div className="flex justify-center gap-4 mt-5 mb-2">
                            {aboutDetailesLoding ? (
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
        </section>
      </div>
    </>
  );
};

export default CustomDetails;
