import React, { useEffect, useState } from "react";
import { InputError } from "../../commons/MicroComponents";
import { useDispatch, useSelector } from "react-redux";
import { loginApiAdmin } from "../../redux/auth/slice";
import RippleLoader from "../../commons/RippleLoader";
import { authBgImage } from "../../assets/image";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");
  const [loginState, setLoginState] = useState(false);

  const { logingData, logingDataLoading, logingDataError } = useSelector(
    (store) => ({
      logingData: store?.authData?.loginStatus?.data?.data?.profileComplete,
      logingDataLoading: store?.authData?.loading,
      logingDataError: store?.authData?.error,
    })
  );

  useEffect(() => {
    if (!logingDataLoading && !logingDataError && loginState) {
      logingData ? navigate("/") : navigate("/restaurant");
    } else {
      navigate("/login");
    }
  }, [navigate, logingDataLoading, logingDataError, loginState, logingData]);

  return (
    <>
      <div className={`h-screen overflow-hidden `}>
        {logingDataLoading && <RippleLoader />}
        <div
          className={`flex items-center justify-center h-full  bg-no-repeat bg-cover bg-center ${logingDataLoading && ` hidden `
            } `}
          style={{
            backgroundImage: `url(${authBgImage})`,
          }}
        >
          <section className="w-full">
            <div className="max-w-xl w-full mx-auto">
              <div className="rounded-lg drop-shadow-lg bg-white px-6 py-8 mx-4">
                <div className={"mb-8"}>
                  <h1 className="sm:text-2xl text-lg font-semibold mb-1">
                    Get's Started
                  </h1>
                </div>
                {/* Login flow */}
                <Formik
                  initialValues={{
                    email: "admin@gmail.com",
                    password: "admin@123456",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string().required("Please Enter Email"),
                    password: Yup.string()
                      .required("Please Enter Password")
                      .min(
                        8,
                        "Password is too short - should be 8 chars minimum."
                      )
                      .matches(
                        /[a-zA-Z]/,
                        "Password can only contain Latin letters."
                      ),
                  })}
                  onSubmit={(values) => {
                    dispatch(loginApiAdmin(values));
                    setLoginState(true);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="space-y-5">
                        {/* Email */}
                        <div className="">
                          <div
                            className={`${errors.email && touched.email
                              ? ` input-error `
                              : ` border `
                              } relative  hover:border-braun transition duration-300 rounded-lg`}
                          >
                            <input
                              type="Email"
                              id="email"
                              name="email"
                              className="block px-2.5 pb-2.5 pt-4 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder={" "}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <label
                              htmlFor="Email"
                              className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                              Email
                            </label>
                          </div>
                          {errors.email && touched.email ? (
                            <>
                              <InputError errorTitle={errors.email} />
                            </>
                          ) : null}
                        </div>
                        {/* password */}
                        <div className="">
                          <div
                            className={`${errors.password && touched.password
                              ? ` input-error `
                              : ` border`
                              }  relative  hover:border-braun transition duration-300 rounded-lg flex items-center`}
                          >
                            <input
                              type={passwordType}
                              id="password"
                              name="password"
                              className="block px-2.5 pb-2.5 pt-4 w-full error-forms text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder={" "}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            <label
                              htmlFor="password"
                              className="absolute pointer-events-none text-sm bg-white text-braun duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                              Password
                            </label>
                            <p
                              className="p-2 absolute top-1.5 right-0 rounded bg-transparent z-20"
                              onClick={() => {
                                if (passwordType === "password") {
                                  setPasswordType("text");
                                  return;
                                }
                                setPasswordType("password");
                              }}
                            >
                              {passwordType === "password" ? (
                                <EyeSlash size="20" />
                              ) : (
                                <>
                                  <Eye size="20" />
                                </>
                              )}
                            </p>
                          </div>
                          {errors.password && touched.password ? (
                            <>
                              <InputError errorTitle={errors.password} />
                            </>
                          ) : null}
                        </div>
                        <button
                          type="submit"
                          // disabled={isSubmitting}
                          className="w-full block bg-theme text-center text-sm font-semibold border-2 border-transparent hover:bg-transparent hover:border-2 hover:border-theme hover:text-braun rounded transition duration-500 py-2 lg:px-7 px-4"
                        >
                          Login
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Auth;
