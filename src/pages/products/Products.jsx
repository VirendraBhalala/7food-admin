import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyloadLoader from "../../layouts/LazyloadLoader";
import DebounceSearch from "../../commons/DebounceSearch";
import TableShowLimit from "../../commons/TableShowLimit";
import { RippleLoaderSVG } from "../../assets/svg/AllSvg";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "../../commons/DataNotFound";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../commons/Breadcrumb";
import Pagination from "../../commons/Pagination";
import {
  disableProducts,
  exportProductsAllData,
  liveProducts,
  productDisableUnable,
  productsDataGetApi,
} from "../../redux/products/slice";
import {
  AddSquare,
  CloseSquare,
  Edit2,
  Import,
  Pause,
  Play,
} from "iconsax-react";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [paginationCurrentLimit, setPaginationCurrentLimit] = useState(10);
  const [searchProductsValue, setSearchProductsValue] = useState("");
  const [productsLive, setProductsLive] = useState(false);
  //  Modal State
  const [modalExport, setModalExport] = useState(false);
  const [miniLoding, setMiniLoding] = useState(false);

  const {
    productsDataget,
    productDataLoading,
    productDataError,
    exportProductsData,
    productDisableUnableData,
    exportDataLoading,
  } = useSelector((store) => ({
    productsDataget: store?.productsData?.productsDataGetStatus?.data?.data,
    exportProductsData: store?.productsData?.exportProductsStatus?.data?.data,
    exportDataLoading: store?.productsData?.exportProductsStatus?.loading,
    productDataLoading: store?.productsData.loading,
    productDataError: store?.productsData.error,
    productDisableUnableData:
      store?.productsData?.productDisableUnablestatus?.data?.data,
  }));

  // Total Page
  const maxPage = productsDataget?.totalPages;

  // Pagination CurrentPage refresh
  useEffect(() => {
    if (productsDataget?.results?.length === 1) {
      dispatch(
        productsDataGetApi({
          countPage: paginationCurrentPage,
          countLimit: paginationCurrentLimit,
          search: searchProductsValue,
          disable: productsLive,
        })
      );
    }
    if (
      productsDataget?.page > maxPage &&
      productsDataget?.results?.length < 1
    ) {
      setPaginationCurrentPage(1);
    }
  }, [maxPage, productsDataget?.page, productsDataget?.results?.length]);

  // Pagination CurrentPage refresh
  useEffect(() => {
    setPaginationCurrentPage(1);
  }, [productsLive, searchProductsValue, paginationCurrentLimit]);

  // productsDataGetApi
  useEffect(() => {
    dispatch(
      productsDataGetApi({
        countPage: paginationCurrentPage,
        countLimit: paginationCurrentLimit,
        search: searchProductsValue,
        disable: productsLive,
      })
    );
  }, [
    paginationCurrentPage,
    paginationCurrentLimit,
    searchProductsValue,
    productsLive,
    // productDisableUnableData,
    dispatch,
  ]);

  return (
    <>
      {miniLoding && <LazyloadLoader />}
      <div className="mb-4 border-b border-gray-200">
        <div className="container px-4 py-2.5 mx-auto flex justify-between items-center flex-wrap gap-4">
          <Breadcrumb
            breadCrumbTitle={"Products"}
            breadCrumbParent={"Dashboard"}
            breadCrumbActive={"Products"}
          />
          <div className="flex gap-4">
            <button
              className={`${`bg-theme`} relative flex items-center gap-2 pl-3 pr-9 py-2 text-xs font-semibold text-black rounded-md shadow-md bg-theme xl:text-base hover:bg-theme/90  cursor-pointer`}
              onClick={() => {
                setMiniLoding(true);
                Promise.all([dispatch(exportProductsAllData())]).then(() => {
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
            <button
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-black rounded-md shadow-md bg-theme xl:text-base hover:bg-theme/90"
              onClick={() => {
                navigate("/create-product");
              }}
            >
              Add Product
              <AddSquare size="24" />
            </button>
          </div>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="relative custom-scroll">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 lg:gap-0">
            <div className="grid grid-cols-2 bg-theme/20 p-1.5 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setProductsLive(false);
                }}
                className={`${productsLive ? `bg-transparent text-black` : `bg-theme`
                  } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
              >
                Live
                <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full">
                  {productsDataget?.LiveProduct}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProductsLive(true);
                }}
                className={` ${productsLive ? `bg-theme` : `bg-transparent text-black`
                  } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
              >
                Disable
                <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-red">
                  {productsDataget?.disableProduct}
                </span>
              </button>
            </div>
            {/*  Search */}
            <DebounceSearch
              search={searchProductsValue}
              handleChange={setSearchProductsValue}
              placeholder={"Search products..."}
            />
          </div>
          <div className="">
            {productDataLoading ? (
              <>
                <div className="min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] flex items-center justify-center">
                  <RippleLoaderSVG />
                </div>
              </>
            ) : (
              <>
                <div>
                  {modalExport && (
                    <div className="backdrop-blur-sm bg-black/40 flex items-center justify-center w-full fixed top-0 left-0 right-0 z-[999999] mx-auto h-screen">
                      <div className="bg-[#fffcf7] flex flex-col items-center drop-shadow-lg rounded-lg w-full max-w-xl min-h-[200px] py-8 px-6 mx-auto relative">
                        {exportProductsData?.length > 0 ? (
                          <>
                            <div className="text-center">
                              <p className="text-xl font-bold">Are you sure?</p>
                              <p className="my-1">
                                Download All Products <strong>Live</strong> And{" "}
                                <strong>Disable</strong>
                              </p>
                              <p>Excel File </p>
                            </div>

                            <div className="flex items-center justify-center mt-3 gap-4">
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
                                  filename={`products`}
                                  sheet={`products`}
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
                {productsDataget?.results?.length > 0 ? (
                  <>
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
                          <th
                            scope="col"
                            className=" w-[calc(100%-22rem)] p-2.5"
                          >
                            Description
                          </th>
                          <th scope="col" className="w-20 p-2.5 ">
                            MRP
                          </th>
                          <th scope="col" className="w-20 p-2.5 ">
                            Price
                          </th>
                          <th scope="col" className="w-20 p-2.5 ">
                            Product Quality Points
                          </th>
                          <th scope="col" className="w-20 p-2.5 ">
                            Addons Name
                          </th>
                          <th scope="col" className="w-20 p-2.5 ">
                            Addons Price
                          </th>
                          <th scope="col" className="w-20 p-2.5 ">
                            Categories
                          </th>
                          <th scope="col" className="w-20 p-2.5 ">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {exportProductsData?.map((items, index) => {
                          return (
                            <tr className=" border-b">
                              <td className="px-4 py-2 text-center">
                                {index + 1}
                              </td>
                              <td className="px-4 py-2">
                                {items.product_name}
                              </td>
                              <td className="w-[calc(100%-22rem)] p-2.5 truncate 2xl:max-w-[400px] max-w-[400px] ">
                                {items.description}
                              </td>
                              <td className="px-4 py-2">{items.MRP}</td>
                              <td className="px-4 py-2">{items.price}</td>
                              <td className="px-4 py-2">
                                {items.product_quality_points?.map(
                                  (element) => `${element}, `
                                )}
                              </td>
                              <td className="px-4 py-2">
                                {items.addons?.map((addonItems) => (
                                  <>{`${addonItems.addonsDescription}, `}</>
                                ))}
                              </td>
                              <td className="px-4 py-2">
                                {items.addons?.map((addonItems) => (
                                  <>{`${addonItems.ProductPrice}, `}</>
                                ))}
                              </td>
                              <td className="  px-4 py-2">
                                {items.categoryId.map((e, i) => `${e.label}, `)}
                              </td>
                              <td>
                                {items.disable === true ? ` Disable` : ` Live `}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="bg-white rounded-md overflow-auto">
                      <table className="w-full text-sm  overflow-auto min-w-[1000px] custom-scroll">
                        <thead>
                          <tr className="font-semibold bg-gray-200">
                            <th
                              scope="col"
                              className="w-20 p-2.5 border-r border-lightyellow"
                            >
                              No.
                            </th>
                            <th
                              scope="col"
                              className="w-[calc(100%-38rem)] border-r border-lightyellow"
                            >
                              Product Name
                            </th>
                            <th
                              scope="col"
                              className="w-44 border-r border-lightyellow"
                            >
                              Retail Price
                            </th>
                            <th
                              scope="col"
                              className="w-44 border-r border-lightyellow"
                            >
                              User Price
                            </th>
                            <th scope="col" className="w-44">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {productsDataget?.results?.map((element, index) => {
                            return (
                              <tr
                                className="bg-white border-b border-gray-200"
                                key={index}
                              >
                                <td>
                                  <div className="px-4 py-2 text-center text-sm lg:text-base">
                                    {(productsDataget?.page - 1) *
                                      productsDataget?.limit +
                                      index +
                                      1}
                                  </div>
                                </td>
                                <td>
                                  <div className="flex items-center px-4 py-2 font-semibold text-start">
                                    <div className="w-12 h-12 !min-w-[48px] overflow-hidden bg-gray-400 rounded-lg">
                                      <LazyLoadImage
                                        effect="blur"
                                        width="100%"
                                        height="100%"
                                        className="object-cover w-full h-full"
                                        src={element.productImage[0]}
                                        alt={element.product_name}
                                      />
                                    </div>
                                    <div className="ml-5">
                                      <p className="text-lg capitalize">
                                        {element.product_name}
                                      </p>

                                      <p className="text-sm text-gray-600 2xl:max-w-[800px] xl:max-w-[500px] max-w-[400px] text-truncation overflow-hidden">
                                        {element.description}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <del className="text-sm text-gray-600">
                                    {productsDataget?.currency_symbol}
                                    {element.MRP}
                                  </del>
                                </td>
                                <td className="text-center">
                                  <div className="text-sm text-gray-600 font-bold">
                                    {productsDataget?.currency_symbol}
                                    {element.price}
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="flex items-center justify-center space-x-3">
                                    <button
                                      type="button"
                                      className="flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-md"
                                      // to={`/edit-product?id=${element.id}`}
                                      onClick={() => {
                                        navigate(
                                          `/edit-product?id=${element.id}`,
                                          {
                                            state: { element },
                                          }
                                        );
                                      }}
                                      title={"Edit"}
                                    >
                                      <Edit2 size="20" />
                                    </button>
                                    <Link
                                      to={"#"}
                                      className={` ${productsLive
                                        ? `text-lime-500 bg-lime-100`
                                        : `text-rose-500 bg-rose-100`
                                        } flex items-center justify-center w-8 h-8 rounded-md`}
                                      onClick={() => {
                                        if (productsLive) {
                                          dispatch(
                                            productDisableUnable(element.id)
                                          ).then((res) => {
                                            if (
                                              res.type ===
                                              "productDisableUnable/fulfilled"
                                            ) {
                                              dispatch(
                                                liveProducts(element.id)
                                              );
                                            }
                                          });
                                        } else {
                                          dispatch(
                                            productDisableUnable(element.id)
                                          ).then((res) => {
                                            if (
                                              res.type ===
                                              "productDisableUnable/fulfilled"
                                            ) {
                                              dispatch(
                                                disableProducts(element.id)
                                              );
                                            }
                                          });
                                        }
                                      }}
                                      // onClick={() => {
                                      //   dispatch(
                                      //     productDisableUnable(element.id)
                                      //   );
                                      // }}
                                      title={
                                        productsLive ? ` Live ` : ` Disable `
                                      }
                                    >
                                      {productsLive ? (
                                        <>
                                          <Play size="20" />
                                        </>
                                      ) : (
                                        <>
                                          <Pause size="20" />
                                        </>
                                      )}
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination  */}
                    <div className="flex flex-wrap items-center justify-between my-2">
                      <TableShowLimit
                        paginationCurrentLimit={paginationCurrentLimit}
                        setPaginationCurrentLimit={setPaginationCurrentLimit}
                      />
                      <div className="md:px-4 py-2 rounded-lg xl:py-3">
                        <Pagination
                          total={maxPage}
                          current={paginationCurrentPage}
                          pagination={(crPage) =>
                            setPaginationCurrentPage(crPage)
                          }
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <DataNotFound />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
