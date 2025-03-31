import React from 'react'

export default function Residential({data}) {
   
    return (
        <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg'>
            <div className='w-full flex items-center justify-between'>
                <h4 className='text-black font-sans text-xl font-semibold'>Residential Details</h4>
               
            </div>
            <div className='w-full flex items-center mt-6'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Street Address</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.street_address ? data?.street_address : "N/A"}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Suburb</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.suburb ? data?.suburb : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>City/Town</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.city ? data?.city : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Province</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.province ? data?.province : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Postal Code</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.postal_code ? data?.postal_code : 'N/A'}</h5>
            </div>
        </div>
    )
}
