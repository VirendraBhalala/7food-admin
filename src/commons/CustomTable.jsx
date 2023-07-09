import React from "react";
import DataNotFound from "./DataNotFound";
import Pagination from "./Pagination";
import RippleLoader from "./RippleLoader";
import TableShowLimit from "./TableShowLimit";

const CustomTable = ({
  columnHeaders,
  dataRows,
  data,
  loading,
  paginationCurrentLimit,
  setPaginationCurrentLimit,
  total,
  current,
  paginationData,
}) => {
  return (
    <>
      <div className="w-full rounded-lg">
        {loading ? (
          <>
            <RippleLoader />
          </>
        ) : (
          <>
            {data?.results?.length > 0 ? (
              <>
                <div className="bg-white overflow-auto drop-hasdow-[0px_1px_6px_rgba(0,0,0,0.1)]">
                  <table className="w-full text-sm overflow-auto min-w-[800px] custom-scroll">
                    {/* column headers */}
                    <thead className="text-sm text-gray-700 bg-gray-100 font-semibold ">
                      <tr>{columnHeaders}</tr>
                    </thead>

                    {/* table body */}
                    <tbody className="relative">{dataRows}</tbody>
                  </table>
                </div>
                {/* Pagination  */}
                <div className="flex flex-wrap items-center justify-between my-7">
                  <TableShowLimit
                    paginationCurrentLimit={paginationCurrentLimit}
                    setPaginationCurrentLimit={setPaginationCurrentLimit}
                  />
                  <div className="px-4 py-2 rounded-lg xl:py-3">
                    <Pagination
                      total={total}
                      current={current}
                      pagination={paginationData}
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
    </>
  );
};

export default CustomTable;
