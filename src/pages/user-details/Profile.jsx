import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Defimage2, userDefault } from "../../assets/image";
import Breadcrumb from "../../commons/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { InputError } from "../../commons/MicroComponents";
import { adminGetProfileData, adminProfile } from "../../redux/auth/slice";
import { GalleryAdd } from "iconsax-react";
import RippleLoader from "../../commons/RippleLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Profile = () => {
  const [userImage, setUserImage] = useState();
  const [profileFromSubmit, setProfileFromSubmit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getProfileData, profileLoading, profileError } = useSelector(
    (store) => ({
      getProfileData: store?.authData?.adminGetProfileDataStatus?.data?.data,
      profileLoading: store?.authData?.loading,
      profileError: store?.authData?.error,
    })
  );
  const getFile = () => {
    document.getElementById("profile_image").click();
  };

  const handleChangeUserImage = (files, setFieldValue) => {
    setUserImage(URL.createObjectURL(files));
    setFieldValue("profile_image", files);
  };

  useEffect(() => {
    dispatch(adminGetProfileData());
  }, [dispatch]);

  useEffect(() => {
    setUserImage(getProfileData?.profile_image);
  }, [getProfileData?.profile_image]);

  useEffect(() => {
    if (!profileLoading && !profileError && profileFromSubmit) {
      navigate("/");
    }
  }, [profileFromSubmit, profileLoading, profileError, navigate]);

  return (
    <>
      {profileLoading && <RippleLoader />}
      {/* {profileError && <LazyloadLoader />} */}
      <div className={`${profileLoading && "hidden"} `}>
        <div className={`mb-4 border-b border-gray-200 `}>
          <div className="container px-4 py-2.5 mx-auto">
            <Breadcrumb
              breadCrumbTitle={"Profile"}
              breadCrumbParent={"Dashboard"}
              breadCrumbActive={"Profile"}
              breadCrumbTitleKey={"/"}
            />
          </div>
        </div>
        <div className={`container px-4 mx-auto `}>
          <section className="max-w-3xl mx-auto">
            {/* User Profile */}
            <Formik
              enableReinitialize={true}
              initialValues={{
                profile_image: getProfileData?.profile_image ?? "",
                first_name: getProfileData?.first_name ?? "",
                last_name: getProfileData?.last_name ?? "",
                email: getProfileData?.email ?? "",
                mobile_no: getProfileData?.mobile_no ?? "",
                company_name: getProfileData?.company_name ?? "",
                description: getProfileData?.description ?? "",
              }}
              validationSchema={Yup.object().shape({
                profile_image: Yup.string().required("Please Add Image"),
                first_name: Yup.string().min(3).required("Please First Name"),
                last_name: Yup.string().min(3).required("Please Last Name"),
                email: Yup.string().required("Please Enter Email"),
                mobile_no: Yup.string()
                  .required("required")
                  .matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    "Phone number is not valid"
                  )
                  .min(10, "to short")
                  .max(10, "to long"),
                company_name: Yup.string()
                  .min(3)
                  .required("Please Company Name"),
                description: Yup.string()
                  .min(15)
                  .required("Please Enter Description"),
              })}
              onSubmit={(values) => {
                const formData = new FormData();
                formData.append("profile_image", values.profile_image);
                formData.append("first_name", values.first_name);
                formData.append("last_name", values.last_name);
                formData.append("company_name", values.company_name);
                formData.append("description", values.description);
                formData.append("email", values.email);
                formData.append("mobile_no", values.mobile_no);
                dispatch(adminProfile(formData));
                setProfileFromSubmit(true);
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
                  <div className="bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.1)] rounded-lg  mx-auto w-full p-6 mb-8">
                    <div className="">
                      <h1 className="mb-3 text-lg font-semibold">Profile</h1>
                    </div>
                    <div className="">
                      <label htmlFor="profile_image" className="text-sm">
                        Profile Image
                      </label>
                      <div className="flex my-1">
                        <div>
                          <input
                            type="file"
                            id="profile_image"
                            name="profile_image"
                            onChange={(e) =>
                              handleChangeUserImage(
                                e.target.files[0],
                                setFieldValue
                              )
                            }
                            onBlur={handleBlur}
                            // value={values.profile_image}
                            className="w-0 h-0"
                            accept=".png, .jpg, .jpeg,"
                          />
                        </div>
                        <div
                          className="relative border w-36 h-36 rounded-lg bg-amber-200  shadow-sm"
                          onClick={() => {
                            getFile();
                          }}
                        >
                          <div className="w-8 h-8 rounded-full shadow-lg absolute -top-3 -right-3 z-[2] bg-amber-200 flex items-center justify-center">
                            <GalleryAdd size="20" />
                          </div>
                          <div className="w-36 h-36 rounded-lg overflow-hidden">
                            <LazyLoadImage
                              effect="blur"
                              width="100%"
                              height="100%"
                              src={userImage ?? userDefault}
                              alt="imageFile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      {errors.profile_image && touched.profile_image ? (
                        <InputError errorTitle={errors.profile_image} />
                      ) : null}
                    </div>

                    <div className="flex gap-5 my-4">
                      <div
                        className={`${errors.first_name && touched.first_name
                          ? ` input-error `
                          : ` `
                          } w-full `}
                      >
                        <label
                          htmlFor="first_name"
                          className="block mb-1 text-sm text-black"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.first_name}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                          placeholder="John"
                        />
                        {errors.first_name && touched.first_name ? (
                          <InputError errorTitle={errors.first_name} />
                        ) : null}
                      </div>
                      <div
                        className={`${errors.last_name && touched.last_name
                          ? ` input-error `
                          : ` `
                          } w-full `}
                      >
                        <label
                          htmlFor="last_name"
                          className="block mb-1 text-sm text-black"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.last_name}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                          placeholder="Doe"
                        />
                        {errors.last_name && touched.last_name ? (
                          <InputError errorTitle={errors.last_name} />
                        ) : null}
                      </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                      <div
                        className={`${errors.email && touched.email ? ` input-error ` : ` `
                          } w-full `}
                      >
                        <label
                          htmlFor="email"
                          className="block mb-1 text-sm text-black"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                          placeholder="name@example.com"
                        />
                        {errors.email && touched.email ? (
                          <InputError errorTitle={errors.email} />
                        ) : null}
                      </div>
                      <div
                        className={`${errors.mobile_no && touched.mobile_no
                          ? ` input-error `
                          : ` `
                          } w-full number-arrows-remove `}
                      >
                        <label
                          htmlFor="mobile_no"
                          className="block mb-1 text-sm text-black"
                        >
                          Phone No
                        </label>
                        <input
                          type="tel"
                          id="mobile_no"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mobile_no}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                          placeholder="Mobile No"
                        />
                        {errors.mobile_no && touched.mobile_no ? (
                          <InputError errorTitle={errors.mobile_no} />
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div
                        className={`${errors.company_name && touched.company_name
                          ? ` input-error `
                          : ` `
                          } w-full `}
                      >
                        <label
                          htmlFor="company_name"
                          className="block mb-1 text-sm text-black"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.company_name}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 error-forms focus:border-theme/80"
                          placeholder="Compnay name"
                        />
                        {errors.company_name && touched.company_name ? (
                          <InputError errorTitle={errors.company_name} />
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div
                        className={`${errors.description && touched.description
                          ? ` input-error `
                          : ` `
                          } w-full `}
                      >
                        <label
                          htmlFor="description"
                          className="block mb-1 text-sm text-black"
                        >
                          Description
                        </label>
                        <textarea
                          type="text"
                          id="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          className="border shadow-sm text-black text-sm rounded-lg block w-full px-4 py-2 focus:border-theme/80 error-forms"
                          placeholder="Description"
                        />
                        {errors.description && touched.description ? (
                          <InputError errorTitle={errors.description} />
                        ) : null}
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 pt-3">
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
                  </div>
                </Form>
              )}
            </Formik>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
