import React from 'react'
import Google from '../../../public/icons/Google'
import Caldender from '../../../public/icons/Caldender'
import dayjs from 'dayjs'

export default function SingleWork({data,classes}) {
    
    return (
        <div className={`w-full py-4 ${classes}`}>
            <div className='w-full flex items-center'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Position Held</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.position_held ? data?.position_held : "N/A"}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>School Name</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.company_name ? data?.company_name : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Duration</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.start_date ? dayjs(data?.start_date).format("DD MMM YYYY") : "N/A"} - {data?.end_date ? dayjs(data?.end_date).format("DD MMM YYYY") : "N/A"}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Reason For Leaving</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.reason_for_leaving ? data?.reason_for_leaving : "N/A"}</h5>
            </div>
        </div>
    )
}
