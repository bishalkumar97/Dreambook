import { cn } from '@/Utilities/cn'
import HeaderRightSection from '@/modules/HeaderRightSection';
import Navbar from '@/modules/Navbar'
import ProfileModal from '@/modules/ProfileModal';
import SocialFooter from '@/modules/SocialFooter';
import { getUserDetail } from '@/services/APIs/helper';
import { getUser } from '@/services/firebase-services/cookies';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

export default function Layout({ children, className, role }) {
  return (
    <>
      <div className={cn('wrapper flex flex-wrap items-start', className)}>
        <Navbar role={role} />
        <div className='w-full flex flex-wrap items-start h-full relative bg-gray-100'>
          {/* <div className='w-full h-full absolute top-0 left-0 bg-landing opacity-40'></div> */}
          <div className='w-full mt-8 px-8'>
            {children}
            <SocialFooter />
          </div>
        </div>
      </div>
    </>
  )
}