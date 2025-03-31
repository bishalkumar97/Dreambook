import Button from '@/components/Button'
import Link from 'next/link'

import React from 'react'

export default function SuggestionCard() {
  return (
    <div className='w-full bg-white shadow-searchbox px-5 py-3 flex flex-wrap justify-center rounded-md'>
      <div className='w-full flex items-center gap-3'>
        <img src="/images/thumbnail.png" className='size-12 rounded-full'/>
        <div>
          <h5 className='text-black font-medium text-base leading-normal'>John Doe</h5>
          <h5 className='text-grey font-normal text-sm'>johndoe@yopmail.com</h5>
        </div>
      </div>
      <Link href="/users/123"><Button variant="normal" className="mt-5">View Profile</Button></Link>
    </div>
  )
}
