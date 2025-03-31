import { cn } from '@/Utilities/cn'
import React from 'react'

export default function Divider({children, className}) {
  return (
    <div className={cn("flex items-center justify-center border-dashed border-t-2 border-neutral3 w-full",className)}>
        <span className='text-xs uppercase w-fit font-semibold text-neutral4 relative bottom-2 bg-white px-3'>OR</span>
    </div>
  )
}
