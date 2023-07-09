import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactDetails } from "../../redux/userDetails/slice";
import DebounceSearch from "../../commons/DebounceSearch";
import CustomTable from "../../commons/CustomTable";
import Breadcrumb from "../../commons/Breadcrumb";
import { CloseSquare, Eye } from "iconsax-react";
import moment from "moment";

const ContactDetails = () => {
  const dispatch = useDispatch();

  const [searchContactValue, setSearchContactValue] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState();

  const { getContactUsDetalsData, pageLoading, pageError } = useSelector(
    (store) => ({
      getContactUsDetalsData:
        store?.userData?.getContactDetailsStatus?.data?.data,
      pageLoading: store?.userData?.loading,
      pageError: store?.userData?.loading,
    })
  );

  // Pagination CurrentPage refresh
  useEffect(() => {
    setPageCount(1);
  }, [searchContactValue, pageLimit]);

  useEffect(() => {
    dispatch(
      getContactDetails({
        search: searchContactValue,
        pageCount: pageCount,
        pageLimit: pageLimit,
      })
    );
  }, [dispatch, pageCount, pageLimit, searchContactValue]);

  const ColumnHeaders = () => {
    return (
      <>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200 rounded-tl-md"
        >
          Sr. No.
        </th>
        <th
          scope="col"
          className="p-2.5 min-w-[200px] border-r border-lightyellow font-semibold bg-gray-200"
        >
          Full Name
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Email
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Date
        </th>
        <th
          scope="col"
          className="p-2.5 border-r border-lightyellow font-semibold bg-gray-200"
        >
          Subject
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
        {(getContactUsDetalsData?.results || [])?.map((element, index) => (
          <tr key={index} className={"border-b text-sm"}>
            <td className="px-5 py-2 text-center">
              {" "}
              {(getContactUsDetalsData?.page - 1) *
                getContactUsDetalsData?.limit +
                index +
                1}
            </td>
            <td className="px-5 py-2">{element.full_name}</td>
            <td className="px-5 py-2">{element.email}</td>
            <td className="px-5 py-2 text-center">
              {moment(element.createdAt).format("DD/MM/YYYY")}
            </td>
            <td className="px-5 py-2 min-w-[150px]">{element.subject}</td>
            <td
              className="px-5 py-2 max-w-[400px] mr-4 overflow-auto cursor-pointer"
              onClick={() => {
                setView(element);
                setModalOpen(true);
              }}
            >
              <span>
                <Eye size="22" className="my-2 mx-auto" />
              </span>
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
            breadCrumbTitle={"Contact Details"}
            breadCrumbParent={"Dashboard"}
            breadCrumbActive={"Contact Details"}
          />
        </div>
      </div>
      <div className="container px-4 mx-auto relative">
        <section className="custom-scroll">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="bg-theme/20 p-1.5 rounded-lg">
              <button
                type="button"
                className={`${`bg-theme`} font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md flex items-center justify-center gap-1.5`}
              >
                Total
                <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full">
                  {getContactUsDetalsData?.totalResults}
                </span>
              </button>
            </div>
            <DebounceSearch
              search={searchContactValue}
              handleChange={setSearchContactValue}
              placeholder={"Search Contact"}
            />
          </div>
          {/* CustomTable */}
          <CustomTable
            columnHeaders={<ColumnHeaders />}
            dataRows={<DataRows />}
            data={getContactUsDetalsData}
            // loader
            loading={pageLoading}
            // showLimit
            setPaginationCurrentLimit={setPageLimit}
            paginationCurrentLimit={pageLimit}
            // paginationData
            total={getContactUsDetalsData?.totalPages}
            current={pageCount}
            paginationData={(crPage) => setPageCount(crPage)}
          />
        </section>
        <div>
          {modalOpen && (
            <div className="backdrop-blur-sm bg-black/40 flex items-center justify-center w-full fixed top-0 left-0 right-0 z-[999999] mx-auto h-screen">
              <div className="bg-[#fffcf7] drop-shadow-lg rounded-lg max-w-2xl p-6 mx-auto relative">
                <div className="absolute top-[10px] right-[10px] z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    <CloseSquare size={25} color={"#FF8A65"} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 items-center justify-between flex-wrap gap-2 mt-4">
                  <p>
                    <span className="font-medium">Full Name</span> :{" "}
                    {view.full_name}
                  </p>
                  <p>
                    <span className="font-medium">Email</span> : {view.email}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 items-center justify-between flex-wrap gap-2 my-2">
                  <p className="">
                    <span className="font-medium">Subject</span> :{" "}
                    {view.subject}
                  </p>
                  <p>
                    <span className="font-medium">Date</span> :
                    {moment(view.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>

                <hr className="border border-1 border-gray-200 mb-2" />
                <p className="max-h-[250px] overflow-y-auto">
                  <span className="font-medium">Message</span> : {view.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
