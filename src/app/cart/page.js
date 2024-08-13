"use client";

import { addToCart, removeFromCart } from "@/redux/slices/CartSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <div>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {loading ? (
        <div className="py-5 px-2">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          <div className="overflow-x-auto md:col-span-3 bg-white shadow-md rounded-lg p-4">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="flex items-center py-4">
                      <Link
                        href={`/product/${item.id}`}
                        className="flex items-center"
                      >
                        <Image
                          className="w-16 h-16 object-cover rounded-lg"
                          width={64}
                          height={64}
                          src={item.image}
                          alt={item.name}
                        />
                        <span className="ml-4 text-sm font-medium text-gray-700">
                          {item.name}
                        </span>
                      </Link>
                    </td>
                    <td className="p-4 text-right text-sm text-gray-700">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <select
                        className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 font-medium"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-6 bg-white shadow-md rounded-lg">
            <ul>
              <li className="pb-3 text-lg font-medium text-gray-700">
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
                <span className="font-bold">₹{itemsPrice.toFixed(2)}</span>
              </li>
              <li>
                <button
                  onClick={() => router.push("/shipping")}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
