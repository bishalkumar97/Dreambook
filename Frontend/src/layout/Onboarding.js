import Link from '@/components/Link'
import HeaderRightSection from '@/modules/HeaderRightSection'
import { getUser } from '@/services/firebase-services/cookies'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Onboarding({children}) {
    const router = useRouter()
    const [loggedIn,setLoggedIn] = useState(false)
    useEffect(()=>{
        if(getUser()){
            setLoggedIn(true)
        }
    },[])
  return (
    <div className='flex flex-wrap w-full relative'>
         <div className='w-full absolute bg-[#F4F4F4] top-0 left-0 z-20'>
            <div className='flex flex-wrap justify-between py-5 layout-container' id="home">
                <Link href="/" className=''>
                    <img src="/images/dream-book-logo.png" alt="Dreambook Logo"  className='w-56'/>
                </Link>
                <div className='flex items-center gap-8'>
                    
                    <Link href="/" ><h4 className='text-sm font-medium text-green cursor-pointer flex items-center bg-yellow px-5 py-3 rounded-full'>Login</h4></Link>
                    <div className='flex items-center bg-green px-5 py-3 rounded-full gap-1'>
                    <Link href="/signup" className='text-white text-sm font-medium'>Signup</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full pt-20'>
            {children}
            <img src="/images/curves.svg" alt="curve" className='fixed top-[20%] right-[10%] z-20' />
            <div className='yellow-gradient size-6 rounded-full fixed top-[25%] left-[7%] z-20'></div>
            <div className='red-gradient size-5 rounded-full fixed bottom-[25%] left-[12%] z-20'></div>
            <div className='green-gradient size-11 rounded-full fixed bottom-10 right-[10%] z-20 '></div>
            <img src="/images/shadow.png" alt="curve" className='fixed top-0 left-0 z-10' />
            <img src="/images/login-shadow.png" alt="curve" className='fixed bottom-0 right-0 z-10' />
        </div>
    </div>
  )
}
