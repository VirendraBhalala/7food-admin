import React from "react";
import { Link, useNavigate } from "react-router-dom";
// icons
import { MagicStar } from "iconsax-react";
import Breadcrumb from "../../commons/Breadcrumb";
import DebounceSearch from "../../commons/DebounceSearch";
import { useState } from "react";
import {
  getReviewAllData,
  publishReviewStatus,
} from "../../redux/review/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../commons/CustomTable";
import moment from "moment/moment";
import StarRatings from "react-star-ratings";

const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchReviewsValue, setSearchReviewsValue] = useState("");
  const [reviewsPublish, setReviewsPublish] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const { getAllReviewData, pageLoading, changeStatusPublish } = useSelector(
    (store) => ({
      getAllReviewData: store?.reviewData?.getReviewStatus?.data?.data,
      changeStatusPublish: store?.reviewData?.publishStatus?.data?.data,
      pageLoading: store?.reviewData?.loading,
    })
  );

  const ColumnHeaders = () => {
    return (
      <>
        <th scope="col" className="w-36 p-2 border-r border-lightyellow">
          Rating
        </th>
        <th scope="col" className="w-36 p-2 border-r border-lightyellow">
          Date
        </th>
        <th
          scope="col"
          className="w-[calc(100%-20rem)] p-2 border-r border-lightyellow"
        >
          Reviews
        </th>
        <th scope="col" className="w-44 p-2">
          Action
        </th>
      </>
    );
  };

  const DataRows = () => {
    return (
      <>
        {(getAllReviewData?.results || [])?.map((element, index) => {
          return (
            <tr className="bg-white border-b border-gray-200" key={index}>
              <td>
                <div className="flex justify-center gap-1">
                  <StarRatings
                    rating={element.rating}
                    starRatedColor="#FFDA33"
                    // changeRating={5}
                    starDimension="20px"
                    starSpacing="2px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="text-center">
                  <div className="text-base text-black">
                    {moment(element?.createdAt).format("DD/MM/YYYY")}
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="flex flex-col items-start gap-0.5">
                  <p>
                    Review about
                    <a
                      target={"_blank"}
                      href={`${element?.product_location_URL}`}
                      className="pl-1 underline text-theme"
                      rel="noreferrer"
                    >
                      {element?.product_location_URL}
                    </a>
                  </p>
                  <h3 className="text-lg font-semibold">{element?.title}</h3>
                  <p>{element?.description}</p>
                  <a
                    href={`mailto:${element?.userId?.email}`}
                    className="underline text-theme"
                  >
                    {element?.userId?.first_name} {element?.userId?.last_name}
                  </a>
                </div>
              </td>
              <td
                className="px-4 py-2"
                onClick={() => {
                  dispatch(publishReviewStatus(element?.id));
                }}
              >
                {reviewsPublish ? (
                  <>
                    <div className="flex flex-col gap-1 px-2 text-center">
                      <button
                        type="button"
                        className="px-3 py-1.5 text-sm font-bold text-center rounded-md text-red hover:text-red/90 hover:bg-red/20 bg-red/10"
                      >
                        Hide Review
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-1 px-2 text-center">
                      <button
                        type="button"
                        className="px-3 py-1.5 text-sm font-bold text-center text-green-600 hover:text-green-800 hover:bg-green-200/90 bg-green-100 rounded-md"
                      >
                        Publish
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    dispatch(
      getReviewAllData({
        searchReviewsValue: searchReviewsValue,
        reviewsPublish: reviewsPublish,
        pageCount: pageCount,
        pageLimit: pageLimit,
      })
    );
  }, [
    dispatch,
    pageCount,
    pageLimit,
    reviewsPublish,
    searchReviewsValue,
    changeStatusPublish,
  ]);

  return (
    <>
      <div className="mb-4 border-b border-gray-200">
        <div className="container px-4 py-2.5 mx-auto">
          <Breadcrumb
            breadCrumbTitle={"Reviews"}
            breadCrumbParent={"Dashboard"}
            breadCrumbActive={"Reviews"}
          />
        </div>
      </div>
      <div className="container px-4 mx-auto custom-scroll">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 lg:gap-0">
          <div className="grid grid-cols-2 bg-theme/20 p-1.5 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setReviewsPublish(true);
              }}
              className={`${
                reviewsPublish ? `bg-theme` : `bg-transparent text-black`
              } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
            >
              Published
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full">
                {getAllReviewData?.publishReview}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setReviewsPublish(false);
              }}
              className={` ${
                reviewsPublish ? `bg-transparent text-black` : `bg-theme`
              } font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
            >
              Hide
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-red">
                {" "}
                {getAllReviewData?.hideReview}
              </span>
            </button>
          </div>
          {/*  Search */}
          <DebounceSearch
            search={searchReviewsValue}
            handleChange={setSearchReviewsValue}
            placeholder={"Search reviews..."}
          />
        </div>

        {/* CustomTable */}
        <CustomTable
          columnHeaders={<ColumnHeaders />}
          dataRows={<DataRows />}
          data={getAllReviewData}
          // loader
          loading={pageLoading}
          // showLimit
          setPaginationCurrentLimit={setPageLimit}
          paginationCurrentLimit={pageLimit}
          // paginationData
          total={getAllReviewData?.totalPages}
          current={pageCount}
          paginationData={(crPage) => setPageCount(crPage)}
        />
      </div>
    </>
  );
};

export default Review;
