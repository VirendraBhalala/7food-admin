import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation, useNavigate } from "react-router-dom";
import layoutContext from "./layoutContext";
import { Icon } from "../components/micro";
import { Logo } from "../assets/image";
import { AdminContext } from ".";
import {
  CloseCircle,
  ArrowDown2,
  ArrowUp2,
  Reserve,
  Book1,
  Sms,
  Personalcard,
  People,
  UserSquare,
  Bag2,
  ArrowLeft,
  ArrowRight,
  EmojiNormal,
} from "iconsax-react";

const Sidebar = ({ profileStatus }) => {
  // hooks
  const { isAsideOpen, setIsAsideOpen } = useContext(layoutContext);
  const adminData = useContext(AdminContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [subDrop, setSubDrop] = useState(false);
  const [userDrop, setUserDrop] = useState(false);

  //url, permissions, icons, title, badge
  const Menus = [
    { title: "Dashboard", src: `PresentionChart`, openBar: "" },
    { title: "Categories", src: `Category`, openBar: "categories" },
    { title: "Products", src: `Category2`, openBar: "products" },
    {
      title: "Order List",
      src: `DirectboxNotif`,
      openBar: "order-list",
    },
    { title: "Restaurant ", src: `Reserve`, openBar: "restaurant" },
    {
      title: "Discount",
      src: `DiscountShape`,
      openBar: "discount",
    },
    {
      title: "Pin Code",
      src: `Bezier`,
      openBar: "pin-code",
    },
  ];

  return (
    <>
      <aside
        className={`${isAsideOpen ? "w-[16rem]" : "md:w-[5rem] w-0"} ${profileStatus === "false" ? "hidden" : ""
          } fixed top-0 z-[99] md:relative flex h-screen flex-col md:overflow-visible overflow-hidden transition-all md:bg-theme/20 bg-theme`}
      >
        <div className="flex items-center justify-center px-5 py-2.5 gap-x-4 border-b border-gray-200 relative">
          <div
            className={`origin-left font-medium text-xl duration-250 overflow-hidden ${isAsideOpen ? "w-[12rem] h-16" : "w-16 h-11"
              }`}
          >
            {isAsideOpen ? (
              <LazyLoadImage
                effect="blur"
                width="100%"
                height="100%"
                src={adminData?.restaurant_logo ?? Logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <LazyLoadImage
                effect="blur"
                width="100%"
                height="100%"
                src={adminData?.favicon_logo ?? Logo}
                alt="logo"
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div className="absolute top-4 -right-4 hidden gap-2 cursor-pointer md:flex">
            <span onClick={() => setIsAsideOpen(!isAsideOpen)}>
              <div className="bg-amber-600 text-white font-bold rounded-full p-1.5">
                {isAsideOpen ? (
                  <>
                    <ArrowLeft size="18" />
                  </>
                ) : (
                  <ArrowRight size="18" />
                )}
              </div>
            </span>
          </div>
          {isAsideOpen ? (
            <>
              <div className="absolute top-2 right-1 p-1 bg-amber-600 rounded-full md:hidden block">
                <span
                  className={` block md:hidden cursor-pointer`}
                  onClick={() => setIsAsideOpen(!isAsideOpen)}
                >
                  <CloseCircle size="28" color="white" className="" />
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <ul className="p-4">
          {Menus.map((menu, index) => (
            <li key={index} className={`group aside-links tooltipBlock`}>
              <button
                className={`flex items-center relative z-[99999] ${!isAsideOpen
                  ? "px-2 hover:translate-x-0 hover:bg-orange-200 my-1 justify-center"
                  : "hover:translate-x-1 px-4 "
                  }  py-2 gap-x-4 h-auto  hover:text-black w-full rounded-lg transition duration-200  ${location.pathname === `/${menu.openBar}` && `bg-theme `
                  }`}
                onClick={() => {
                  setSubDrop(false);
                  setUserDrop(false);
                  navigate(`${menu.openBar}`);
                }}
              >
                <Icon iconName={`${menu.src}`} size={20} />
                <p
                  className={`origin-left font-medium duration-250 flex  items-center  ${!isAsideOpen && "hidden"
                    }   `}
                >
                  {menu.title}

                  <span
                    className={`flex items-center justify-center w-5 h-5 ml-5 text-xs text-white bg-green-600 rounded-full ${menu.title === `Order List` ? ` block ` : ` hidden `
                      }`}
                  >
                    {adminData?.pending_order_count}
                  </span>
                </p>
                {!isAsideOpen && (
                  <div
                    id="tooltip"
                    className="right absolute top-[20%] left-[55px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                  >
                    <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                    <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px]">
                      {menu.title}
                    </div>
                  </div>
                )}
              </button>
            </li>
          ))}
          <li className={`group aside-links `}>
            <button
              className={`flex items-center relative z-[99999] tooltipBlock ${!isAsideOpen
                ? "px-0.5 hover:translate-x-0 my-1 justify-center"
                : " hover:translate-x-1 px-4"
                } py-2 gap-x-4 h-auto  hover:text-black w-full rounded-lg transition duration-200`}
              onClick={() => {
                setSubDrop(!subDrop);
                setUserDrop(false);
              }}
            >
              <div className="flex items-center">
                <Bag2 size="24" />
                {!isAsideOpen && <ArrowDown2 size="16" />}
              </div>
              <span
                className={`flex items-center justify-between w-full font-medium ${!isAsideOpen && "hidden"
                  }`}
              >
                Custom Page
                <span className="">
                  {subDrop ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}
                </span>
              </span>
              {!isAsideOpen && (
                <div
                  id="tooltip"
                  className="right absolute top-[20%] left-[55px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                >
                  <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                  <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px] flex items-center">
                    Custom Page
                  </div>
                </div>
              )}
            </button>
            <ul
              className={`${subDrop ? `  ` : ` w-0 h-0 overflow-hidden `
                } transition duration-300 `}
            >
              <li
                className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md w-full  ${location.pathname === `/${"custom-details"}` && `bg-theme`
                  } ${isAsideOpen
                    ? "px-4 mx-2 py-2.5 hover:translate-x-1"
                    : "hover:bg-orange-200 hover:text-black justify-center"
                  } transition duration-200 my-1 tooltipBlock`}
                onClick={() => {
                  navigate("/custom-details");
                }}
              >
                <div
                  className={`font-medium flex gap-x-4 items-center relative`}
                >
                  <EmojiNormal size="18" />
                  <p className={`${!isAsideOpen && "hidden"}`}>Home Page</p>
                  {!isAsideOpen && (
                    <div
                      id="tooltip"
                      className="right absolute top-[0%] left-[40px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                    >
                      <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                      <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px]">
                        Home Page
                      </div>
                    </div>
                  )}
                </div>
              </li>
              <li
                className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md w-full  ${location.pathname === `/${"helper1"}` && `bg-theme`
                  } ${isAsideOpen
                    ? "px-4 mx-2 py-2.5 hover:translate-x-1"
                    : "hover:bg-orange-200 hover:text-black justify-center"
                  } transition duration-200 my-1 tooltipBlock`}
                onClick={() => {
                  navigate("/helper1");
                }}
              >
                <div
                  to="helper1"
                  className={`font-medium flex gap-x-4 items-center relative`}
                >
                  <Book1 size="18" />
                  <p className={`${!isAsideOpen && "hidden"}`}>Policy Page</p>
                  {!isAsideOpen && (
                    <div
                      id="tooltip"
                      className="right absolute top-[0%] left-[40px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                    >
                      <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                      <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px]">
                        Policy Page
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </li>
          <li className={`group aside-links `}>
            <button
              className={`flex items-center relative z-[99999] tooltipBlock ${!isAsideOpen
                ? "px-1 hover:translate-x-0 hover:bg-orange-200 my-1 justify-center"
                : " hover:translate-x-1 px-4"
                }  py-2 gap-x-4 h-auto  hover:text-black w-full rounded-lg transition duration-200`}
              onClick={() => {
                setUserDrop(!userDrop);
                setSubDrop(false);
              }}
            >
              <div className="flex items-center">
                <Personalcard size="24" />
                {!isAsideOpen && <ArrowDown2 size="16" />}
              </div>
              <span
                className={`flex items-center justify-between w-full font-medium ${!isAsideOpen && "hidden"
                  }`}
              >
                Users
                <span className="">
                  {userDrop ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}
                </span>
              </span>
              {!isAsideOpen && (
                <div
                  id="tooltip"
                  className="right absolute top-[20%] left-[55px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                >
                  <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                  <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px] flex items-center">
                    Users
                  </div>
                </div>
              )}
            </button>
            <ul
              className={`${userDrop ? `  ` : ` w-0 h-0 overflow-hidden `
                } transition duration-300 `}
            >
              <li
                className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md w-full  ${location.pathname === `/${"user-details"}` && `bg-theme`
                  } ${isAsideOpen
                    ? "px-4 mx-2 py-2.5 hover:translate-x-1"
                    : "hover:bg-orange-200 hover:text-black justify-center"
                  } transition duration-200 my-1 tooltipBlock`}
                onClick={() => {
                  navigate("/user-details");
                }}
              >
                <div
                  to="restaurant"
                  className={`font-medium flex gap-x-4 items-center relative`}
                >
                  <People size="18" />
                  <p className={`${!isAsideOpen && "hidden"}`}>Customers</p>
                  {!isAsideOpen && (
                    <div
                      id="tooltip"
                      className="right absolute top-[0%] left-[40px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                    >
                      <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                      <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px]">
                        Customers
                      </div>
                    </div>
                  )}
                </div>
              </li>
              <li
                className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md w-full  ${location.pathname === `/${"contact-details"}` && `bg-theme`
                  } ${isAsideOpen
                    ? "px-4 mx-2 py-2.5 hover:translate-x-1"
                    : "hover:bg-orange-200 hover:text-black justify-center"
                  } transition duration-200 my-1 tooltipBlock`}
                onClick={() => {
                  navigate("/contact-details");
                }}
              >
                <div
                  to="restaurant"
                  className={`font-medium flex gap-x-4 items-center relative`}
                >
                  <UserSquare size="18" />
                  <p className={`${!isAsideOpen && "hidden"}`}>Contact Us</p>
                  {!isAsideOpen && (
                    <div
                      id="tooltip"
                      className="right absolute top-[0%] left-[40px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                    >
                      <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                      <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px]">
                        Contact Us
                      </div>
                    </div>
                  )}
                </div>
              </li>
              {/* <li
                className={`text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md w-full  ${
                  location.pathname === `/${"reviews"}` && `bg-theme`
                } ${
                  isAsideOpen
                    ? "px-4 mx-2 py-2.5 hover:translate-x-1"
                    : "hover:bg-orange-200 hover:text-black justify-center"
                } transition duration-200 tooltipBlock`}
                onClick={() => {
                  navigate("/reviews");
                }}
              >
                <div
                  className={`font-medium flex gap-x-4  items-center  relative  `}
                >
                  <Sms size="18" />
                  <p className={`${!isAsideOpen && "hidden"}`}>Reviews</p>

                  {!isAsideOpen && (
                    <div
                      id="tooltip"
                      className="right absolute top-[0%] left-[40px] text-xs whitespace-nowrap font-semibold -z-[100] hidden"
                    >
                      <div className="absolute w-0 h-0 border-transparent border-solid tooltip-arrow border-r-transparent" />
                      <div className="tooltip-label py-1 px-2 text-white bg-black rounded-[4px] text-center max-w-[180px]">
                        Reviews
                      </div>
                    </div>
                  )}
                </div>
              </li> */}
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
