"use client";
import { cn } from '@/Utilities/cn'
import { cva } from 'class-variance-authority'
import React, { useState } from 'react'
import Input from './Input'

export default function Password({children,...attributes}) {
    const [show, setShow] = useState(false)
    return (
        <div className='w-full flex flex-wrap relative overflow-hidden'>
            <Input type={show?"text":"password"} {...attributes} />
            <span 
                className='transition-all peer-placeholder-shown:translate-x-12 flex items-center justify-center absolute right-4 top-2'
                role="button" 
                aria-label='Show Password' 
                title="Show Password" 
                onClick={()=> setShow(prev => !prev)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path d="M12.5003 3C17.8924 3 22.3784 6.87976 23.3189 12C22.3784 17.1202 17.8924 21 12.5003 21C7.10812 21 2.62215 17.1202 1.68164 12C2.62215 6.87976 7.10812 3 12.5003 3ZM12.5003 19C16.7359 19 20.3603 16.052 21.2777 12C20.3603 7.94803 16.7359 5 12.5003 5C8.2646 5 4.64022 7.94803 3.72278 12C4.64022 16.052 8.2646 19 12.5003 19ZM12.5003 16.5C10.015 16.5 8.00026 14.4853 8.00026 12C8.00026 9.51472 10.015 7.5 12.5003 7.5C14.9855 7.5 17.0003 9.51472 17.0003 12C17.0003 14.4853 14.9855 16.5 12.5003 16.5ZM12.5003 14.5C13.881 14.5 15.0003 13.3807 15.0003 12C15.0003 10.6193 13.881 9.5 12.5003 9.5C11.1196 9.5 10.0003 10.6193 10.0003 12C10.0003 13.3807 11.1196 14.5 12.5003 14.5Z" fill="#808080"/>
                </svg>
            </span>
        </div>
    )
}
