import React, { Fragment, useEffect, useState } from "react";
import { categoriesDataGet } from "../../redux/categories/slice";
import { useLocation, useNavigate } from "react-router-dom";
import { InputError } from "../../commons/MicroComponents";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Formik, Form, FieldArray } from "formik";
import Breadcrumb from "../../commons/Breadcrumb";
import { Navigation } from "swiper";
import Select from "react-select";
import Swal from "sweetalert2";
import * as Yup from "yup";
import {
  productPostDataApi,
  productsGetDataIdApi,
  productsPutDataIdApi,
  removeProductImage,
} from "../../redux/products/slice";
// icon
import { Trash, GalleryAdd, Edit2, Minus } from "iconsax-react";
// image
import { Defimage } from "../../assets/image";
import RippleLoader from "../../commons/RippleLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const ProductId = new URLSearchParams(location.search).get("id");
  const productsIdData = location?.state?.element;

  const [selectProductQuality, setSelectProductQuality] = useState(false);
  const [indexProductQuality, setIndexProductQuality] = useState();
  const [addonsAdd, setAddonsAdd] = useState(false);
  const [indexAddons, setIndexAddons] = useState();

  // Submit From State
  const [productsAddFromSubmit, setProductsAddFromSubmit] = useState(false);
  // Update From State
  const [productsUpdateFromSubmit, setProductsUpdateFromSubmit] =
    useState(false);
  const [addPostimageFile, setAddPostimageFile] = useState([]);
  const [imageFile, setImageFile] = useState([].reverse());

  const [productPutOptions, setProductPutOptions] = useState([]);

  const {
    CategoryIdGet,
    productDataGetId,
    productAddLoading,
    productAddError,
  } = useSelector((store) => ({
    CategoryIdGet:
      store?.categoriesData?.categoriesGetStatus?.data?.data?.results,
    productAddLoading: store?.productsData?.loading,
    productAddError: store?.productsData?.error,
    productDataGetId: store?.productsData?.productsGetDataIdstatus?.data?.data,
  }));

  const getFile = () => {
    document.getElementById("productImage").click();
  };

  const handleFileChange = (files, setFieldValue) => {
    setFieldValue("productImage", [...files]);
    const postImage = [...files];
    setAddPostimageFile((add) => [...add, ...postImage]);

    const selectedFIles = [];
    const targetFilesObject = [...files];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImageFile((data) => [...data, ...selectedFIles].reverse());
  };

  const handleDeleteImage = (index) => {
    // preview
    const tempImage = [...imageFile];
    tempImage.splice(index, 1);
    setImageFile(() => [...tempImage]);
    // tempPostImage
    const tempPostImage = [...addPostimageFile];
    tempPostImage.splice(index, 1);
    setAddPostimageFile(() => [...tempPostImage]);
  };

  const handleDeleteImageApi = (ProductId, ProductImageLink) => {
    const imageLinkSplit = ProductImageLink.split("/");
    const imageArrayLastIndex = imageLinkSplit[imageLinkSplit.length - 1];
    dispatch(
      removeProductImage({
        ProductId: ProductId,
        ProductImageLink: imageArrayLastIndex,
      })
    );
  };

  const options = (CategoryIdGet || [])?.map((element, index) => {
    return { value: `${element.id}`, label: `${element.categories_name}` };
  });

  // quality Points Handle Delete
  const qualityHandleDelete = (arrayHelpers, index) => {
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
        arrayHelpers.remove(index);
      }
    });
  };
  // addon Handle Delete
  const handleDelete = (arrayHelpers, index) => {
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
        arrayHelpers.remove(index);
      }
    });
  };

  // useEffect(() => {
  //   if (ProductId) {
  //     dispatch(productsGetDataIdApi({ id: ProductId }));
  //   }
  // }, [ProductId, dispatch]);

  useEffect(() => {
    const temp = productsIdData?.categoryId?.map((element) => ({
      value: element?.value,
      label: element?.label,
    }));
    setProductPutOptions(temp);
    return () => {
      setProductPutOptions([]);
    };
  }, [productsIdData]);

  useEffect(() => {
    dispatch(
      categoriesDataGet({
        disable: false,
        countPage: 1,
        countLimit: 1000,
        search: "",
      })
    );
  }, [dispatch]);

  // Add Products
  useEffect(() => {
    if (!productAddLoading && !productAddError && productsAddFromSubmit) {
      navigate("/products");
    }
  }, [productAddLoading, productAddError, productsAddFromSubmit, navigate]);

  useEffect(() => {
    if (!productAddLoading && !productAddError && productsUpdateFromSubmit) {
      navigate("/products");
    }
  }, [productAddLoading, productAddError, productsUpdateFromSubmit, navigate]);

  useEffect(() => {
    setImageFile(ProductId ? productsIdData?.productImage : []);
  }, [ProductId, productsIdData]);

  return (
    <>
      {productAddLoading && <RippleLoader />}
      <div className={` ${productAddLoading && ` hidden `}`}>
        <div className="mb-4 border-b border-gray-200">
          <div className="container px-4 py-2.5 mx-auto">
            <Breadcrumb
              breadCrumbTitle={"Products"}
              breadCrumbTitleKey={"/products"}
              breadCrumbParent={"Dashboard"}
              breadCrumbActive={`${ProductId ? `Update` : `Add`} Product`}
            />
          </div>
        </div>

        <section className="container px-4 mx-auto">
          <Formik
            enableReinitialize={true}
            initialValues={{
              productImage: ProductId ? imageFile : [],
              product_name: ProductId ? productsIdData?.product_name : "",
              categoryId: ProductId ? productPutOptions : [],
              MRP: ProductId ? productsIdData?.MRP : "",
              price: ProductId ? productsIdData?.price : "",
              description: ProductId ? productsIdData?.description : "",
              product_quality_points: "",
              ProductQuality: ProductId
                ? productsIdData?.product_quality_points
                : [],
              addons: ProductId ? productsIdData?.addons : [],
              ProductPrice: "",
              addonsDescription: "",
            }}
            validationSchema={Yup.object().shape({
              productImage: Yup.array()
                .min(1, "Please Product Image Required ")
                .required("Please Product Image Required"),
              product_name: Yup.string().required(
                "Please Product Name Required"
              ),
              categoryId: Yup.array()
                .min(1, "Please Category Name Required")
                .required("Please Category Name Required"),
              MRP: Yup.string().required("Please MRP  Required"),
              price: Yup.string().required("Please Price  Required"),
              description: Yup.string().required(
                "Please description  Required"
              ),
              ProductQuality: Yup.array()
                .min(1, "Quality Point Is Required")
                .required("Quality Point Is Required"),
            })}
            onSubmit={(values) => {
              let formData = new FormData();
              formData.append("product_name", values.product_name);
              formData.append(
                "categoryId[]",
                JSON.stringify(values.categoryId)
              );
              formData.append("MRP", values.MRP);
              formData.append("price", values.price);
              formData.append("description", values.description);
              formData.append(
                "product_quality_points[]",
                JSON.stringify(values.ProductQuality)
              );
              formData.append("addons[]", JSON.stringify(values.addons));
              addPostimageFile.forEach((image) =>
                formData.append("productImage", image)
              );

              if (ProductId) {
                // Product Put Data Api
                dispatch(
                  productsPutDataIdApi({
                    id: ProductId,
                    data: formData,
                  })
                );
                setProductsUpdateFromSubmit(true);
              } else {
                // Product Post Data Api
                dispatch(productPostDataApi(formData));
                setProductsAddFromSubmit(true);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.1)] rounded-lg  mx-auto w-full p-6 mb-8">
                  {ProductId ? (
                    <>
                      <h1 className="mb-3 text-lg font-semibold">
                        Update Product
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="mb-3 text-lg font-semibold">
                        Add New Product
                      </h1>
                    </>
                  )}

                  <div className="mb-8">
                    <label htmlFor="productImage" className="text-sm">
                      Product Images
                    </label>
                    <div className="flex items-center sm:flex-nowrap flex-wrap gap-4">
                      <div className="">
                        <div className="flex">
                          <div>
                            <input
                              type="file"
                              accept=".png, .jpg, .jpeg,"
                              id="productImage"
                              name="productImage"
                              onBlur={handleBlur}
                              className="w-0 h-0"
                              multiple="multiple"
                              // value={values}
                              onChange={(e) =>
                                handleFileChange(e.target.files, setFieldValue)
                              }
                            />
                          </div>
                          <div
                            className="relative border w-36 h-36 rounded-lg bg-amber-50 "
                            onClick={() => {
                              getFile();
                            }}
                          >
                            <div className="w-10 h-10 rounded-full shadow-lg absolute top-[35%] left-[35%] z-[2] bg-amber-200 flex items-center justify-center">
                              <GalleryAdd size="20" />
                            </div>
                            <div className="w-36 h-36 rounded-lg overflow-hidden">
                              <LazyLoadImage
                                effect="blur"
                                width="100%"
                                height="100%"
                                src={Defimage}
                                alt="imageFile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overflow-hidden ">
                        <Swiper
                          navigation={true}
                          modules={[Navigation]}
                          spaceBetween={5}
                          breakpoints={{
                            320: {
                              width: 320,
                              slidesPerView: 1,
                            },
                            425: {
                              width: 425,
                              slidesPerView: 1,
                            },
                            576: {
                              width: 576,
                              slidesPerView: 2,
                            },
                            768: {
                              width: 768,
                              slidesPerView: 2,
                            },
                            1024: {
                              width: 1024,
                              slidesPerView: 3,
                            },
                          }}
                          className="mySwiper px-8"
                        >
                          {imageFile?.map((items, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <div className="w-36 h-36 relative">
                                  <LazyLoadImage
                                    effect="blur"
                                    width="100%"
                                    height="100%"
                                    src={items}
                                    alt="as"
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                  <div
                                    className="absolute top-1 right-1 z-50 bg-white w-6 h-6 rounded-full flex justify-center items-center cursor-pointer"
                                    onClick={() => {
                                      if (ProductId) {
                                        handleDeleteImageApi(ProductId, items);
                                      }
                                      handleDeleteImage(index);
                                    }}
                                  >
                                    <Minus size="18" color={"red"} />
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                    </div>
                    {errors.productImage && touched.productImage ? (
                      <>
                        <InputError errorTitle={errors.productImage} />
                      </>
                    ) : null}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4 w-full flex-wrap">
                    <div className="w-full">
                      <label htmlFor="product_name" className="text-sm">
                        Product Name
                      </label>
                      <div
                        className={`${errors.product_name && touched.product_name
                          ? `input-error`
                          : ``
                          } w-full`}
                      >
                        <input
                          type="text"
                          name="product_name"
                          id="product_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.product_name}
                          className="border px-4 py-2 text-sm rounded-lg placeholder:text-sm w-full mt-1 shadow-sm error-forms focus:border-theme/80"
                          placeholder="Enter Product Name"
                        />
                        {errors.product_name && touched.product_name ? (
                          <>
                            <InputError errorTitle={errors.product_name} />
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="" className="text-sm">
                        Categories Name
                      </label>
                      <div
                        className={`${errors.categoryId && touched.categoryId
                          ? ` input-error `
                          : ``
                          } focus:outline-none focus:border-theme/80 w-full`}
                      >
                        <Select
                          options={options}
                          name="categoryId"
                          value={values.categoryId}
                          isMulti
                          className="mt-1 shadow-sm !rounded-lg"
                          onChange={(e) => setFieldValue("categoryId", e)}
                          onBlur={handleBlur("categoryId")}
                        />
                        {errors.categoryId && touched.categoryId ? (
                          <InputError errorTitle={errors.categoryId} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="w-full">
                      <label htmlFor="MRP" className="text-sm">
                        Retail Price
                      </label>
                      <div
                        className={`${errors.MRP && touched.MRP ? `input-error` : ``
                          } w-full`}
                      >
                        <input
                          type="number"
                          id="MRP"
                          name="MRP"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.MRP}
                          className="border px-4 py-2 text-sm rounded-lg placeholder:text-sm w-full mt-1 shadow-sm error-forms focus:border-theme/80"
                          placeholder="Write Here MRP"
                        />
                        {errors.MRP && touched.MRP ? (
                          <InputError errorTitle={errors.MRP} />
                        ) : null}
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="price" className="text-sm">
                        User Price
                      </label>
                      <div
                        className={`${errors.price && touched.price ? `input-error` : ``
                          } w-full`}
                      >
                        <input
                          type="number"
                          id="price"
                          name="price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          className="border px-4 py-2 text-sm rounded-lg placeholder:text-sm w-full mt-1 shadow-sm error-forms focus:border-theme/80"
                          placeholder="Write Here Price"
                        />
                        {errors.price && touched.price ? (
                          <InputError errorTitle={errors.price} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="text-sm">
                      Description
                    </label>
                    <div
                      className={`${errors.description && touched.description
                        ? `input-error`
                        : ``
                        } w-full`}
                    >
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        rows="3"
                        className="border rounded-lg text-sm px-4 py-2 w-full mt-1 shadow-sm error-forms focus:border-theme/80"
                        placeholder="Message"
                      />
                      {errors.description && touched.description ? (
                        <InputError
                          errorTitle={errors.description}
                          classes={`-mt-0.5`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.1)] rounded-lg  mx-auto w-full p-6 mb-8">
                  <div className="mb-3">
                    <FieldArray
                      name="ProductQuality"
                      render={(arrayHelpers) => {
                        const productArray = values.ProductQuality;
                        return (
                          <>
                            <div className="font-bold text-base mb-2">
                              Quality Points
                            </div>
                            <div className="mb-5 w-full">
                              <label
                                htmlFor="product_quality_points"
                                className="text-sm mb-1 inline-block"
                              >
                                Product Quality Points
                              </label>
                              <div
                                className={`${errors.ProductQuality &&
                                  touched.ProductQuality
                                  ? `input-error`
                                  : ``
                                  } flex  gap-4 w-full`}
                              >
                                <div className="w-full">
                                  <input
                                    type="text"
                                    name="product_quality_points"
                                    id="product_quality_points"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.product_quality_points}
                                    className="border px-4 py-2 text-sm rounded-lg placeholder:text-sm w-full  shadow-sm error-forms focus:border-theme/80"
                                    placeholder="Add quality points"
                                  />
                                </div>
                                <button
                                  type="button"
                                  className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-6 py-1 text-sm font-semibold transition duration-300"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (
                                      values.product_quality_points !==
                                      undefined &&
                                      values.product_quality_points !== ""
                                    ) {
                                      if (selectProductQuality === true) {
                                        arrayHelpers.replace(
                                          indexProductQuality,
                                          values.product_quality_points
                                        );
                                      } else {
                                        arrayHelpers.push(
                                          values.product_quality_points
                                        );
                                      }
                                      setSelectProductQuality(false);
                                      setFieldValue(
                                        "product_quality_points",
                                        ""
                                      );
                                    }
                                  }}
                                >
                                  {selectProductQuality ? ` Update ` : ` Add `}
                                </button>
                              </div>
                              {errors.ProductQuality &&
                                touched.ProductQuality ? (
                                <InputError
                                  errorTitle={errors.ProductQuality}
                                />
                              ) : null}
                              <ul className="list-disc">
                                {(productArray || []).map((element, index) => {
                                  return (
                                    <li className="ml-6 mt-3" key={index}>
                                      <div className="flex justify-between text-sm font-semibold">
                                        <p className="max-w-2xl w-full">
                                          {element}
                                        </p>
                                        <div className="flex gap-x-4">
                                          <button
                                            type="button"
                                            title="Edit"
                                            className="text-green-600"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setSelectProductQuality(true);
                                              setIndexProductQuality(index);
                                              setFieldValue(
                                                "product_quality_points",
                                                element
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
                                              e.preventDefault();
                                              qualityHandleDelete(
                                                arrayHelpers,
                                                index
                                              );
                                            }}
                                          >
                                            <Trash size="18" />
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.1)] rounded-lg  mx-auto w-full p-6 mb-8">
                  <div className="mb-3">
                    <FieldArray
                      name="addons"
                      render={(arrayHelpers) => {
                        const AddonsArray = values.addons;
                        return (
                          <>
                            <div className="font-bold text-base mb-2">
                              Addons
                            </div>
                            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                              <div className="w-full lg:col-span-3">
                                <label
                                  htmlFor="addonsDescription"
                                  className="text-sm mb-1 inline-block"
                                >
                                  Addons Name
                                </label>
                                <input
                                  type="text"
                                  name="addonsDescription"
                                  id="addonsDescription"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.addonsDescription}
                                  rows="2"
                                  className="border rounded-lg text-sm px-4 py-2 w-full shadow-sm focus:border-theme/80"
                                  placeholder="Enter Product Name"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="ProductPrice"
                                  className="text-sm mb-1 inline-block"
                                >
                                  Addons Price
                                </label>
                                <div className="flex gap-3 items-center w-full">
                                  <div className="w-full">
                                    <div className="w-full ">
                                      <input
                                        type="number"
                                        name="ProductPrice"
                                        id="ProductPrice"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.ProductPrice}
                                        className="border px-4 py-2 text-sm rounded-lg placeholder:text-sm w-full shadow-sm focus:border-theme/80"
                                        placeholder="Price"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-6 py-2 text-sm font-semibold transition duration-300"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (
                                          values.ProductPrice !== undefined &&
                                          values.ProductPrice !== "" &&
                                          values.addonsDescription !==
                                          undefined &&
                                          values.addonsDescription !== ""
                                        ) {
                                          if (addonsAdd === true) {
                                            arrayHelpers.replace(indexAddons, {
                                              ProductPrice: values.ProductPrice,
                                              addonsDescription:
                                                values.addonsDescription,
                                            });
                                          } else {
                                            arrayHelpers.push({
                                              ProductPrice: values.ProductPrice,
                                              addonsDescription:
                                                values.addonsDescription,
                                            });
                                          }
                                          setFieldValue("ProductPrice", "");
                                          setFieldValue(
                                            "addonsDescription",
                                            ""
                                          );
                                          setAddonsAdd(false);
                                        }
                                      }}
                                    >
                                      {addonsAdd ? ` Update ` : ` Add `}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {(AddonsArray || []).map((element, index) => {
                              return (
                                <Fragment key={index}>
                                  <div className="flex justify-between items-center mb-4 bg-orange-50 rounded-md py-2 px-3 w-full gap-5 flex-wrap mt-3">
                                    <div className="">
                                      <div>
                                        Name :{element.addonsDescription}
                                      </div>
                                      <div className="flex items-center mt-1">
                                        Price : ₹{element.ProductPrice}
                                      </div>
                                    </div>
                                    <div className="flex gap-x-4">
                                      <button
                                        type="button"
                                        title="Edit"
                                        className="text-green-600"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setAddonsAdd(true);
                                          setIndexAddons(index);
                                          setFieldValue(
                                            "ProductPrice",
                                            element.ProductPrice
                                          );
                                          setFieldValue(
                                            "addonsDescription",
                                            element.addonsDescription
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
                                          e.preventDefault();
                                          handleDelete(arrayHelpers, index);
                                        }}
                                      >
                                        <Trash size="18" />
                                      </button>
                                    </div>
                                  </div>
                                </Fragment>
                              );
                            })}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
                {/* submit button */}
                <div className="flex justify-center gap-4 my-5">
                  <button
                    type="submit"
                    // disabled={!(isValid && dirty)}
                    className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-6 py-2 font-semibold shadow-lg transition duration-200"
                  >
                    {ProductId ? ` Update ` : `Submit`}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/products");
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
      </div>
    </>
  );
};

export default AddProduct;
