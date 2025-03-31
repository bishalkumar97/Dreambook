import React, { useRef, useState } from 'react'
import ReportUser from './ReportUser'
// import { reportUser } from '@/services/APIs/user'

export default function Popuplist({children, user, handler}) {
    const ref = useRef(null)
    const modalHandler = () => {
        if(ref.current){
            ref.current.classList.toggle("hidden")
        }
    }
    
    return (
        <div className='size-10 relative'>
            <button className='w-full flex items-center rounded-full justify-center cursor-pointer' onClick={modalHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="black"/>
                </svg>
            </button>

            <div ref={ref}className='bg-white absolute w-[180px] rounded-lg top-7 right-0 border hidden'>
                {children}
            </div>
            {/* {report && <ReportUser cancelHandler={setReport} successHandler={reportUserHandler} loading={loading} />} */}
        </div>
    )
}
