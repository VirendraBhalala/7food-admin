import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import TableShowLimit from "../../commons/TableShowLimit";
import DebounceSearch from "../../commons/DebounceSearch";
import { RippleLoaderSVG } from "../../assets/svg/AllSvg";
import LazyloadLoader from "../../layouts/LazyloadLoader";
import { useDispatch, useSelector } from "react-redux";
import DataNotFound from "../../commons/DataNotFound";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../commons/Breadcrumb";
import Pagination from "../../commons/Pagination";
import {
  categoriesDataGet,
  categoriesDisableApi,
  disableCategory,
  exportCategoriesAllData,
  liveCategory,
} from "../../redux/categories/slice";
import {
  AddSquare,
  CloseSquare,
  Edit2,
  Eye,
  Import,
  Pause,
  Play,
} from "iconsax-react";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [paginationCurrentLimit, setPaginationCurrentLimit] = useState(10);
  const [disableStatus, setdisableStatus] = useState();
  const [categoriesLive, setCategoriesLive] = useState(false);
  const [searchCategoryValue, setSearchCategoryValue] = useState("");
  //  Modal State
  const [modalExport, setModalExport] = useState(false);
  const [miniLoding, setMiniLoding] = useState(false);

  const {
    categorisDataGet,
    categorisStatusLoading,
    categorisPageDataGet,
    disableReload,
    reload,
    categorisStatusError,
    categoriesDisableStatusError,
    categoriesDisableStatusLoading,
    ExportData,
  } = useSelector((store) => ({
    categorisDataGet: store?.categoriesData?.categoriesGetStatus?.data?.data,
    categorisPageDataGet:
      store?.categoriesData?.categoriesGetStatus?.data?.data?.totalPages,
    categorisStatusLoading: store?.categoriesData?.categoriesGetStatus?.loading,
    categorisStatusError: store?.categoriesData?.categoriesGetStatus?.error,
    categoriesDisableStatusLoading:
      store?.categoriesData?.categoriesDisableStatus?.loading,
    categoriesDisableStatusError:
      store?.categoriesData?.categoriesDisableStatus?.error,
    disableReload: store?.categoriesData?.categoriesDisableStatus?.data,
    reload: store?.categoriesData?.categoriesDeleteStatus?.data,
    ExportData: store?.categoriesData?.exportCategoriesStatus?.data?.data,
  }));

  // Total Page
  const maxPage = categorisPageDataGet;

  useEffect(() => {
    dispatch(
      categoriesDataGet({
        countPage: paginationCurrentPage,
        countLimit: paginationCurrentLimit,
        search: searchCategoryValue,
        disable: categoriesLive,
      })
    );
  }, [
    paginationCurrentPage,
    paginationCurrentLimit,
    reload,
    // disableReload,
    categoriesLive,
    searchCategoryValue,
    dispatch,
  ]);

  // Pagination CurrentPage refresh
  useEffect(() => {
    if (categorisDataGet?.results?.length === 1) {
      dispatch(
        categoriesDataGet({
          countPage: paginationCurrentPage,
          countLimit: paginationCurrentLimit,
          search: searchCategoryValue,
          disable: categoriesLive,
        })
      );
    }
    if (
      categorisDataGet?.page > maxPage &&
      categorisDataGet?.results?.length < 1
    ) {
      setPaginationCurrentPage(1);
    }
  }, [maxPage, categorisDataGet?.page, categorisDataGet?.results?.length]);

  // Pagination CurrentPage refresh
  useEffect(() => {
    setPaginationCurrentPage(1);
    categoriesLive ? setdisableStatus(false) : setdisableStatus(true);
  }, [paginationCurrentLimit, categoriesLive, searchCategoryValue]);

  return (
    <>
      {miniLoding && <LazyloadLoader />}
      <div className={`mb-4 border-b border-gray-200 `}>
        <div className="container px-4 py-2.5 mx-auto flex justify-between items-center flex-wrap gap-4">
          <Breadcrumb
            breadCrumbTitle={"Categories"}
            breadCrumbParent={"Dashboard"}
            breadCrumbActive={"Categories"}
          />

          <div className="flex  gap-4">
            <button
              className={`${`bg-theme`} relative flex items-center gap-2 pl-3 pr-9 text-xs font-semibold text-black rounded-md shadow-md bg-theme xl:text-base hover:bg-theme/90`}
              onClick={() => {
                setMiniLoding(true);
                Promise.all([dispatch(exportCategoriesAllData())]).then(() => {
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
                navigate("/add-category");
              }}
            >
              Add Category
              <AddSquare size="24" />
            </button>
          </div>
        </div>
      </div>
      <div className={`container px-4 mx-auto `}>
        {/* Categories section */}
        <section>
          <div className="relative custom-scroll">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 lg:gap-0">
              <div className="grid grid-cols-2 bg-theme/20 p-1.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setCategoriesLive(false);
                  }}
                  className={`${categoriesLive ? `bg-transparent text-black` : `bg-theme`
                    } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
                >
                  Live
                  <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full">
                    {categorisDataGet?.Livecategory}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategoriesLive(true);
                  }}
                  className={` ${categoriesLive ? `bg-theme` : `bg-transparent text-black`
                    } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
                >
                  Disable
                  <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-red">
                    {categorisDataGet?.disablecategory}
                  </span>
                </button>
              </div>

              {/*  Search */}
              <DebounceSearch
                search={searchCategoryValue}
                handleChange={setSearchCategoryValue}
                placeholder={"Search categories..."}
              />
            </div>

            <div className="">
              {categorisStatusLoading || categoriesDisableStatusLoading ? (
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
                          {ExportData?.length > 0 ? (
                            <>
                              <div className="text-center">
                                <p className="text-xl font-bold">
                                  Are you sure?
                                </p>
                                <p className="my-1">
                                  Download All categories <strong>Live</strong>{" "}
                                  And <strong>Disable</strong>
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
                                    filename={`categories`}
                                    sheet={`categories`}
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
                          {" "}
                          Name
                        </th>
                        <th scope="col" className=" w-[calc(100%-22rem)] p-2.5">
                          {" "}
                          Description
                        </th>
                        <th scope="col" className="w-20 p-2.5 ">
                          {" "}
                          Product Name
                        </th>
                        <th scope="col" className="w-20 p-2.5 ">
                          {" "}
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ExportData?.map((items, index) => {
                        return (
                          <tr className=" border-b">
                            <td className="px-4 py-2 text-center">
                              {index + 1}
                            </td>
                            <td className="px-4 py-2">
                              {items.categories_name}
                            </td>
                            <td className="w-[calc(100%-22rem)] p-2.5 truncate 2xl:max-w-[400px] max-w-[400px] ">
                              {items.description}
                            </td>
                            <td className="  px-4 py-2">
                              {items.product_data?.map((e, i) => `${e}, `)}
                            </td>
                            <td>
                              {items.disable === true ? ` Disable` : ` Live `}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {categorisDataGet?.results?.length > 0 ? (
                    <>
                      <div className="bg-white rounded-md overflow-auto">
                        <table className="w-full text-sm overflow-auto min-w-[800px] custom-scroll">
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
                                className="w-[calc(100%-17rem)] p-2.5 border-r border-lightyellow"
                              >
                                Categories
                              </th>
                              <th scope="col" className="w-48 p-2.5">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {categorisDataGet?.results?.map((items, index) => {
                              return (
                                <tr
                                  className="bg-white border-b border-gray-200"
                                  key={index}
                                >
                                  <td className="px-4 py-2 text-center">
                                    {(categorisDataGet?.page - 1) *
                                      categorisDataGet?.limit +
                                      index +
                                      1}
                                  </td>
                                  <td className="flex items-center px-4 py-2 font-semibold text-start">
                                    <div className="w-12 h-12 overflow-hidden bg-gray-400 rounded-lg">
                                      <LazyLoadImage
                                        effect="blur"
                                        width="100%"
                                        height="100%"
                                        className="object-cover w-full h-full"
                                        src={items.categoriesImage}
                                        alt={items.categories_name}
                                      />
                                    </div>
                                    <div className="ml-5 w-[calc(100%-4.25rem)]">
                                      <p className="text-lg capitalize">
                                        {items.categories_name}
                                      </p>

                                      <p className="text-sm text-gray-600 text-truncation 2xl:max-w-[1000px] max-w-[800px]">
                                        {items.description}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">
                                    <div className="flex items-center justify-center space-x-3">
                                      <Link
                                        to={`/categories-details/${items.id}`}
                                        className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-md"
                                        title="View"
                                      >
                                        <Eye size="20" />
                                      </Link>
                                      <button
                                        type="button"
                                        className="flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-md"
                                        onClick={() => {
                                          navigate(
                                            `/edit-category?id=${items.id}`,
                                            {
                                              state: { items },
                                            }
                                          );
                                        }}
                                        title={"Edit"}
                                      >
                                        <Edit2 size="20" />
                                      </button>
                                      <Link
                                        to={"#"}
                                        className={` ${disableStatus
                                          ? `text-rose-500 bg-rose-100`
                                          : `text-lime-500 bg-lime-100`
                                          } flex items-center justify-center w-8 h-8 rounded-md`}
                                        onClick={() => {
                                          if (disableStatus) {
                                            dispatch(
                                              categoriesDisableApi(items.id)
                                            ).then((res) => {
                                              if (
                                                res.type ===
                                                "categoriesDisableApi/fulfilled"
                                              ) {
                                                dispatch(
                                                  liveCategory(items.id)
                                                );
                                              }
                                            });
                                          } else {
                                            dispatch(
                                              categoriesDisableApi(items.id)
                                            ).then((res) => {
                                              if (
                                                res.type ===
                                                "categoriesDisableApi/fulfilled"
                                              ) {
                                                dispatch(
                                                  disableCategory(items.id)
                                                );
                                              }
                                            });
                                          }
                                        }}
                                        title={
                                          disableStatus ? ` Disable ` : ` Live `
                                        }
                                      >
                                        {disableStatus ? (
                                          <>
                                            <Pause size="20" />
                                          </>
                                        ) : (
                                          <>
                                            <Play size="20" />
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
        </section>
      </div>
    </>
  );
};

export default Categories;
