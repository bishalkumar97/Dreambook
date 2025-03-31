import Badge from '@/components/Badge'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import React from 'react'

export default function SmallCard({variant, name, description, url}) {
  const router = useRouter();
  return (
    <div className='w-full flex flex-wrap justify-center p-5 bg-white card-shadow rounded-2xl relative z-20'>
        {variant && <span className={`absolute top-0 right-0 bg-[#009989] px-2.5 py-1 text-xs font-medium rounded-tr-[10px] rounded-bl-[10px] text-white z-30`}>Active</span>}
        {!variant && <span className={`absolute top-0 right-0 bg-[#A04A4A] px-2.5 py-1 text-xs font-medium rounded-tr-[10px] rounded-bl-[10px] text-white z-30`}>Suspended</span>}

        <div className='mt-2.5 w-full flex flex-wrap items-center'>
            <h2 aria-label="Card Title" className='w-full flex items-center justify-center font-semibold text-center'>{name}</h2>
            <h3 aria-label="Card Sub-title" title={description} className='text-[#2A2B2A] w-full flex items-start justify-center mb-2.5 text-xs font-normal text-center truncate'>
                {description}
            </h3>
            <Button variant={"primary"} onClick={() => router.push(url)}>View</Button>
        </div>
    </div>
  )
}
