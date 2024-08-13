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
        <div>
            <div className="py-2">
                <Link href='/'> Back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
              <div className="md:col-span-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={640}
                  sizes="100vw"
                  style={{
                    width:'100%',
                    height: 'auto',
                  }}
                />
              </div>
              <div>
                <ul>
                    <li>
                        <h1 className="text-3xl">{product.name}</h1>
                    </li>
                    <li>
                        <ProductRate rate={product.rating} count={product.reviews}/>
                    </li>
                    <li>
                        <p className='text-lg'>{product.description}</p>
                    </li>
                </ul>
              </div>
              <div>
                <div className="card p-5">
                <div className="mb-2 flex justify-between">
                    <div>Price</div>
                    <div>{product.price}</div>
                </div>
                
                  <AddToCart product={product} redirect={true}/>
                </div>
              </div>
            </div>
        </div>
    )
}