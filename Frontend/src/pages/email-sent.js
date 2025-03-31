import React from 'react'
import Envelop from '../../public/icons/Envelop'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import Onboarding from '@/layout/Onboarding'

export default function Emailsent() {
  const router = useRouter()
  return (
    <Onboarding>
      <div className='w-full flex justify-center items-center'>
        <div className='mt-12 bg-white rounded-lg py-8 w-4/12 px-10 flex justify-center flex-wrap'>
          <span className='border border-green-light rounded-full bg-white flex items-center justify-center mb-4' style={{height:"60px", width:"60px"}}>
              <Envelop />
          </span>
          <h1 className="text-3xl font-semibold font-sans w-full text-center">Check your mail</h1>
          <h3 className='mt-4 mb-6 text-sm text-grey w-full font-inter font-normal text-center'>We have send a password recovery instructions to your email.</h3>
          <Button variant="primary" onClick={() => router.push("/")}> Go To Login</Button>
        </div>
      </div>
    </Onboarding>
  )
}

