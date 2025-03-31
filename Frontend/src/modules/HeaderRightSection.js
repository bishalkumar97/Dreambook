import React, { useEffect, useState } from 'react'
import ProfileModal from './ProfileModal'
import { useRouter } from 'next/router'
import { getUserDetail } from '@/services/APIs/helper'

export default function HeaderRightSection() {

    const [name, setName] = useState("User");
    const [profile, setProfile] = useState(null)
    const router = useRouter();
    
    useEffect(()=>{
        let user = getUserDetail();
        if(user){
            const nn = user.full_name?.split(" ");
            if(nn.length>0){
                setName(nn[0]);
            } 
            setProfile(user.profile_photo);
        }
        else{
            router.push("/");
        }
    },[]);
  return (
    <div className='w-full items-center flex justify-end'>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.0282 16.3031C20.4938 15.3844 19.8563 13.6312 19.8563 10.5V9.83437C19.8563 5.475 16.3595 1.90312 12.0563 1.875H12.0001C10.9668 1.875 9.94367 2.07882 8.98928 2.47481C8.0349 2.8708 7.168 3.45116 6.43823 4.18267C5.70847 4.91417 5.13017 5.78246 4.73646 6.73778C4.34275 7.69311 4.14136 8.71673 4.14383 9.75V10.5C4.14383 13.6312 3.50633 15.3844 2.97195 16.3031C2.80814 16.5887 2.72202 16.9123 2.72217 17.2415C2.72231 17.5708 2.80872 17.8942 2.97279 18.1797C3.13686 18.4651 3.37285 18.7026 3.65727 18.8685C3.94168 19.0343 4.26459 19.1228 4.59383 19.125H7.89383C7.99154 20.1463 8.46638 21.0946 9.22563 21.7847C9.98489 22.4748 10.9741 22.8571 12.0001 22.8571C13.0261 22.8571 14.0153 22.4748 14.7745 21.7847C15.5338 21.0946 16.0086 20.1463 16.1063 19.125H19.4063C19.7356 19.1228 20.0585 19.0343 20.3429 18.8685C20.6273 18.7026 20.8633 18.4651 21.0274 18.1797C21.1914 17.8942 21.2778 17.5708 21.278 17.2415C21.2781 16.9123 21.192 16.5887 21.0282 16.3031ZM12.0001 20.625C11.5683 20.6233 11.1502 20.4734 10.8157 20.2004C10.4812 19.9273 10.2507 19.5477 10.1626 19.125H13.8376C13.7495 19.5477 13.5189 19.9273 13.1845 20.2004C12.85 20.4734 12.4319 20.6233 12.0001 20.625ZM5.21258 16.875C6.1782 14.85 6.39383 12.3281 6.39383 10.5V9.75C6.39012 9.01185 6.53246 8.28027 6.81265 7.59736C7.09285 6.91445 7.50536 6.29372 8.02644 5.77089C8.54752 5.24807 9.16688 4.83348 9.84885 4.55101C10.5308 4.26854 11.2619 4.12375 12.0001 4.125H12.047C15.1126 4.14375 17.6063 6.70312 17.6063 9.83437V10.5C17.6063 12.3281 17.822 14.85 18.7876 16.875H5.21258Z" fill="#228b22"/>
            </svg>
        </button>
        <div className='ml-12 relative flex items-center font-semibold font-sora bg-white px-4 py-2 rounded-lg'>
            {profile?<img className='size-9 rounded-full border-2 border-green shadow object-cover' src={profile} /> : <img className='size-9 rounded-full border-2 border-green shadow object-cover' src="/images/thumbnail.png" />}
            <div className='flex flex-wrap ml-2.5'>
                <span className='w-full text-[13px] text-green font-semibold font-sora'>Hello</span>
                <span className='w-full text-sm text-green font-sora font-bold'>{name}</span>
            </div>

        </div>
    </div>
  )
}
