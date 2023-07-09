import React, { useEffect, useState } from "react";
import { InputError } from "../../commons/MicroComponents";
import getSymbolFromCurrency from "currency-symbol-map";
import { useDispatch, useSelector } from "react-redux";
import RippleLoader from "../../commons/RippleLoader";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../commons/Breadcrumb";
import { GalleryAdd } from "iconsax-react";
import { Logo } from "../../assets/image";
import { Form, Formik } from "formik";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Select from "react-select";
import * as Yup from "yup";
import {
  getCountryData,
  getRestaurantDetails,
  getStateData,
  restaurantDetails,
} from "../../redux/restaurant/slice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Restaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [faviconImageFile, setFaviconImageFile] = useState(null);
  const [cropFaviconImageFile, setCropFaviconImageFile] = useState(null);
  const [cropper, setCropper] = useState();
  const [showModal, setShowModal] = useState(false);
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [isSubmittingForms, setIsSubmittingForms] = useState(false);
  const [stateDataAipValue, setStateDataAipValue] = useState([]);
  const [stateValue, setStateValue] = useState([]);
  const [taxStatusData, setTaxStatusData] = useState();

  const {
    restaurantGetDetails,
    getDataRestaurantLoading,
    getDataRestaurantError,
    putDataRestaurantLoading,
    countryDataGet,
    stateDataGet,
    stateDataPending,
  } = useSelector((store) => ({
    restaurantGetDetails:
      store?.homeadminData?.getRestaurantDetailsStatus?.data?.data,
    getDataRestaurantLoading:
      store?.homeadminData?.getRestaurantDetailsStatus.loading,
    putDataRestaurantLoading:
      store?.homeadminData?.restaurantDetailsStatus.loading,

    getDataRestaurantError: store?.homeadminData?.error,
    countryDataGet: store?.homeadminData?.getCountryDataStatus?.data?.data,
    stateDataGet: store?.homeadminData?.getStateDataStatus?.data?.data,
    stateDataPending: store?.homeadminData?.getStateDataStatus?.loading,
  }));

  // Handle Crop Image
  const handleCropImageChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setShowModal(true);
      setCropFaviconImageFile(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // Image Crop Data
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      }

      //Usage example:
      var file = dataURLtoFile(
        `${cropper.getCroppedCanvas().toDataURL() ?? ""}`
      );
      setCropFaviconImageFile(file);
      setFaviconImageFile(URL.createObjectURL(file));
    }
  };

  //  Logo Click
  const getLogoClick = () => {
    document.getElementById("restaurant_logo").click();
  };
  // Favicon Icon Click
  const getFaviconLogoClick = () => {
    document.getElementById("favicon_logo").click();
  };

  const selectCountry = countryDataGet?.map((element) => {
    return {
      value: `${element?.id}`,
      label: `${element?.name}`,
      isoCode: `${element?.isoCode}`,
      currency: `${element?.currency}`,
    };
  });

  // Get Country Data Value
  const CountryValueGet = {
    value: `${restaurantGetDetails?.country?.id}`,
    label: `${restaurantGetDetails?.country?.name}`,
    isoCode: `${restaurantGetDetails?.country?.isoCode}`,
    currency: `${restaurantGetDetails?.country?.currency}`,
  };

  const selectState = stateDataGet?.map((element) => {
    return { value: `${element?.id}`, label: `${element?.name}` };
  });

  // Get Country Data Value
  const editStateData = restaurantGetDetails?.state?.map((element) => {
    return { value: `${element?.id}`, label: `${element?.name}` };
  });

  const taxStatusOptions = [
    { value: "includes", label: "Includes " },
    { value: "excludes", label: "Excludes " },
    { value: "no_tax", label: "No Tax " },
  ];

  const getTaxStatusOptions = taxStatusOptions.map((e) => {
    if (e.value === restaurantGetDetails?.tax_status) {
      return e;
    }
  });

  useEffect(() => {
    setStateValue(selectState);
  }, [stateDataGet]);

  // Get Country Data And Restaurant
  useEffect(() => {
    dispatch(getRestaurantDetails());
    dispatch(getCountryData());
  }, [dispatch]);

  useEffect(() => {
    setLogoImageFile(restaurantGetDetails?.restaurant_logo);
    setFaviconImageFile(restaurantGetDetails?.favicon_logo);
    setCropFaviconImageFile(restaurantGetDetails?.favicon_logo);

    setTaxStatusData(restaurantGetDetails?.tax_status);
    setStateDataAipValue(editStateData?.map((e) => e.value));
    if (restaurantGetDetails?.country?.isoCode) {
      dispatch(getStateData(restaurantGetDetails?.country?.isoCode));
    }
  }, [restaurantGetDetails]);

  return (
    <>
      {(getDataRestaurantLoading || putDataRestaurantLoading) && (
        <RippleLoader />
      )}
      <div
        className={` ${(getDataRestaurantLoading || putDataRestaurantLoading) && ` hidden `
          } `}
      >
        <div className="mb-4 border-b border-gray-200">
          <div className="container px-4 py-2.5 mx-auto">
            <Breadcrumb
              breadCrumbTitle={"Restaurant Details"}
              breadCrumbParent={"Dashboard"}
              breadCrumbActive={"Restaurant Details"}
            />
          </div>
        </div>

        <section className="container px-4 mx-auto">
          <Formik
            enableReinitialize={true}
            initialValues={{
              restaurant_logo: restaurantGetDetails?.restaurant_logo ?? "",
              favicon_logo: restaurantGetDetails?.favicon_logo ?? "",
              restaurant_Name: restaurantGetDetails?.restaurant_name ?? "",
              restaurant_Phonenumber: restaurantGetDetails?.phone_no ?? "",
              restaurant_email: restaurantGetDetails?.email ?? "",
              Country: CountryValueGet ?? {},

              State: editStateData ?? [],

              restaurant_address: restaurantGetDetails?.address ?? "",
              user_app_link: restaurantGetDetails?.user_app_link ?? "",
              instagram_url: restaurantGetDetails?.URL_instagarm ?? "",
              twitter_url: restaurantGetDetails?.URL_twitter ?? "",
              facebook_url: restaurantGetDetails?.URL_facebook ?? "",
              Description: restaurantGetDetails?.description ?? "",

              taxStatus: getTaxStatusOptions ?? "",
              taxPercent: restaurantGetDetails?.tax_percent ?? "",
              delivery_charge: restaurantGetDetails?.delivery_charge ?? "",
              mondayOpenTime:
                restaurantGetDetails?.weeklyTime?.mondayOpenTime ?? "",
              mondayEndTime:
                restaurantGetDetails?.weeklyTime?.mondayEndTime ?? "",
              tuesdayOpenTime:
                restaurantGetDetails?.weeklyTime?.tuesdayOpenTime ?? "",
              tuesdayEndTime:
                restaurantGetDetails?.weeklyTime?.tuesdayEndTime ?? "",
              wednesdayOpenTime:
                restaurantGetDetails?.weeklyTime?.wednesdayOpenTime ?? "",
              wednesdayEndTime:
                restaurantGetDetails?.weeklyTime?.wednesdayEndTime ?? "",
              thursdayOpenTime:
                restaurantGetDetails?.weeklyTime?.thursdayOpenTime ?? "",
              thursdayEndTime:
                restaurantGetDetails?.weeklyTime?.thursdayEndTime ?? "",
              fridayOpenTime:
                restaurantGetDetails?.weeklyTime?.fridayOpenTime ?? "",
              fridayEndTime:
                restaurantGetDetails?.weeklyTime?.fridayEndTime ?? "",
              saturdayOpenTime:
                restaurantGetDetails?.weeklyTime?.saturdayOpenTime ?? "",
              saturdayEndTime:
                restaurantGetDetails?.weeklyTime?.saturdayEndTime ?? "",
              sundayOpenTime:
                restaurantGetDetails?.weeklyTime?.sundayOpenTime ?? "",
              sundayEndTime:
                restaurantGetDetails?.weeklyTime?.sundayEndTime ?? "",
            }}
            validationSchema={Yup.object().shape({
              restaurant_logo: Yup.mixed().required("Please Upload Logo Image"),
              favicon_logo: Yup.mixed().required("Please Upload Favicon Icon "),
              restaurant_Name: Yup.string()
                .min(3)
                .required("Please Restaurant Name"),
              restaurant_Phonenumber: Yup.string()
                .required("Phone number is required")
                .matches(
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                  "Phone number is not valid"
                )
                .min(10, "to short")
                .max(10, "to long"),
              restaurant_email: Yup.string().required("Please Enter Email "),
              Country: Yup.object().required("Please Enter Country "),
              State: Yup.array().min(1).required("Please Enter State "),
              user_app_link: Yup.string().required(
                "Please Enter User App Link"
              ),
              restaurant_address: Yup.string().required("Please Enter Address"),
              delivery_charge: Yup.string().required(
                "Please Enter Delivery Charge"
              ),
              Description: Yup.string()

                .min(15)
                .max(100)
                .required("Please Enter Description"),
              // taxStatus: Yup.object().shape({
              //   value: Yup.string().required("Required Tax Status"),
              //   label: Yup.string().required("Required Tax Status"),
              // }),
              // taxStatus: Yup.string().required("Please Enter Description"),
              taxPercent:
                (taxStatusData === "includes" ||
                  taxStatusData === "excludes") &&
                Yup.number()
                  .min(0)
                  .max(100)
                  .required("Please Enter Tax Percent"),
            })}
            onSubmit={(values) => {
              const fromData = new FormData();
              fromData.append("restaurant_logo", values.restaurant_logo);
              fromData.append("favicon_logo", cropFaviconImageFile); //values.favicon_logo);
              fromData.append("restaurant_name", values.restaurant_Name);
              fromData.append("phone_no", values.restaurant_Phonenumber);
              fromData.append("email", values.restaurant_email);

              // eslint-disable-next-line no-lone-blocks
              {
                values.instagram_url !== "" &&
                  values.instagram_url !== undefined &&
                  fromData.append("URL_instagarm", values.instagram_url);
              }
              // eslint-disable-next-line no-lone-blocks
              {
                values.twitter_url !== "" &&
                  values.twitter_url !== undefined &&
                  fromData.append("URL_twitter", values.twitter_url);
              }
              // eslint-disable-next-line no-lone-blocks
              {
                values.facebook_url !== "" &&
                  values.facebook_url !== undefined &&
                  fromData.append("URL_facebook", values.facebook_url);
              }

              fromData.append("country", values.Country.value);
              fromData.append(
                "currency",
                getSymbolFromCurrency(`${values.Country.currency}`)
              );
              fromData.append("state[]", JSON.stringify(stateDataAipValue));
              fromData.append("user_app_link", values.user_app_link);
              fromData.append("address", values.restaurant_address);
              fromData.append("description", values.Description);
              fromData.append("delivery_charge", values.delivery_charge);
              fromData.append("tax_status", taxStatusData);
              fromData.append(
                "tax_percent",
                values.taxPercent === "" ? 0 : values.taxPercent
              );
              fromData.append(
                "weeklyTime",
                JSON.stringify({
                  mondayOpenTime: values.mondayOpenTime,
                  mondayEndTime: values.mondayEndTime,
                  tuesdayOpenTime: values.tuesdayOpenTime,
                  tuesdayEndTime: values.tuesdayEndTime,
                  wednesdayOpenTime: values.wednesdayOpenTime,
                  wednesdayEndTime: values.wednesdayEndTime,
                  thursdayOpenTime: values.thursdayOpenTime,
                  thursdayEndTime: values.thursdayEndTime,
                  fridayOpenTime: values.fridayOpenTime,
                  fridayEndTime: values.fridayEndTime,
                  saturdayOpenTime: values.saturdayOpenTime,
                  saturdayEndTime: values.saturdayEndTime,
                  sundayOpenTime: values.sundayOpenTime,
                  sundayEndTime: values.sundayEndTime,
                })
              );
              dispatch(restaurantDetails(fromData)).then(
                (res) =>
                  res.type === "restaurantDetails/fulfilled" &&
                  sessionStorage.setItem("profileComplete", "true")
              );
              setIsSubmittingForms(true);
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleBlur,
              handleChange,
              handleSubmit,
              handleReset,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 md:px-7 px-5 mb-8">
                  <div className="mb-3 text-black font-bold text-xl">
                    Restaurant Details
                  </div>
                  <div className="focus:outline-none focus:border-theme/80 flex items-center w-full mb-5">
                    <div className="grid sm:grid-cols-2  sm:gap-20 gap-6">
                      <div>
                        <label
                          htmlFor="restaurant_logo"
                          className="block mb-1 text-sm text-black"
                        >
                          Restaurant Logo
                        </label>
                        <input
                          id="restaurant_logo"
                          name="restaurant_logo"
                          type="file"
                          accept=".png, .jpg, .jpeg,"
                          onBlur={handleBlur}
                          // value={values.restaurant_logos}
                          onChange={(e) => {
                            setLogoImageFile(
                              URL.createObjectURL(e.target.files[0])
                            );
                            setFieldValue(
                              "restaurant_logo",
                              e.currentTarget.files[0]
                            );
                          }}
                          className="hidden"
                        />
                        <div
                          className="relative border w-60 h-40 rounded-lg bg-amber-50"
                          onClick={() => {
                            getLogoClick();
                          }}
                        >
                          <div className="w-60 h-40 rounded-lg overflow-hidden">
                            <LazyLoadImage
                              effect="blur"
                              width="100%"
                              height="100%"
                              src={logoImageFile ?? Logo}
                              className="w-full h-full object-contain"
                              alt="restaurant_logo"
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full shadow-lg absolute -top-3 -right-3 z-[2] bg-amber-200 flex items-center justify-center">
                            <GalleryAdd size="18" />
                          </div>
                        </div>
                        {errors.restaurant_logo && touched.restaurant_logo ? (
                          <>
                            <InputError errorTitle={errors.restaurant_logo} />
                          </>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="favicon_logo"
                          className="block mb-1 text-sm text-black"
                        >
                          Favicon Icon
                        </label>
                        <input
                          id="favicon_logo"
                          name="favicon_logo"
                          onBlur={handleBlur}
                          type="file"
                          accept=".png, .jpg, .jpeg,"
                          // value={values.favicon_logo}
                          onChange={(e) => {
                            handleCropImageChange(e, setFieldValue);
                            setFieldValue(
                              "favicon_logo",
                              e.currentTarget.files[0]
                            );
                          }}
                          className="hidden"
                        />
                        <div
                          className="relative border w-32 h-32 rounded-lg bg-amber-50"
                          onClick={() => {
                            getFaviconLogoClick();
                          }}
                        >
                          <div className="w-32 h-32 rounded-lg overflow-hidden">
                            <LazyLoadImage
                              effect="blur"
                              width="100%"
                              height="100%"
                              src={faviconImageFile ?? Logo}
                              className="w-full h-full object-contain"
                              alt="favicon_logo"
                            />
                          </div>
                          <div className="w-8 h-8 rounded-full shadow-lg absolute -top-3 -right-3 z-[2] bg-amber-200 flex items-center justify-center">
                            <GalleryAdd size="18" />
                          </div>
                        </div>
                        {errors.favicon_logo && touched.favicon_logo ? (
                          <>
                            <InputError errorTitle={errors.favicon_logo} />
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:gap-5 gap-3 lg:flex-nowrap flex-wrap mb-3">
                    <div
                      className={`w-full ${errors.restaurant_Name &&
                        touched.restaurant_Name &&
                        ` input-error `
                        }`}
                    >
                      <label
                        htmlFor="restaurant_Name"
                        className="block mb-1 text-sm text-black"
                      >
                        Restaurant Name
                      </label>
                      <input
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.restaurant_Name}
                        id="restaurant_Name"
                        className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                        placeholder="Restaurant Name"
                      />
                      {errors.restaurant_Name && touched.restaurant_Name ? (
                        <>
                          <InputError errorTitle={errors.restaurant_Name} />
                        </>
                      ) : null}
                    </div>
                    <div
                      className={`number-arrows-remove w-full ${errors.restaurant_Phonenumber &&
                        touched.restaurant_Phonenumber &&
                        ` input-error `
                        }`}
                    >
                      <label
                        htmlFor="restaurant_Phonenumber"
                        className="block mb-1 text-sm text-black"
                      >
                        Phone No
                      </label>
                      <input
                        type="tel"
                        id="restaurant_Phonenumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.restaurant_Phonenumber}
                        className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                        placeholder="Phone No"
                      />
                      {errors.restaurant_Phonenumber &&
                        touched.restaurant_Phonenumber ? (
                        <>
                          <InputError
                            errorTitle={errors.restaurant_Phonenumber}
                          />
                        </>
                      ) : null}
                    </div>
                    <div
                      className={`w-full ${errors.restaurant_email &&
                        touched.restaurant_email &&
                        ` input-error `
                        }`}
                    >
                      <label
                        htmlFor="restaurant_email"
                        className="block mb-1 text-sm text-black"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="restaurant_email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.restaurant_email}
                        className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                        placeholder="example@gmail.com"
                      />
                      {errors.restaurant_email && touched.restaurant_email ? (
                        <>
                          <InputError errorTitle={errors.restaurant_email} />
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex lg:gap-5 gap-3 lg:flex-nowrap flex-wrap mb-3">
                    <div
                      className={`w-full ${errors.user_app_link &&
                        touched.user_app_link &&
                        ` input-error `
                        }`}
                    >
                      <label
                        htmlFor="user_app_link"
                        className="block mb-1 text-sm text-black"
                      >
                        User App Link
                      </label>
                      <input
                        type="url"
                        id="user_app_link"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.user_app_link}
                        className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                        placeholder="https:/www.foodApp.com/"
                      />
                      {errors.user_app_link && touched.user_app_link ? (
                        <>
                          <InputError errorTitle={errors.user_app_link} />
                        </>
                      ) : null}
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="facebook_url"
                        className="block mb-1 text-sm text-black"
                      >
                        Facebook User Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="facebook_url"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.facebook_url}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full pr-4 py-2 pl-[166px] focus:border-theme/80 truncate"
                          placeholder="Facebook User Name"
                        />
                        <p className="absolute top-2 left-2 font-thin pointer-events-none">
                          www.facebook.com/
                        </p>
                      </div>
                      {errors.facebook_url && touched.facebook_url ? (
                        <>
                          <InputError errorTitle={errors.facebook_url} />
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex lg:gap-5 gap-3 lg:flex-nowrap flex-wrap mb-3">
                    <div className="w-full">
                      <label
                        htmlFor="twitter_url"
                        className="block mb-1 text-sm text-black"
                      >
                        Twitter User Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="twitter_url"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.twitter_url}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full pr-4 py-2 pl-[145px] focus:border-theme/80 truncate"
                          placeholder="Twitter User Name"
                        />
                        <p className="absolute top-2 left-2 font-thin pointer-events-none">
                          www.twitter.com/
                        </p>
                      </div>
                      {errors.twitter_url && touched.twitter_url ? (
                        <>
                          <InputError errorTitle={errors.twitter_url} />
                        </>
                      ) : null}
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="instagram_url"
                        className="block mb-1 text-sm text-black"
                      >
                        Instagram User Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="instagram_url"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.instagram_url}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full pr-4 py-2 error-forms pl-44 focus:border-theme/80"
                          placeholder="Instagram User Name"
                        />
                        <p className="absolute top-2 left-2 font-thin pointer-events-none">
                          www.instagram.com/
                        </p>
                      </div>
                      {errors.instagram_url && touched.instagram_url ? (
                        <>
                          <InputError errorTitle={errors.instagram_url} />
                        </>
                      ) : null}
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    className={`mb-3 ${errors.Description &&
                      touched.Description &&
                      ` input-error `
                      } `}
                  >
                    <label
                      htmlFor="Description"
                      className="block mb-1 text-sm text-gray-90"
                    >
                      Description
                    </label>
                    <textarea
                      id="Description"
                      rows="4"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.Description}
                      className="border rounded-lg text-sm px-4 py-2 w-full shadow-sm block error-forms focus:border-theme/80"
                      placeholder="Description..."
                    />
                    {errors.Description && touched.Description ? (
                      <>
                        <InputError errorTitle={errors.Description} />
                      </>
                    ) : null}
                  </div>
                </div>
                {/* Tax Details */}
                <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 md:px-7 px-5 mb-8">
                  <div className="mb-3 text-black font-bold text-xl">
                    Tax Details
                  </div>
                  <div className="flex lg:flex-nowrap flex-wrap gap-5 mb-3">
                    <div className="w-full">
                      <label
                        htmlFor="taxStatus"
                        className="block mb-1 text-sm text-black"
                      >
                        Tax Status
                      </label>
                      <Select
                        options={taxStatusOptions}
                        name="taxStatus"
                        id="taxStatus"
                        onChange={(e) => {
                          setFieldValue("taxStatus", e);
                          setTaxStatusData(e.value);
                        }}
                        onBlur={handleBlur("taxStatus")}
                        value={values.taxStatus}
                      />
                      {errors.taxStatus && touched.taxStatus ? (
                        <>
                          <InputError errorTitle={errors.taxStatus} />
                        </>
                      ) : null}
                    </div>

                    {taxStatusData === "no_tax" ? (
                      <></>
                    ) : (
                      <div
                        className={`mb-3 w-full ${errors.taxPercent &&
                          touched.taxPercent &&
                          ` input-error `
                          } `}
                      >
                        <label
                          htmlFor="taxPercent"
                          className="block mb-1 text-sm text-black"
                        >
                          Tax Percent
                        </label>
                        <div className="relative">
                          <input
                            type={"number"}
                            onWheel={(e) => e.target.blur()}
                            className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms pr-8 focus:border-theme/80"
                            name="taxPercent"
                            id="taxPercent"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.taxPercent}
                            placeholder="Tax Percent"
                          />
                          <div className="absolute top-[7px] right-[10px] pointer-events-none">
                            %
                          </div>
                        </div>
                        {errors.taxPercent && touched.taxPercent ? (
                          <>
                            <InputError errorTitle={errors.taxPercent} />
                          </>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
                {/* Delivery Charge */}
                <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 md:px-7 px-5 mb-8">
                  <div className="mb-3 text-black font-bold text-xl">
                    Default Delivery charge
                  </div>
                  <div
                    className={`${errors.delivery_charge &&
                      touched.delivery_charge &&
                      ` input-error `
                      }  `}
                  >
                    <label
                      htmlFor="restaurant_address"
                      className="block mb-1 text-sm text-gray-90"
                    >
                      Delivery Charge
                    </label>
                    <input
                      id="delivery_charge"
                      name="delivery_charge"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.delivery_charge}
                      className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                      placeholder="Delivery Charge Amount "
                    />
                  </div>
                  {errors.delivery_charge && touched.delivery_charge ? (
                    <>
                      <InputError errorTitle={errors.delivery_charge} />
                    </>
                  ) : null}
                  <div className="bg-rose-200 py-2.5 px-3 rounded-lg my-2 font-semibold text-sm">
                    <Link to={"/discount"}>
                      Note: Apply any delivery offer to not Apply default delivery
                      charge
                    </Link>
                  </div>
                </div>
                {/* Address */}
                <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 md:px-7 px-5 mb-8">
                  <div className="mb-3 text-black font-bold text-xl">
                    Address Details
                  </div>
                  <div className="flex lg:flex-nowrap flex-wrap gap-5 mb-3">
                    <div
                      className={`focus:outline-none focus:border-theme/80 w-full `}
                    >
                      <label
                        htmlFor="Country"
                        className="block mb-1 text-sm text-black"
                      >
                        Country
                      </label>
                      <Select
                        options={selectCountry}
                        id="Country"
                        name="Country"
                        onChange={(e) => {
                          setFieldValue("Country", e);
                          dispatch(getStateData(e.isoCode));
                          setFieldValue("State", []);
                        }}
                        onBlur={handleBlur("Country")}
                        value={values.Country}
                        className={`text-sm error-forms  ${errors.Country && touched.Country && ` input-error `
                          }`}
                      />

                      {errors.Country && touched.Country ? (
                        <>
                          <InputError errorTitle={errors.Country} />
                        </>
                      ) : null}
                    </div>
                    <div
                      className={`focus:outline-none focus:border-theme/80 w-full `}
                    >
                      <label
                        htmlFor="State"
                        className="block mb-1 text-sm text-black"
                      >
                        State
                      </label>
                      <Select
                        isMulti
                        id="State"
                        name="State"
                        options={stateDataPending ? [] : stateValue}
                        isLoading={stateDataPending}
                        onChange={(e) => {
                          setFieldValue("State", e);
                          setStateDataAipValue(
                            e?.map((element) => element.value)
                          );
                        }}
                        onBlur={handleBlur("State")}
                        value={values.State}
                        className={`text-sm error-forms ${errors.State && touched.State && ` input-error `
                          }`}
                      />
                      {errors.State && touched.State ? (
                        <>
                          <InputError errorTitle={errors.State} />
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className={`mb-3 ${errors.restaurant_address &&
                      touched.restaurant_address &&
                      ` input-error `
                      }`}
                  >
                    <label
                      htmlFor="restaurant_address"
                      className="block mb-1 text-sm text-gray-90"
                    >
                      Address
                    </label>
                    <textarea
                      id="restaurant_address"
                      rows="3"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.restaurant_address}
                      className="border rounded-lg text-sm px-4 py-2 w-full shadow-sm block error-forms focus:border-theme/80"
                      placeholder="Address..."
                    />
                    {errors.restaurant_address && touched.restaurant_address ? (
                      <>
                        <InputError errorTitle={errors.restaurant_address} />
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Get Weekly Time */}
                <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 md:px-7 px-5 mb-8 ">
                  <div className="mb-3 text-black font-bold text-xl">
                    Weekly Time
                  </div>
                  <div className="overflow-auto">
                    <div className="my-6 min-w-[500px] sm:min-w-full mx-auto">
                      <div className="flex items-center gap-5 mb-3">
                        <p className="min-w-[80px]">Monday</p>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="mondayOpenTime"
                            name="mondayOpenTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mondayOpenTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="mondayOpenTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Open Time
                          </label>
                        </div>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="mondayEndTime"
                            name="mondayEndTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mondayEndTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="mondayEndTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Close Time
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mb-3">
                        <p className="min-w-[80px]">Tuesday</p>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="tuesdayOpenTime"
                            name="tuesdayOpenTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tuesdayOpenTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="tuesdayOpenTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Open Time
                          </label>
                        </div>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="tuesdayEndTime"
                            name="tuesdayEndTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tuesdayEndTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer "
                          />
                          <label
                            htmlFor="tuesdayEndTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Close Time
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mb-3">
                        <p className="min-w-[80px]">Wednesday</p>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="wednesdayOpenTime"
                            name="wednesdayOpenTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.wednesdayOpenTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="wednesdayOpenTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Open Time
                          </label>
                        </div>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="wednesdayEndTime"
                            name="wednesdayEndTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.wednesdayEndTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="wednesdayEndTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Close Time
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mb-3">
                        <p className="min-w-[80px]">Thursday</p>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="thursdayOpenTime"
                            name="thursdayOpenTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.thursdayOpenTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="thursdayOpenTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Open Time
                          </label>
                        </div>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="thursdayEndTime"
                            name="thursdayEndTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.thursdayEndTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="thursdayEndTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Close Time
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mb-3">
                        <p className="min-w-[80px]">Friday</p>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="fridayOpenTime"
                            name="fridayOpenTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fridayOpenTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="fridayOpenTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Open Time
                          </label>
                        </div>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="fridayEndTime"
                            name="fridayEndTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fridayEndTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="fridayEndTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Close Time
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mb-3">
                        <p className="min-w-[80px]">Saturday</p>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="saturdayOpenTime"
                            name="saturdayOpenTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.saturdayOpenTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="saturdayOpenTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Open Time
                          </label>
                        </div>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="saturdayEndTime"
                            name="saturdayEndTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.saturdayEndTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="saturdayEndTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Close Time
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mb-3">
                        <p className="min-w-[80px]">Sunday</p>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="sundayOpenTime"
                            name="sundayOpenTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sundayOpenTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="sundayOpenTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Open Time
                          </label>
                        </div>
                        <div className={`relative w-full`}>
                          <input
                            type="time"
                            id="sundayEndTime"
                            name="sundayEndTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sundayEndTime}
                            className="block border px-2.5 pb-2.5 pt-2 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-theme/80 peer"
                          />
                          <label
                            htmlFor="sundayEndTime"
                            className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Close Time
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* submit form */}
                <div className="flex justify-center gap-4 my-5">
                  <button
                    type="submit"
                    className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-8 py-2 font-semibold shadow-lg transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                    className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 px-6 py-2 font-semibold shadow-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
        {/* Modal  Cropper*/}
        <div>
          <div className="relative">
            {showModal ? (
              <>
                <div className="backdrop-blur-sm bg-black/40 flex items-center justify-center h-screen w-full fixed top-0 left-0 right-0 z-[999999] mx-auto">
                  <div className="">
                    <div className="bg-[#fffcf7] shadow-lg rounded-lg overflow-hidden max-w-[500px] max-h-[500px] p-6 overflow-y-auto mx-auto">
                      <div className="grid gap-8 ">
                        <div className="w-96 h-96 overflow-hidden mx-auto">
                          <h1 className="font-bold mb-8">Crop Image</h1>
                          <Cropper
                            className={`!w-full !h-96`}
                            src={cropFaviconImageFile}
                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                            onInitialized={(instance) => {
                              setCropper(instance);
                            }}
                            dragMode={"move"}
                            aspectRatio={1 / 1}
                            autoCropArea={0.65}
                            restore={false}
                            guides={false}
                            center={false}
                            highlight={false}
                            cropBoxMovable={true}
                            cropBoxResizable={false}
                            toggleDragModeOnDblclick={false}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center gap-4 pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            getCropData();
                            setShowModal(false);
                          }}
                          className="bg-theme border-theme border-2 px-8 py-2 lg:text-base text-sm font-semibold shadow-lg hover:border-theme rounded-md hover:bg-transparent transition duration-200"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                          }}
                          className="bg-rose-500 text-white rounded-md hover:border-rose-500 border-2 px-6 py-2 lg:text-base text-sm font-semibold shadow-lg hover:text-black border-rose-500 hover:bg-transparent transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
