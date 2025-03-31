import React from 'react'
import User from '../../public/icons/User'
import Billing from '../../public/icons/Billing'
import Favorites from '../../public/icons/Favorites'
import Link from 'next/link'
import Pricing from '../../public/icons/Pricing'

export default function ProfileModal(props) {
  return (
    <div className='bg-white rounded-lg absolute right-0 top-12 px-4 shadow-searchbox py-4'>
        <Link href="/profile" onClick={props.handler} className='flex gap-2 items-center cursor-pointer'>
            <User/>
            <h5 className='text-black font-normal text-sm'>Profile</h5>
        </Link>
        {/* <Link href="/favorite-jobs"  onClick={props.handler} className='flex gap-2 items-center mt-4 cursor-pointer'>
            <Favorites/>
            <h5 className='text-black font-normal text-sm'>Favorites</h5>
        </Link>
        <Link href="/pricing" onClick={props.handler} className='flex gap-2 items-center mt-4 cursor-pointer'>
            <Pricing/>
            <h5 className='text-black font-normal text-sm'>Plans</h5>
        </Link>
        <Link href="/billing" onClick={props.handler} className='flex gap-2 items-center mt-4 cursor-pointer'>
            <Billing/>
            <h5 className='text-black font-normal text-sm'>Billing</h5>
        </Link> */}
    </div>
  )
}
