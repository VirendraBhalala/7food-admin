import React from "react";
import { useContext } from "react";
import { AdminContext } from ".";

const Footer = () => {
  const adminData = useContext(AdminContext);

  return (
    <>
      <div className="w-full">
        <footer className=" bg-slate-800 body-font">
          <div className="px-4 py-3 text-white capitalize">
            Copyright © {new Date().getFullYear()}{" "}
            <span
              // href={`${adminData?.user_app_link}`}
              // target="_blank"
              className="ml-1 font-bold text-theme"
            // rel="noreferrer"
            >
              {adminData?.restaurant_name}{" "}
            </span>
            All Rights Reserved
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
