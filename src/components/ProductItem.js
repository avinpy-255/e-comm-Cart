import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductRate from './ProductRate'
import AddToCart from './AddToCart'

const ProductItem = ({product}) => {
  return (
    <div className="max-w-sm mx-auto mb-5 bg-white rounded-lg shadow-lg hover:shadow-lg transition-shadow duration-300">
    <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
            width={400}
            height={400}
            alt={product.name}
            className="rounded-t-lg w-full"
            style={{ objectFit: 'contain', height: '400px' }}
        />
    </Link>
    <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold text-gray-800 text-center hover:text-blue-500 transition-colors">
            <Link href={`/product/${product.id}`}>
                {product.name}
            </Link>
        </h2>
        <ProductRate rate={product.rating} count={product.reviews} />
        <p className="text-xl text-gray-700 font-medium mt-2">
            ₹{product.price.toFixed(2)}
        </p>
        <p className="text-red-600 font-semibold text-lg mt-2">
            Only {product.countInStock} left in stock
        </p>
        <div className="w-full mt-4">
            <AddToCart 
                showQty={false} 
                product={product} 
                increasePerClick={true} 
                redirect={false} 
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            />
        </div>
    </div>
</div>
  )
}

export default ProductItem