"use client";

import CheckoutWizard from "@/components/CheckoutWizard";
import { savePaymentMethod, saveShippingAddress } from "@/redux/slices/CartSlice";
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
  const { ShippingAddress, paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    if(!ShippingAddress.address) {
       return router.push("/shipping");

    }
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, router, setValue, ShippingAddress]);

  const submitHandler = ({ paymentMethod }) => {
    dispatch(savePaymentMethod(paymentMethod));

    router.push("/placeorder");
  };
  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
    <CheckoutWizard activeStep={2} />
  
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900 text-center">
        Payment Method
      </h1>
      
      <div className="space-y-4">
        {['PhonePe', 'UPI', 'Google Pay', 'Cash On Delivery', 'Debit Card', 'Credit Card'].map((payment) => (
          <div key={payment} className="flex items-center">
            <input
              name="paymentMethod"
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              id={payment}
              type="radio"
              value={payment}
              {...register('paymentMethod', {
                required: 'Please select a payment method',
              })}
            />
            <label
              className="ml-3 text-gray-700 font-medium"
              htmlFor={payment}
            >
              {payment}
            </label>
          </div>
        ))}
      </div>
  
      {errors.paymentMethod && (
        <div className="text-red-500 text-sm text-center">
          {errors.paymentMethod.message}
        </div>
      )}
  
      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
  );
}
