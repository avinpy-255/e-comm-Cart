import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { loading, cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-amber-400 text-slate-900">
        <Link href="/" className="text-lg font-semibold">
          <h2>Shop Cart</h2>
        </Link>
        <div>
          <span className="absolute font-bold text-amber-800 ml-8 mt-0 text-center w-4">
            {loading ? "" : cartItems.reduce((a, c) => a + c.qty, 0)}
          </span>
          <Link href="/cart">Cart</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
