import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight2 } from "iconsax-react";

const Breadcrumb = (props) => {
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParent2,
    breadCrumbParent3,
    breadCrumbActive,
    breadCrumbTitleKey,
    breadCrumbParentKey,
    breadCrumbParentKey2,
    breadCrumbParentKey3,
    breadCrumbActiveKey,
  } = props;
  return (
    <>
      <div>
        <h4 className="mb-1 font-semibold lg:text-2xl text-[22px]">
          {breadCrumbTitle}
        </h4>
        <ul className="flex items-center overflow-x-auto gap-x-2 whitespace-nowrap">
          {breadCrumbParent ? (
            <>
              <li>
                <Link
                  to={`${breadCrumbTitleKey ? breadCrumbTitleKey : "#"}`}
                  className={"text-theme font-bold lg:text-base text-sm"}
                >
                  {breadCrumbParent}
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
          {breadCrumbParent2 ? (
            <>
              <li className="flex items-center justify-center gap-x-2">
                <span>
                  <ArrowRight2 size="16" />
                </span>
                <Link
                  to={`${breadCrumbParentKey2 ? breadCrumbParentKey2 : "#"}`}
                  className={"text-theme font-bold lg:text-base text-sm"}
                >
                  {breadCrumbParent2}
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
          {breadCrumbParent3 ? (
            <>
              <li className="flex items-center justify-center gap-x-2">
                <span>
                  <ArrowRight2 size="16" />
                </span>
                <Link
                  to={`${breadCrumbParentKey3 ? breadCrumbParentKey3 : "#"}`}
                  className={"text-theme font-bold lg:text-base text-sm"}
                >
                  {breadCrumbParent3}
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
          {breadCrumbActive ? (
            <>
              <li className="flex items-center justify-center gap-x-2 pointer-events-none">
                <span>
                  <ArrowRight2 size="16" />
                </span>
                <Link
                  className={"g:text-base text-sm"}
                  to={`${breadCrumbActiveKey ? breadCrumbActiveKey : "#"}`}
                >
                  {breadCrumbActive}
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
};

export default Breadcrumb;
