import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  categoriesAddApi,
  categoriesDataEdit,
  categoriesGetIDApi,
} from "../../redux/categories/slice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InfoCircle, GalleryAdd } from "iconsax-react";
import { Defimage } from "../../assets/image";
import Breadcrumb from "../../commons/Breadcrumb";
import RippleLoader from "../../commons/RippleLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Loader } from "../../assets/svg/AllSvg";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get("id");
  const categoriesData = location?.state?.items;

  const [imageFile, setImageFile] = useState(null);

  const {
    categoryStatusADDLoading,
    categoryStatusAddError,
    categoryStatusUpdateLoading,
    categoryStatusUpdateError,
    categoriesGetIDApiData,
    getCategoryDataLoading,
  } = useSelector((store) => ({
    categoryStatusADDLoading:
      store?.categoriesData?.categoriesAddStatus?.loading,
    categoryStatusAddError: store?.categoriesData?.categoriesAddStatus?.error,
    categoryStatusUpdateLoading:
      store?.categoriesData?.categoriesEditStatus?.loading,
    categoryStatusUpdateError:
      store?.categoriesData?.categoriesEditStatus?.error,
    categoriesGetIDApiData:
      store?.categoriesData?.categoriesGetIDStatus?.data?.data,
    getCategoryDataLoading:
      store?.categoriesData?.categoriesGetIDStatus?.loading,
  }));

  useEffect(() => {
    if (categoriesData)
      setImageFile(categoryId ? categoriesData?.categoriesImage : Defimage);
  }, [categoriesData, categoryId]);

  const getFile = () => {
    document.getElementById("categoriesImage").click();
  };
  const uploadImage = (files, setFieldValue) => {
    setImageFile(URL.createObjectURL(files));
    setFieldValue("categoriesImage", files);
  };

  return (
    <>
      {/* {categoryStatusADDLoading && <RippleLoader />}
      {categoryStatusUpdateLoading && <RippleLoader />} */}
      {/* {getCategoryDataLoading && <RippleLoader />} */}
      {/* {(categoryStatusADDLoading ||
        categoryStatusUpdateLoading ||
        getCategoryDataLoading) &&
        ` hidden `} */}
      <div className={``}>
        <div className="mb-4 border-b border-gray-200">
          <div className="container px-4 py-2.5 mx-auto">
            <Breadcrumb
              breadCrumbTitle={"Categories"}
              breadCrumbTitleKey={"/Categories"}
              breadCrumbParent={"Categories"}
              breadCrumbActive={`${categoryId ? `Update` : `Add`} Category`}
            />
          </div>
        </div>

        <section className="container px-4 mx-auto ">
          <Formik
            enableReinitialize={true}
            initialValues={{
              categoriesImage: categoryId
                ? categoriesData?.categoriesImage
                : "",
              categories_name: categoryId
                ? categoriesData?.categories_name
                : "",
              description: categoryId ? categoriesData?.description : "",
            }}
            validationSchema={Yup.object().shape({
              categoriesImage: Yup.mixed().required("Please Upload Image"),
              // .test(
              //   "fileSize",
              //   "File too large",
              //   (value) => value && value.size <= FILE_SIZE
              // ),
              categories_name: Yup.string().required(
                "Please Enter Category Name"
              ),
              description: Yup.string()
                .min(15)
                .required("Please Enter Description"),
            })}
            onSubmit={(values, { resetForm }) => {
              const formData = new FormData();
              formData.append("categoriesImage", values.categoriesImage);
              formData.append("categories_name", values.categories_name);
              formData.append("description", values.description);
              if (categoryId) {
                dispatch(
                  categoriesDataEdit({ id: categoryId, data: formData })
                ).then(
                  (res) =>
                    res.type === "categoriesDataEdit/fulfilled" &&
                    navigate(`/categories`)
                );
                // setFormSubmittingUpdate(true);
                resetForm();
              } else {
                dispatch(categoriesAddApi(formData)).then(
                  (res) =>
                    res.type === "categoriesAddApi/fulfilled" &&
                    navigate(`/categories`)
                );
                // setFormSubmitting(true);
                resetForm();
              }
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
                <div className="max-w-3xl mx-auto mb-8 bg-white rounded-lg p-6 shadow-md">
                  {categoryId ? (
                    <>
                      <h1 className="mb-3 text-xl font-semibold">
                        Edit Category
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="mb-3 text-xl font-semibold">
                        Add New Category
                      </h1>
                    </>
                  )}

                  <div className="">
                    <label htmlFor="categoriesImage" className="text-sm">
                      Category Image
                    </label>
                    <div className="flex mt-1">
                      <div>
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg,"
                          id="categoriesImage"
                          name="categoriesImage"
                          className="w-0 h-0"
                          // value={values.categoriesImage}
                          onBlur={handleBlur}
                          onChange={(e) =>
                            uploadImage(e.target.files[0], setFieldValue)
                          }
                        />
                      </div>
                      <div
                        className="relative border w-36 h-36 rounded-lg bg-amber-50 "
                        onClick={() => {
                          getFile();
                        }}
                      >
                        <div className="w-8 h-8 rounded-full shadow-lg absolute -top-3 -right-3 z-[2] bg-amber-200 flex items-center justify-center">
                          <GalleryAdd size="18" />
                        </div>
                        <div className="w-36 h-36 rounded-lg overflow-hidden">
                          <LazyLoadImage
                            effect="blur"
                            width="100%"
                            height="100%"
                            src={imageFile ?? Defimage}
                            alt="imageFile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    {errors.categoriesImage && touched.categoriesImage ? (
                      <>
                        <div className="flex items-center text-red text-sm  mt-2">
                          <span>
                            <InfoCircle size="16" />
                          </span>
                          <p className="ml-1">{errors.categoriesImage}</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div
                    className={`${errors.categories_name && touched.categories_name
                      ? ` input-error `
                      : ``
                      } my-4  `}
                  >
                    <label htmlFor="categories_name" className="text-sm">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="categories_name"
                      id="categories_name"
                      className="border rounded-lg py-1.5 px-2 w-full mt-1 shadow-sm error-forms focus:border-theme/80"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.categories_name}
                    />
                    {errors.categories_name && touched.categories_name ? (
                      <>
                        <div className="flex items-center text-red text-sm">
                          <span>
                            <InfoCircle size="16" />
                          </span>
                          <p className="ml-1">{errors.categories_name}</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div
                    className={`${errors.description && touched.description
                      ? ` input-error `
                      : ``
                      } mb-4  `}
                  >
                    <label htmlFor="description" className="text-sm">
                      Description
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      rows={3}
                      className="border rounded-lg px-2 py-1 w-full mt-1 shadow-sm error-forms focus:border-theme/80"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {errors.description && touched.description ? (
                      <>
                        <div className="flex items-center text-red text-sm">
                          <span>
                            <InfoCircle size="16" />
                          </span>
                          <p className="ml-1">{errors.description}</p>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div className={" flex justify-center gap-4"}>
                    {categoryStatusADDLoading || categoryStatusUpdateLoading ? (
                      <>
                        <Loader width={45} />
                      </>
                    ) : (
                      <>
                        {categoryId ? (
                          <>
                            <button
                              type="submit"
                              className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-8 py-2 lg:text-base text-sm font-semibold shadow-lg transition duration-200"
                            >
                              Update
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="submit"
                              className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-8 py-2 lg:text-base text-sm font-semibold shadow-lg transition duration-200"
                            >
                              Add
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 px-6 py-2 lg:text-base text-sm font-semibold shadow-lg transition duration-200"
                          onClick={() => {
                            navigate("/categories");
                          }}
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
        </section>
      </div>
    </>
  );
};

export default AddCategory;
