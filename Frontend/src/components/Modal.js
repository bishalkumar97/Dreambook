import React, { Children } from 'react'

export default function Modal({children}) {
  return (
    <div className='w-full h-full fixed top-0 left-0 flex flex-wrap items-center justify-center backdrop-blur-sm bg-[rgba(0,0,0,0.5)]'>
        {children}
    </div>
  )
}
