'use client'

import '@smastrom/react-rating/style.css'
import { Rating} from '@smastrom/react-rating'

export default function ProductRate({ rate, count }) {
    return(
    <div className='flex mt-1 px-1 py-2 '>
               <Rating
            style={{maxWidth:158}} value={rate} readOnly
        /><p className='px-1 py-1 text-md font-semibold'> {count} reviews</p> 
    </div>
    )
}
