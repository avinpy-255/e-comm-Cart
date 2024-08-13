'use client';

import CheckoutWizard from "@/components/CheckoutWizard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PlaceOrderScreen() {
    const {
        cartItems,
        itemsPrice,
        ShippingAddress,
        totalPrice,
        ShippingPrice,
        paymentMethod,
        loading,
    } = useSelector((state) => state.cart);
    
    const router = useRouter();

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
    }, [paymentMethod, router]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <CheckoutWizard activeStep={3} />
            <h1 className="text-2xl font-semibold text-center my-6">Review and Place Your Order</h1>
            {loading ? (
                <div className="text-center text-lg">Loading...</div>
            ) : cartItems.length === 0 ? (
                <div className="text-center text-lg">
                    No items in cart. <Link href='/' className="text-blue-600 hover:underline">Go Shopping</Link>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="bg-white p-4 shadow rounded-lg">
                        <div className="mb-4">
                            <h2 className="text-xl font-medium">Shipping Address</h2>
                            <p className="text-gray-600 mt-1">
                                {ShippingAddress.fullName}, {ShippingAddress.address}, {ShippingAddress.city}, {ShippingAddress.country}
                            </p>
                            <Link className="text-blue-600 hover:underline mt-2 block" href='/shipping'>
                                Edit
                            </Link>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-medium">Payment Method</h2>
                            <p className="text-gray-600 mt-1">{paymentMethod}</p>
                            <Link className="text-blue-600 hover:underline mt-2 block" href='/payment'>
                                Edit
                            </Link>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xl font-medium">Order Items</h2>
                            <table className="min-w-full bg-white border rounded-lg">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="py-3 px-5 text-left">Item</th>
                                        <th className="py-3 px-5 text-left">Quantity</th>
                                        <th className="py-3 px-5 text-left">Price</th>
                                        <th className="py-3 px-5 text-left">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b last:border-none">
                                           <td className="py-3 px-5">
                                                <Link 
                                                    href={`/product/${item.id}`}
                                                    className="flex items-center"
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                        className="mr-4 rounded-lg"
                                                    />
                                                    <span className="text-gray-800">{item.name}</span>
                                                </Link>
                                           </td>
                                           <td className="py-3 px-5">{item.qty}</td>
                                           <td className="py-3 px-5">₹{item.price}</td>
                                           <td className="py-3 px-5">₹{item.price * item.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Link className="text-blue-600 hover:underline mt-2 block" href='/cart'>
                                Edit
                        </Link>

                        <div className="text-right mt-4">
                            <Link href="/cart" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                                Place Order
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow rounded-lg">
                        <h2 className="text-xl font-medium">Order Summary</h2>
                        <div className="mt-4 space-y-2">
                            <p className="text-gray-800">Subtotal: ₹{itemsPrice}</p>
                            <p className="text-gray-800">Shipping: ₹{ShippingPrice}</p>
                            <p className="text-gray-800 font-bold">Total: ₹{itemsPrice}</p>
                        </div>
                        <div className="text-center mt-6">
                            <Link href="/OrderComplete" className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition">
                                Confirm Order
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}