import React, { useState } from 'react'
import Edit from '../../../public/icons/Edit'
import PersonalModal from './PersonalModal'
import dayjs from 'dayjs'

export default function Personal({data,edit,refresh}) {
    const [modal,setModal] = useState(false)
    const modalHandler = () => {
        setModal(!modal)
        refresh()
    }
    return (
        <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg'>
            {modal && <PersonalModal data={data} handler={modalHandler} />}
            <div className='w-full flex items-center justify-between'>
                <h4 className='text-black font-sans text-xl font-semibold'>Personal Details</h4>
                {edit && <div onClick={modalHandler} className='cursor-pointer'>
                    <Edit/>
                </div>}
            </div>
            <div className='w-full flex items-center mt-6'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Name</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data.full_name ? data.full_name : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Email</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6 break-words'>{data?.email ? data?.email : "N/A"}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>Phone Number</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{data?.phone ? data?.phone : "N/A"}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>DOB</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                {edit && <h5 className='text-black font-normal text-sm w-3/6'> {data?.DOB ? dayjs(data?.DOB).format("DD MMM YYYY") : "N/A"}</h5>}
                {!edit && <h5 className='text-black font-normal text-sm w-3/6'> {data?.profile?.DOB ? dayjs(data?.profile?.DOB).format("DD MMM YYYY") : "N/A"}</h5>}
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-2/6'>ID/Passport Number</h5>
                <h5 className='text-grey font-medium text-sm w-1/6'>:</h5>
                <h5 className='text-black font-normal text-sm w-3/6'>{edit ?  data?.id_passport_number ? data?.id_passport_number : 'N/A'  : data?.profile?.ID_number ? data?.profile?.ID_number : 'N/A'}</h5>
            </div>
        </div>
    )
}
