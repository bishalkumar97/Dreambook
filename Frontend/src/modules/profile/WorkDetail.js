import React from 'react'
import SingleWork from './SingleWork'

export default function WorkDetail({data}) {
  
  return (
    <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg mt-5'>
      <div className='flex items-center justify-between w-full mb-6'>
        <h4 className='text-black font-sans text-xl font-semibold'>Previous Employment Details</h4>
      </div>
      {data?.map((item,index)=><SingleWork key={index} data={item} classes={`${index != data?.length-1 && 'border-b'}`} />)}
    </div>
  )
}
