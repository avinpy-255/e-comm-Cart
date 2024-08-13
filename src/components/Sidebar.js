import { addToCart,  removeFromCart } from "@/redux/slices/CartSlice"
import Image from "next/image"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"

export default function Sidebar(){
    const { loading, cartItems, itemsPrice } = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    const removeFromCartHandler = (id) => {
        dispatch( removeFromCart(id))
    }
    return (
        
        <div className="fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-amber-700 overflow-scroll">
            {loading ? (
                
                <div className="py-5 px-2">Loading...</div>
            ) : cartItems.length === 0 ? (
                <div className="py-5 px-2">No items in cart</div>
            ): (
                <>
                   
                    <div className="p-2 flex flex-col items-center border-b border-b-gray-700">
                         <div>Subtotal</div>
                         <div className="font-bold text-orange-700">{itemsPrice}</div>
                         <div>
                            <Link
                            href='/cart'
                            className="w-full text-center p-1 rounded-2xl border-2"
                            >
                                Go To Cart
                            </Link>
                         </div>
                         {cartItems.map((item) => (
                            <div key={item.id} className="py-2 px-2 border-b border-b-gray-700">
                               <Link href={`/product/${item.id}`}>
                                    <p className="flex items-center">
                                        <Image className="p-1" width={50} height={50} src={item.image} alt={item.name}></Image>
                                        <div className="ml-4">
                                            <div>{item.name}</div>
                                            <div className="text-sm text-gray-600">{item.price} x {item.quantity}</div>
                                        </div>
                                    </p>
                               </Link>
                               <select value={item.qty}
                               onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                               {[...Array(item.countInStock).keys()].map ((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                               ))}
                               </select>
                               <button onClick={() => removeFromCartHandler(item.id)}>Remove</button>
                            </div>
                         ))}
                    </div>
                   
                </>
            )
            }
           
        </div>
    )
}