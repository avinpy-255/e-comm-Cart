"use client";

import CheckoutWizard from "@/components/CheckoutWizard";
import { saveShippingAddress } from "@/redux/slices/CartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function ShippingAddressPage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { ShippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    setValue("fullName", ShippingAddress.fullName);
    setValue("address", ShippingAddress.address);
    setValue("city", ShippingAddress.city);
    setValue("country", ShippingAddress.country);
  }, [setValue, ShippingAddress]);

  const submitHandler = ({ fullName, address, city, country }) => {
    dispatch(saveShippingAddress({ fullName, address, city, country }));

    router.push("/payment");
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <CheckoutWizard activeStep={1} />

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Shipping Address
        </h1>

        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-gray-700 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("fullName", { required: "Please Enter Full Name" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("address", { required: "Please Enter your address" })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="text-gray-700 font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("city", { required: "Please Enter your city" })}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="text-gray-700 font-medium">
          Country
          </label>
          <input
            type="text"
            id="country"
            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("country", { required: "Please Enter your country" })}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md shadow hover:bg-blue-600 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
