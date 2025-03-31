import React, { useState } from 'react'
import Edit from '../../../public/icons/Edit'
import CompanyModal from './CompanyModal'

export default function CompanyDetail({data,refresh}) {
    const [modal,setModal] = useState(false)
    const modalHandler = () => {
        setModal(!modal)
        refresh()
    }
    return (
        <div className='w-full flex flex-wrap items-start bg-white p-5 rounded-lg'>
            {modal && <CompanyModal data={data} handler={modalHandler} />}
            <div className='w-full'>
                <div className='w-full flex items-center justify-between'>
                    <h4 className='text-black font-sans text-xl font-semibold'>Company Details</h4>
                    <div onClick={modalHandler} className='cursor-pointer'>
                        <Edit/>
                    </div>
                </div>
                <div className='w-full flex items-center mt-6'>
                    <h5 className='text-grey font-medium text-sm w-2/6'>Company Name</h5>
                    <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                    <h5 className='text-black font-normal text-sm w-3/6'>{data?.company_name}</h5>
                </div>
                <div className='w-full flex items-center mt-4'>
                    <h5 className='text-grey font-medium text-sm w-2/6'>Registration Number</h5>
                    <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                    <h5 className='text-black font-normal text-sm w-3/6'>{data?.company_registration_number}</h5>
                </div>
            </div>
            {/* <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>ID Number</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.id_number}</h5>
            </div> */}
        </div>
    )
}
