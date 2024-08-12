'use client'
import { addToCart } from '@/redux/slices/CartSlice'
import { useRouter } from 'next/navigation'
import React, {useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AddToCart({
    product,
    showQty = true,
    redirect = false,
    increasePerClick = false,
}) {
    const dispatch = useDispatch()

    const{ cartItems } = useSelector((state) => state.cart)
    const router = useRouter()

    const [qty, setQty] = useState(1)

    const addToCartHandler = () => {
        let newQty = qty 
        if (increasePerClick){
            const existItem = cartItems.find((x) => x.id === product.id)
            if (existItem) {
              if (existItem.qty + 1 <= product.countInStock){
                newQty = existItem.qty + 1
              }else {
                return alert("No more product exist")
              }
            }  
        }
        dispatch(addToCart({...product, qty: newQty}))

        if (redirect) 
            router.push('/cart')
       
    }

    return <>
        {product.countInStock > 0 && showQty && (
            <div className='mb-2 flex justify-between'>
                <div>Qty</div>
                <div>
                    <select
                     value={qty}
                     onChange={(e) => setQty(Number(e.target.value))}
                    >
                        {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                    </select>{' '}
                </div>
            </div>
        )}
        <div>
            {product.countInStock > 0 ? (
                <button onClick={addToCartHandler} className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                    Add to Cart
                </button>
            ):(
                <button className='w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded' disabled>
                    Out of Stock
                </button>
            )}
        </div>
    </>
}