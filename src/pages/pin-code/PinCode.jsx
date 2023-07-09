import { FieldArray, Form, Formik } from 'formik'
import { CloseCircle, Edit2, Trash } from 'iconsax-react';
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../../commons/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getPincodeDeliveryCharge, pincodeDeliveryCharge } from '../../redux/pincode/slice';
import { InputError } from '../../commons/MicroComponents';
import { Loader } from '../../assets/svg/AllSvg';

const PinCode = () => {

    const dispatch = useDispatch()

    const [pinCodeArray, setPinCodeArray] = useState([])
    const [finalArrayPincode, setFinalArrayPincode] = useState([])
    const [objectData, setObjectData] = useState([])
    const [chargeType, setChargeType] = useState(false)


    const { putPinLoading, getPincodeData } = useSelector((store) => ({
        putPinLoading: store?.pincodeData?.loading,
        getPincodeData: store?.pincodeData?.getPincodeDeliveryChargeStatus?.data
    }))

    console.log('getPincodeData', getPincodeData);

    // Pin Code Handle Delete
    const handleDelete = (aaray, index) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "error",
            type: "warning",
            html: `You won't be able to revert this!`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((response) => {
            console.log('response', response);
            if (response.isConfirmed === true && index > -1) {
                pinCodeArray.splice(index, 1);
                objectData.splice(index, 1)
                setPinCodeArray([...pinCodeArray])
                setObjectData([...objectData])
            }
        });
    };

    const handelPinCodeMultiple = (data) => {
        setPinCodeArray(pinCodeArray => [...pinCodeArray, ...data.map(ele => ele.trim()).filter(ele => ele.length)])
    }

    const handelPinCodeSingle = (data) => {
        let oldPinCodeArray = [...pinCodeArray]
        oldPinCodeArray.push(data)
        setPinCodeArray(oldPinCodeArray)
    }

    useEffect(() => {
        if (!finalArrayPincode.length) {
            // console.log("iffff");
            // console.log("pinCodeArray====>", pinCodeArray);
            const newArrayData = pinCodeArray.map((element) => ({
                pincode: element,
                charge: 'default'
            }))
            // console.log("newArrayData", newArrayData);
            setObjectData(newArrayData)
        }
        else {
            // console.log("else");
            // console.log("pinCodeArray====>", pinCodeArray);
            // console.log("objectData====>", objectData);
            pinCodeArray.forEach(ele => !(objectData.find(e => e.pincode == ele)) ? objectData.push({
                pincode: ele,
                charge: "default"
            }) : 0)

            setObjectData(objectData)
        }
    }, [pinCodeArray, finalArrayPincode])

    // console.log('>>>>>objectData>>>>>>', objectData);

    const handelDeliveryChargeChange = (data, index) => {
        objectData[index].charge = data
        // console.log("data", objectData);
        setFinalArrayPincode(objectData)
    }

    useEffect(() => {
        dispatch(getPincodeDeliveryCharge())
    }, [])

    useEffect(() => {
        setObjectData(getPincodeData ?? [])
    }, [getPincodeData])

    return (
        <>
            <div className="mb-4 border-b border-gray-200">
                <div className="container px-4 py-2.5 mx-auto">
                    <Breadcrumb
                        breadCrumbTitle={"Pin Code"}
                        breadCrumbParent={"Dashboard"}
                        breadCrumbActive={"Pin Code"}
                    />
                </div>
            </div>

            <section className="container px-4 mx-auto">
                <Formik enableReinitialize={true}
                    initialValues={{
                        array_pin_code: [],
                    }}

                // onSubmit={(values) => {
                //     console.log('values', values)
                // }}
                >
                    {({ values,
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        setFieldValue, }) => (
                        <Form onSubmit={handleSubmit}>
                            {/* Start Delivery Charge */}
                            <div className="bg-white w-full shadow-[0px_1px_6px_rgba(0,0,0,0.1)] rounded-lg py-5 md:px-7 px-5 mb-8">
                                <div className="mb-3 text-black font-bold text-xl">
                                    Delivery charge
                                </div>
                                <div className="mb-3">
                                    <FieldArray
                                        name="array_pin_code"
                                        render={(arrayHelpers) => {
                                            const AddonsArray = values.array_pin_code;
                                            return (
                                                <>
                                                    <label
                                                        htmlFor="zip_code"
                                                        className="text-sm mb-1 inline-block"
                                                    >
                                                        Pin Code
                                                    </label>
                                                    <div className="flex justify-between gap-4 ">
                                                        <input
                                                            type="text"
                                                            name="zip_code"
                                                            id="zip_code"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            onKeyUp={(e) => {
                                                                e.preventDefault();
                                                                if (
                                                                    values.zip_code !==
                                                                    undefined &&
                                                                    values.zip_code !== ""
                                                                ) {
                                                                    if (e.key === "Enter") {
                                                                        if (values.zip_code.split(',').length > 1) {
                                                                            handelPinCodeMultiple(values.zip_code.split(','))
                                                                        } else {
                                                                            handelPinCodeSingle(values.zip_code)
                                                                        }
                                                                        setFieldValue(
                                                                            "zip_code",
                                                                            ""
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                            value={values.zip_code}
                                                            rows="2"
                                                            className="border rounded-lg text-sm px-4 py-2 w-full shadow-sm focus:border-theme/80"
                                                            placeholder="895645, 458932, 263589, 895412, 215968, "
                                                        />
                                                        <button
                                                            type="button"
                                                            className="bg-theme hover:border-theme rounded-md hover:bg-transparent border-theme border-2 px-6 py-2 text-sm font-semibold transition duration-300"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (
                                                                    values.zip_code !==
                                                                    undefined &&
                                                                    values.zip_code !== ""
                                                                ) {
                                                                    if (values.zip_code.split(',').length > 1) {
                                                                        handelPinCodeMultiple(values.zip_code.split(','))
                                                                    } else {
                                                                        handelPinCodeSingle(values.zip_code)
                                                                    }
                                                                    setFieldValue(
                                                                        "zip_code",
                                                                        ""
                                                                    );
                                                                }
                                                            }}
                                                        > Add
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center flex-wrap gap-4 mt-3">
                                                        {(pinCodeArray || []).map((element, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <div className="flex items-center justify-between gap-4 bg-orange-50 rounded-md py-2 px-2">
                                                                        <p>
                                                                            {element}
                                                                        </p>
                                                                        <p
                                                                            className="text-red cursor-pointer"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                handleDelete([...pinCodeArray], index);
                                                                            }}
                                                                        >
                                                                            <CloseCircle size="18" />
                                                                        </p>
                                                                    </div>
                                                                </Fragment>
                                                            );
                                                        })}
                                                    </div>
                                                </>
                                            );
                                        }}
                                    />
                                </div>

                                <div className='my-8'>
                                    {
                                        (pinCodeArray || []).map((element, index) => {
                                            return (<>
                                                <div className='flex justify-between items-center mt-1' key={index}>
                                                    <div className='max-w-md'>
                                                        Pin Code : {element}
                                                    </div>
                                                    <div className='max-w-md'>
                                                        Delivery Charge : <input type="number" className='border rounded-md px-1'
                                                            name="zip_code"
                                                            id="zip_code"
                                                            onChange={(e) => handelDeliveryChargeChange(e.target.value, index)} />
                                                    </div>
                                                </div>
                                            </>)
                                        })
                                    }
                                </div>

                                {/* check box  */}
                                <div className='flex items-center'>
                                    <input type="checkbox" className='mr-2 h-5 w-5' id='apply_delivery_charge'
                                        onClick={() => setChargeType(!chargeType)} />
                                    <label htmlFor="apply_delivery_charge">Apply delivery charge </label>
                                </div>

                                <div className="bg-rose-200 py-2.5 px-3 rounded-lg my-2 font-semibold text-sm">
                                    <Link to={"/restaurant"}>
                                        Note: Apply delivery charge to not Apply default delivery
                                        charge
                                    </Link>
                                </div>

                                {
                                    chargeType && objectData?.length > 0 ? '' : <InputError errorTitle={'Please enter pincode and delivery charge'} />
                                }
                                {/* End Delivery Charge */}
                                <div className="flex justify-center gap-4 pt-3">
                                    {
                                        putPinLoading ? (<><Loader width={45} /></>) : (<>
                                            <button
                                                type="submit"
                                                onClick={() => chargeType && objectData?.length > 0 && dispatch(pincodeDeliveryCharge({ charge_type: chargeType ? 'pincode' : '', pincode_wish_charge: objectData }))}
                                                className="bg-theme border-theme border-2 px-8 py-2 lg:text-base text-sm font-semibold shadow-lg hover:border-theme rounded-md hover:bg-transparent transition duration-200"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-rose-500 text-white rounded-md hover:border-rose-500 border-2 px-6 py-2 lg:text-base text-sm font-semibold shadow-lg hover:text-black border-rose-500 hover:bg-transparent transition duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </>)
                                    }
                                </div>
                            </div>
                        </Form>)}
                </Formik>
            </section>
        </>
    )
}

export default PinCode