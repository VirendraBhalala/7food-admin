import React from "react";

const TableShowLimit = ({
  paginationCurrentLimit,
  setPaginationCurrentLimit,
}) => {
  return (
    <>
      <div className="flex items-center p-1.5 rounded-lg bg-theme/20">
        <label
          htmlFor="pagination"
          className="px-2 text-xs font-bold xl:text-base md:text-sm"
        >
          Show
        </label>
        <div className="rounded-lg bg-theme">
          <select
            name="pagination"
            id="pagination"
            defaultValue={paginationCurrentLimit}
            onChange={(e) => {
              setPaginationCurrentLimit(e.target.value);
            }}
            className={"font-bold px-2 py-1.5"}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TableShowLimit;
