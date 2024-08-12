import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductRate from './ProductRate'
import AddToCart from './AddToCart'

const ProductItem = ({product}) => {
  return (
    <div className='mb-2 block  border border-yellow-400 shadow-md'>
        <Link href={`/products/${product.id}`}>
            <Image
                src={product.image}
                width={400}
                height={400}
                alt={product.name}
                className='rounded-sm shadow object-cover h-50 w-full'
            />
        </Link>
        <div className='flex flex-col items-center justify-center p-5 bg-yellow-500' >
            <h2 className='text-2xl font-bold font-sans antialiased  text-gray-800'>
                <Link href={`/products/${product.id}`}>
                    {product.name}
                </Link>
            </h2>
            <ProductRate rate={product.rating} count={product.reviews}/>
            <p className='text-slate-800 text-2xl font-medium'>
                ₹{product.price.toFixed(2)}
            </p>
            <AddToCart showQty={false} product={product} increasePerClick={true} redirect={false}/>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductItem