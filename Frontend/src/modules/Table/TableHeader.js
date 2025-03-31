import React from 'react'

export default function TableHeader({children, cols}) {
  return (
    <thead className={`w-full  bg-[#FAFAFA]`}>
        <tr className={`px-6 py-3.5 grid lg:grid-cols-${cols}`}>
            {children}
        </tr>
    </thead>
  )
}
