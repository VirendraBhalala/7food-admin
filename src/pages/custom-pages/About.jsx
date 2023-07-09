import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputError } from "../../commons/MicroComponents";
import { DefaultAbout } from "../../assets/image";
import { GalleryAdd } from "iconsax-react";
import {
  aboutDetailsPutData,
  getAboutDetailesData,
} from "../../redux/about/slice";
import RippleLoader from "../../commons/RippleLoader";

const About = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [issubmitForm, setIssubmitForm] = useState(false);

  useEffect(() => {}, [dispatch]);

  // useEffect(() => {
  //   if (!aboutDetailesLoding && !aboutDetailesError && issubmitForm) {
  //     navigate("/");
  //   }
  // }, [aboutDetailesLoding, aboutDetailesError, issubmitForm, navigate]);

  return (
    <>
      {/* {aboutDetailesLoding && <RippleLoader />} */}
      {/* {aboutDetailesError && <LazyloadLoader />} */}
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{}}
          validationSchema={Yup.object().shape({})}
          onSubmit={(values) => {
            const formData = new FormData();

            setIssubmitForm(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="w-full">
                <div className={"relative"}>
                  <div className="container mx-auto px-4">
                    {/* <div className="flex justify-center gap-4 pt-5">
                      <button
                        type="submit"
                        className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 md:px-8 px-5 md:py-2 py-1.5 md:text-base text-sm font-semibold shadow-lg transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-rose-500 text-white hover:text-black border-rose-500 hover:bg-transparent rounded-md hover:border-rose-500 border-2 md:px-6 px-4 md:py-2 py-1.5 md:text-base text-sm font-semibold shadow-lg transition duration-200"
                      >
                        Cancel
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default About;
