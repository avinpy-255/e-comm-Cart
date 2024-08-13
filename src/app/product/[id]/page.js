import AddToCart from "@/components/AddToCart"
import ProductRate from "@/components/ProductRate"
import { data } from "@/utils/data"
import Image from "next/image"
import Link from "next/link"

export default function ProductDetailPage({params: {id}}){
    const product = data.products.find((x) => x.id === Number(id))
    if(!product){
        return <div>Product not found2</div>
    }
    return(
        <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
            <Link href='/' className="text-blue-500 hover:text-blue-700 font-semibold">
                ← Back to products
            </Link>
        </div>
    
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={640}
                    height={640}
                    sizes="100vw"
                    className="rounded-lg shadow-lg object-cover w-full"
                />
            </div>
            <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    <ProductRate rate={product.rating} count={product.reviews} className="mb-4"/>
                    <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                  <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <div className="mb-4 flex justify-between items-center text-lg font-semibold text-gray-700">
                            <span>Price</span>
                            <span className="text-3xl text-gray-900">₹{product.price}</span>
                        </div>
                          <p className='text-red-800 font-semibold text-xl mb-2 mt-2' >only {product.countInStock} items left</p>
                        <AddToCart product={product} redirect={true} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}