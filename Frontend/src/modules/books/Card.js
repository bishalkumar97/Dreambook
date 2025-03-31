import Badge from '@/components/Badge'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import React from 'react'

export default function Card({data, variant}) {
  const router = useRouter();
  return (
    <div className='w-full book-grid p-2 bg-white card-shadow rounded-2xl'>
        <div className=''>
            <img src={data.coverImage.url} alt="book-cover" className='rounded-lg h-[144px] object-cover w-full' />
        </div>
        <div className='w-full flex flex-wrap flex-col justify-between'>
          <div>
            <Badge variant={variant} />
            <h2 aria-label="Book Title" className='mt-3 mb-1 w-full flex items-center justify-start font-semibold text-start capitalize text-base'>{data.title}</h2>
            <h4 aria-label="Book Title" className='w-full flex items-center justify-start text-start capitalize text-xs font-normal'>{data.author?.name}</h4>
            {/* <h3 aria-label="Book Price" className='text-[#D8B76A] w-full flex items-center justify-center font-semibold mb-2.5'>₹{data.price}</h3> */}
          </div>
          <Button variant={"primary"} onClick={() => router.push(`books/${data._id}`)}>View</Button>
        </div>
    </div>
  )
}
