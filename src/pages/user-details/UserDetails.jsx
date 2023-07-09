import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminBlockUser, getUserDetails } from "../../redux/userDetails/slice";
import DebounceSearch from "../../commons/DebounceSearch";
import CustomTable from "../../commons/CustomTable";
import Breadcrumb from "../../commons/Breadcrumb";
import moment from "moment";
import {
  handleItemLimit,
  handlePageChange,
  handleSearch,
} from "../../helpers/functions";

const UserDetails = () => {
  const dispatch = useDispatch();

  const [searchUserValue, setSearchUserValue] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const { getUserDetailsData, adminBlockByUserReload, pageLoading, pageError } =
    useSelector((store) => ({
      getUserDetailsData: store?.userData?.getUserDetailsStatus?.data?.data,
      adminBlockByUserReload: store?.userData?.adminBlockUserStatus?.data?.data,
      pageLoading: store?.userData?.loading,
      pageError: store?.userData?.loading,
    }));

  useEffect(() => {
    dispatch(
      getUserDetails({
        search: searchUserValue,
        pageCount: pageCount,
        pageLimit: pageLimit,
      })
    );
  }, [dispatch, pageCount, pageLimit, searchUserValue]);

  useEffect(() => {
    setPageCount(1);
  }, [pageLimit, searchUserValue]);

  // adminBlockByUserReload
  useEffect(() => {
    if (adminBlockByUserReload) {
      dispatch(
        getUserDetails({
          search: "",
          pageCount: pageCount,
          pageLimit: pageLimit,
        })
      );
    }
  }, [adminBlockByUserReload]);

  const ColumnHeaders = () => {
    return (
      <>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200 whitespace-nowrap rounded-tl-md"
        >
          Sr. No.
        </th>
        <th
          scope="col"
          className="p-2.5 min-w-[170px] border-r border-lightyellow font-semibold bg-gray-200"
        >
          Full Name
        </th>
        <th
          scope="col"
          className="p-2.5 min-w-[200px] border-r border-lightyellow font-semibold bg-gray-200"
        >
          Email
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Mobile No.
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Date
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200 rounded-tr-md"
        >
          Action
        </th>
      </>
    );
  };

  const DataRows = () => {
    return (
      <>
        {(getUserDetailsData?.results || [])?.map((element, index) => (
          <tr className={"border-b text-sm"} key={element.id}>
            <td className="px-5 py-2 text-center">
              {(getUserDetailsData?.page - 1) * getUserDetailsData?.limit +
                index +
                1}
            </td>
            <td className="px-5 py-2">
              {element.first_name + " " + element.last_name}
            </td>
            <td className="px-5 py-2">{element.email}</td>
            <td className="px-5 py-2">{element.mobile_no}</td>
            <td className="px-5 py-2 min-w-[150px] text-center">
              {moment(element.createdAt).format("DD/MM/YYYY")}
            </td>
            <td className="px-5 py-2 max-w-[400px] flex justify-center mr-4 overflow-auto">
              <label
                htmlFor={`check-${element.id}`}
                className="inline-flex relative items-center my-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={element.block}
                  id={`check-${element.id}`}
                  className="sr-only peer"
                  onChange={() => {
                    dispatch(adminBlockUser(element.id));
                    // blockByUserReload(pageCount, pageLimit, dispatch);
                  }}
                />
                <div className="w-11 h-6 peer-checked:bg-gray-700 rounded-full peer peer-checked:after:translate-x-0 after:right-[3px] after:content-[''] after:absolute after:top-0.5 peer-checked:after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all bg-theme"></div>
              </label>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="mb-4 border-b border-gray-200">
        <div className="container px-4 py-2.5 mx-auto">
          <Breadcrumb
            breadCrumbTitle={"User Details"}
            breadCrumbParent={"Dashboard"}
            breadCrumbActive={"User Details"}
          />
        </div>
      </div>
      <div className="container px-4 mx-auto custom-scroll">
        <section>
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="bg-theme/20 p-1.5 rounded-lg">
              <button
                type="button"
                className={`${`bg-theme`} font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
              >
                Total
                <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full">
                  {getUserDetailsData?.totalResults}
                </span>
              </button>
            </div>
            <DebounceSearch
              search={searchUserValue}
              handleChange={setSearchUserValue}
              placeholder={"Search Contact"}
            />
          </div>
          <CustomTable
            columnHeaders={<ColumnHeaders />}
            dataRows={<DataRows />}
            data={getUserDetailsData}
            // loader
            loading={pageLoading}
            // showLimit
            setPaginationCurrentLimit={setPageLimit}
            paginationCurrentLimit={pageLimit}
            // paginationData
            total={getUserDetailsData?.totalPages}
            current={pageCount}
            paginationData={(crPage) => setPageCount(crPage)}
          />
        </section>
      </div>
    </>
  );
};

export default UserDetails;
