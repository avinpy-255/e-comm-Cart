import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { loading, cartItems } = useSelector((state) => state.cart);
  const pathname = usePathname()
  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-slate-200 text-slate-900 ">
        <Link href="/" className="text-lg font-semibold">
          <h2 className="text-2xl font-bold  italic ">Shop Cart</h2>
        </Link>
        <div>
        
          <Link href="/cart" className="text-3xl">🛒</Link>
          {!loading && cartItems.length > 0 && pathname !== '/cart' && (
            <Link href="/cart" className="text-2xl font-semibold text-blue-600 hover:underline">
             ({cartItems.reduce((a, c) => a + c.qty, 0)})
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
