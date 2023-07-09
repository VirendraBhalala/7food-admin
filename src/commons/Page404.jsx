import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonTag } from "./MicroComponents";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" flex py-10 items-center justify-center flex-col h-screen  bg-secondary overflow-hidden">
        <div className="max-w-2xl m-auto py-10 px-6 text-center min-h-screen flex items-center justify-center z-10">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <h1 className="mt-8 text-3xl sm:text-6xl font-black">404</h1>
            </div>
            <h1 className="mt-8 text-2xl sm:text-3xl font-black">
              Sorry, the page was not found
            </h1>
            <p className="text-sm font-semibold mt-2">
              Although we're not exactly sure what you're looking for!
            </p>
            <ButtonTag
              onClick={() => navigate("/")}
              className="mt-7 mx-auto"
              value="Back to Home"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
