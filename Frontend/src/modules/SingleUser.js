import Link from '@/components/Link'
import React from 'react'

export default function SingleUser({data}) {
  return (
    <div className='w-full flex items-center justify-between border-b border-border-nput px-5 py-3 bg-white'>
      <h6 className='text-sm font-normal text-grey w-2/12'>{data?.full_name}</h6>
      {/* <h6 className='text-sm font-normal text-grey w-1/6 text-center'>{data?.id}</h6> */}
      <h6 className='text-sm font-normal text-grey w-3/12 break-words'>{data?.email}</h6>
      <h6 className='text-sm font-normal text-grey w-2/12'>{data?.phone}</h6>
      <h6 className='text-sm font-normal text-grey w-2/12 text-center capitalize'>{data?.job_category ? data?.job_category : "N/A"}</h6>
      <div className="w-2/12 flex items-center justify-center">
        {data?.is_verify == '0' && data?.is_block < 3 && <h6 className='text-sm font-normal bg-yellow px-2 py-1 rounded-md text-black w-fit text-center'>Pending</h6>}
        {data?.is_verify == '1' && data?.is_block == '1' && <h6 className='text-sm font-normal bg-green px-2 py-1 rounded-md text-white w-fit text-center'>Verified</h6>}
        {data?.is_verify == '1' && data?.is_block == '2' && <h6 className='text-sm font-normal bg-danger px-2 py-1 rounded-md text-white w-fit text-center'>Blocked</h6>}
        {data?.is_verify == '1' && data?.is_block == '0' && <h6 className='text-sm font-normal bg-green px-2 py-1 rounded-md text-white w-fit text-center'>Verified</h6>}

        {data?.is_verify == '2' && data?.is_block < 3 && <h6 className='text-sm font-normal bg-danger px-2 py-1 rounded-md text-white w-fit text-center'>Rejected</h6>}
      </div>
      <Link href={`/seekers/${data?.id}`} className='text-sm font-normal text-grey w-1/12 text-center'>View</Link>
    </div>
  )
}
