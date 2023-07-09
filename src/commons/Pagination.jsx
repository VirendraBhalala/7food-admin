import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const Pagination = (props) => {
  const handlePagination = (current) => {
    props.pagination(current);
  };

  return (
    <>
      <div>
        <ul className="flex items-center justify-center gap-3 bg-theme/20 rounded-full p-1.5">
          {props.current === 1 ? (
            <></>
          ) : (
            <>
              <li className="page-item">
                <Link
                  to={"#"}
                  className={`flex items-center justify-center rounded-full bg-theme py-1 px-3 ${
                    props.current === 1 ? "hidden" : props.current > 1 ? "" : ""
                  }`}
                  href="#"
                  onClick={() =>
                    handlePagination(Math.max(props.current - 1, 1))
                  }
                >
                  <span className="xl:text-lg text-base font-bold mr-1 pt-0.5">
                    <ArrowLeft2 size="16" />
                  </span>
                  <span className="text-xs font-bold xl:text-base md:text-sm ">
                    Previous
                  </span>
                </Link>
              </li>
            </>
          )}
          {props.total < 7 ? (
            <>
              {Array.apply(0, Array(props.total)).map((arr, i) => (
                <Fragment key={i}>
                  <li
                    className={`page-item ${
                      props.current === i + 1 ? "bg-theme rounded-full" : ""
                    }`}
                  >
                    <Link
                      className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                      to={"#"}
                      onClick={() => handlePagination(i + 1)}
                    >
                      {i + 1}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </>
          ) : props.current % 5 >= 0 &&
            props.current > 4 &&
            props.current + 2 < props.total ? (
            <>
              <li className="page-item">
                <Link
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  to={"#"}
                  onClick={() => handlePagination(1)}
                >
                  1
                </Link>
              </li>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link disabled"
                  href="#"
                >
                  ...
                </a>
              </li>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.current - 1)}
                >
                  {props.current - 1}
                </a>
              </li>
              <li className="rounded-full bg-theme page-item ">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.current)}
                >
                  {props.current}
                </a>
              </li>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.current + 1)}
                >
                  {props.current + 1}
                </a>
              </li>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link disabled"
                  href="#"
                >
                  ...
                </a>
              </li>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.total)}
                >
                  {props.total}
                </a>
              </li>
            </>
          ) : props.current % 5 >= 0 &&
            props.current > 4 &&
            props.current + 2 >= props.total ? (
            <>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(1)}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link disabled"
                  href="#"
                >
                  ...
                </a>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total - 3
                    ? " bg-theme rounded-full "
                    : ""
                }`}
              >
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.total - 3)}
                >
                  {props.total - 3}
                </a>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total - 2
                    ? " bg-theme rounded-full "
                    : ""
                }`}
              >
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.total - 2)}
                >
                  {props.total - 2}
                </a>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total - 1
                    ? " bg-theme rounded-full "
                    : ""
                }`}
              >
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.total - 1)}
                >
                  {props.total - 1}
                </a>
              </li>
              <li
                className={`page-item ${
                  props.current === props.total ? " bg-theme rounded-full " : ""
                }`}
              >
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.total)}
                >
                  {props.total}
                </a>
              </li>
            </>
          ) : (
            <>
              {Array.apply(0, Array(5)).map((arr, i) => (
                <Fragment key={i}>
                  <li
                    className={`page-item ${
                      props.current === i + 1 ? " bg-theme rounded-full " : ""
                    }`}
                  >
                    <a
                      className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                      href="#"
                      onClick={() => handlePagination(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                </Fragment>
              ))}
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link disabled"
                  href="#"
                >
                  ...
                </a>
              </li>
              <li className="page-item">
                <a
                  className="flex items-center justify-center font-semibold rounded-full w-7 h-7 bg-theme/30 page-link"
                  href="#"
                  onClick={() => handlePagination(props.total)}
                >
                  {props.total}
                </a>
              </li>
            </>
          )}
          {props.current === props.total ? (
            <></>
          ) : (
            <>
              <li className="page-item">
                <Link
                  to={"#"}
                  className={`flex items-center justify-center rounded-full bg-theme py-1 px-3 ${
                    props.current === props.total
                      ? "hidden"
                      : props.current < props.total
                      ? ""
                      : ""
                  }`}
                  href="#"
                  onClick={() =>
                    handlePagination(Math.min(props.current + 1, props.total))
                  }
                >
                  <span className="text-xs font-bold xl:text-base md:text-sm">
                    Next
                  </span>
                  <span className="xl:text-lg text-base font-bold pt-0.5">
                    <ArrowRight2 size="16" />
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Pagination;
