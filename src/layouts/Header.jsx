import React, { useContext, useState, useEffect, useRef } from "react";
import { HambergerMenu, Logout, ProfileCircle } from "iconsax-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { userDefault } from "../assets/image";
import layoutContext from "./layoutContext";
import { AdminContext } from ".";

const Header = () => {
  const { isAsideOpen, setIsAsideOpen } = useContext(layoutContext);
  const adminData = useContext(AdminContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const toggling = () => setOpen(!open);

  const logOutClear = () => {
    toggling();
    sessionStorage.clear();
    navigate("/login");
  };

  const profile = () => {
    toggling();
    navigate("/profile");
  };

  useEffect(() => {
    function handler(event) {
      if (!cancelButtonRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-[9]">
        <div className="shadow-md bg-white b-b-1 h-16 w-full flex flex-0 justify-end items-center px-4 ">
          <div className="absolute top-3 md:right-[-14px] right-0 left-6 md:left-0 md:hidden block">
            <div className="flex gap-2 cursor-pointer">
              <span onClick={() => setIsAsideOpen(!isAsideOpen)}>
                {!isAsideOpen && (
                  <div className="bg-amber-100 text-white font-bold rounded-full p-1.5">
                    <div className="w-7 h-7  flex justify-center items-center overflow-hidden bg-amber-600 rounded-full">
                      <HambergerMenu size="22" className="" />
                    </div>
                  </div>
                )}
              </span>
            </div>
          </div>
          <div
            className="cursor-pointer select-none flex items-center relative gap-2 bg-amber-100 p-1.5 rounded-full"
            ref={cancelButtonRef}
            onClick={() => toggling()}
          >
            <div className="w-7 h-7 overflow-hidden bg-amber-600 rounded-full">
              <LazyLoadImage
                effect="blur"
                width="100%"
                height="100%"
                src={adminData?.profile_image ?? userDefault}
                className="w-full h-full object-cover"
                alt="User Profile"
              />
            </div>
            <p className="font-semibold mr-2 md:block hidden">
              {adminData?.first_name || adminData?.last_name ? (
                <span>{`${adminData?.first_name + " " + adminData?.last_name
                  }`}</span>
              ) : (
                <span>Admin Name</span>
              )}
            </p>
            {open && (
              <>
                <ul className="absolute top-[calc(100%+0.4rem)] min-w-[10rem] right-0 bg-white shadow-md rounded-lg overflow-auto">
                  <li
                    className="flex gap-2 items-center px-6 py-2 hover:bg-amber-200 transition duration-300 cursor-pointer"
                    onClick={() => profile()}
                  >
                    <ProfileCircle size="20" />
                    <p>Profile</p>
                  </li>
                  <li
                    className="flex gap-2 items-center px-6 py-2 hover:bg-amber-200 transition duration-300 cursor-pointer"
                    onClick={() => logOutClear()}
                  >
                    <Logout size="20" />
                    <p>Log Out</p>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
