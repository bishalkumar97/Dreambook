import { cn } from '@/Utilities/cn'
import { cva } from 'class-variance-authority'
import React from 'react'

export default function Input({children,variant, invalidmessage,type, className, ...attributes}) {
    return (
        <>
            <input type={type} {...attributes} className={cn(inputVariants({variant, type, className}))} />
            {/* {invalidmessage && <span className="w-full my-1 hidden peer-invalid:block text-danger text-sm">
                {invalidmessage}
            </span>} */}
        </>
    )
}

const inputVariants = cva("w-full bg-[#F3F3F3] peer focus:outline-none",{
    variants:{
        variant:{
            "dreambook":"font-inter rounded-lg px-3 py-2.5 font-normal text-sm text-black placeholder-shown:text-placeholder"
        },
        type:{
            "email": " invalid:border-danger invalid:border-2 invalid:shadow-md",
            "text": " invalid:border-danger invalid:border-2 invalid:shadow-md",
            "password": " invalid:border-danger invalid:border-2 invalid:shadow-md",
            "number": " invalid:border-danger invalid:border-2 invalid:shadow-md disable-scroller"
        }
    },
    defaultVariants:{
        variant: "dreambook",
        type: "email"
    }
})