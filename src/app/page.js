import ProductItem from "@/components/ProductItem";
import { data } from "@/utils/data";


export default function Home() {
  const {products} = data
  return (
   <div className="grid grid-col-2 px-3 py-3 gap-4 md: grid-cols-1 lg:grid-cols-4">
       {products.map((product) => (<ProductItem key={product.id} product={product}/>))}
   </div>
  );
}
