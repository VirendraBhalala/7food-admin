import React from "react";
import { Loader } from "../assets/svg/AllSvg";
import "../assets/css/loader.css";

const LazyloadLoader = () => {
  return (
    <>
      <div className="LoadingContainer">
        <div className="LoadingBox">
          <Loader width={45} />
        </div>
      </div>
    </>
  );
};

export default LazyloadLoader;
