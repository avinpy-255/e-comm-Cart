import { addToCart, removeFromCart } from "@/redux/slices/CartSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

export default function Sidebar() {
  const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const pathname = usePathname()
  return (
    <div className={
      loading
      ? ''
      : cartItems.length > 0 && 
         (pathname === '/' || pathname.indexOf('/product/') >= 0)
      ? 'fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-amber-950 overflow-scroll'
      : 'hidden'   
    }>
      {loading ? (
        <div className="py-5 px-2">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2">No items in cart</div>
      ) : (
        <>
          <div className="p-4 flex flex-col items-center bg-white shadow-md rounded-lg">
            <div className="w-full text-center mb-4">
              <div className="text-lg font-semibold text-gray-800">
                Subtotal
              </div>
              <div className="font-bold text-orange-600 text-xl">
              ₹{itemsPrice}
              </div>
            </div>

            <div className="w-full mb-4">
              <Link
                href="/cart"
                className="block w-full text-center py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              >
                Go to Cart
              </Link>
            </div>

            <div className="w-full space-y-4 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-4 flex flex-col items-center">
                  <Link
                    href={`/product/${item.id}`}
                    className="w-full flex flex-col items-center mb-4"
                  >
                    <Image
                      className="w-20 h-20 object-cover rounded-lg mb-2"
                      width={80}
                      height={80}
                      src={item.image}
                      alt={item.name}
                    />
                   
                    <div className="text-sm text-gray-500">
                    ₹{item.price} x {item.qty}
                    </div>
                  </Link>

                  <select
                    className="mb-4 border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                  <button
                    className="text-red-500 hover:text-red-700 font-medium"
                    onClick={() => removeFromCartHandler(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
