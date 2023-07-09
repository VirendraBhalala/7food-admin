import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DataNotFoundImage } from "../assets/image";

const DataNotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-56">
          <LazyLoadImage
            effect="blur"
            width="100%"
            height="100%"
            src={DataNotFoundImage}
            alt="DataNotFound"
          />
        </div>
        <p className="mt-2 lg:text-2xl text-xl font-bold text-center">
          Data Not Found
        </p>
      </div>
    </>
  );
};

export default DataNotFound;
