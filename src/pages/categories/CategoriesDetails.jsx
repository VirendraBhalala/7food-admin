import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LazyloadLoader from "../../layouts/LazyloadLoader";
import DebounceSearch from "../../commons/DebounceSearch";
import DataNotFound from "../../commons/DataNotFound";
import Breadcrumb from "../../commons/Breadcrumb";
import Pagination from "../../commons/Pagination";
import { Trash } from "iconsax-react";
import {
  category_Id_View_Products,
  removeCategoryByProductId,
} from "../../redux/categories/slice";
import RippleLoader from "../../commons/RippleLoader";
import Swal from "sweetalert2";
import TableShowLimit from "../../commons/TableShowLimit";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoriesDetails = () => {
  const dispatch = useDispatch();
  const getCategoryId = useParams();

  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [paginationCurrentLimit, setPaginationCurrentLimit] = useState(5);
  const [searchProductsValue, setSearchProductsValue] = useState("");

  const {
    getCategoryByProducts,
    categoryProductsLoading,
    removeCategoryByProductIdData,
    categoryProductsError,
  } = useSelector((store) => ({
    getCategoryByProducts:
      store?.categoriesData?.categoryIdViewProductsStatus?.data?.data,
    categoryProductsLoading:
      store?.categoriesData?.categoryIdViewProductsStatus?.loading,
    categoryProductsError:
      store?.categoriesData?.categoryIdViewProductsStatus?.error,
    removeCategoryByProductIdData:
      store?.categoriesData?.removeCategoryByProductStatus?.data,
  }));

  // handleDelete
  const handleDelete = (productsObject) => {
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
        dispatch(removeCategoryByProductId(productsObject));
      }
    });
  };

  useEffect(() => {
    dispatch(
      category_Id_View_Products({
        id: getCategoryId.id,
        countLimit: paginationCurrentLimit,
        search: searchProductsValue,
        pageCount: paginationCurrentPage,
      })
    );
  }, [
    dispatch,
    getCategoryId,
    searchProductsValue,
    paginationCurrentLimit,
    paginationCurrentPage,
    removeCategoryByProductIdData,
  ]);

  // Pagination CurrentPage refresh
  useEffect(() => {
    setPaginationCurrentPage(1);
  }, [paginationCurrentLimit, searchProductsValue]);

  return (
    <>
      {categoryProductsLoading && <RippleLoader />}
      {/* {categoryProductsError && <LazyloadLoader />} */}
      <div className={` ${categoryProductsLoading && "hidden"} `}>
        <div className="mb-4 border-b border-gray-200">
          <div className="container px-4 py-2.5 mx-auto">
            <Breadcrumb
              breadCrumbTitle={"Categories"}
              breadCrumbTitleKey={"/categories"}
              breadCrumbParent={"Categories"}
              breadCrumbActive={"Category Details"}
            />
          </div>
        </div>
        <section className="container w-full mx-auto px-4 custom-scroll ">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="lg:text-xl text-lg capitalize font-bold">
              Categories Name :
              <span className="capitalize font-normal text-gray-500">
                {" "}
                {getCategoryByProducts?.categories_name}
              </span>
            </div>
            {/*  Search */}
            <DebounceSearch
              search={searchProductsValue}
              handleChange={setSearchProductsValue}
              placeholder={"Search Category"}
            />
          </div>
          <div className="w-full overflow-auto mt-7 mb-5">
            {getCategoryByProducts?.results?.length > 0 ? (
              <>
                <div className="bg-white rounded-md overflow-auto">
                  <table className="w-full text-sm  overflow-auto min-w-[800px] custom-scroll">
                    <thead>
                      <tr className="font-semibold bg-gray-200">
                        <th
                          scope="col"
                          className="w-20 p-2.5 border-r border-lightyellow"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="w-[calc(100%-22rem)] p-2.5 border-r border-lightyellow"
                        >
                          Product Name
                        </th>
                        <th scope="col" className="w-40 p-2.5">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getCategoryByProducts?.results?.map((items, index) => {
                        return (
                          <tr
                            className="bg-white border-b border-gray-200"
                            key={index}
                          >
                            <td className="px-4 py-2 text-center">
                              {(getCategoryByProducts?.page - 1) *
                                getCategoryByProducts?.limit +
                                index +
                                1}
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex items-center">
                                <div className="w-14 h-14 min-w-[56px] overflow-hidden">
                                  <LazyLoadImage
                                    effect="blur"
                                    width="100%"
                                    height="100%"
                                    src={items.productImage[0]}
                                    alt="img"
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                </div>
                                <div className="text-left ml-5">
                                  <p className="text-lg font-medium text-ellipsis xl:max-w-[400px] max-w-[300px] overflow-hidden">
                                    {items.product_name}
                                  </p>
                                  <p className="text-gray-500 text-sm text-truncation 2xl:max-w-[1200px] max-w-[800px]">
                                    {items.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div
                                className="text-red flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                  handleDelete({
                                    productId: items.id,
                                    categoryId: getCategoryId.id,
                                  });
                                }}
                              >
                                <Trash size="20" />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Pagination  */}
                <div className="my-7 flex justify-between items-center flex-wrap">
                  <TableShowLimit
                    paginationCurrentLimit={paginationCurrentLimit}
                    setPaginationCurrentLimit={setPaginationCurrentLimit}
                  />

                  <div className="rounded-lg xl:py-3 py-2 px-4">
                    <Pagination
                      total={getCategoryByProducts?.totalPages}
                      current={paginationCurrentPage}
                      pagination={(crPage) => setPaginationCurrentPage(crPage)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <DataNotFound />
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default CategoriesDetails;
