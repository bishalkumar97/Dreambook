"use client"
import { cn } from '@/Utilities/cn'
import { cva } from 'class-variance-authority'
import React from 'react'

export default function Option({children, variant, size, color, className,value=null, ...attributes}) {
  return (
    <button role="button" {...attributes} value={value} className={cn(optionVariants({variant,size,color, className}))}>
        {children}
    </button>
  )
}

const optionVariants = cva("gap-3 flex items-center transition-all duration-300",{
    variants:{
        variant:{
            default:"rounded-lg hover:border-primary3 hover:bg-primary3",
            fw: "w-full rounded-lg border border-transparent hover:border-primary hover:bg-primary focus:outline-none focus:border-[#0E867C] focus:bg-[#EAFAF8]"
        },
        size:{
            default: "p-4"
        },
        color:{
            default: "bg-[#F6F6F6]"
        }
    },
    defaultVariants:{
        variant: "default",
        size: "default",
        color: "default"
    }
})