import { data } from "@/utils/data"
import Image from "next/image"

export default function ProductDetailPage({params: {id}}){
    const product = data.products.find((x) => x.id === Number(id))
    if(!product){
        return <div>Product not found2</div>
    }
    return(
        <div className="bg-amber-500 rounded-lg ">
            <div className="">
                <Image 
                 src={product.image}
                 height={600}
                 width={600}
                ></Image>
            </div>
            <h1>{product.name}</h1>
        </div>
    )
}