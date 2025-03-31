import React from 'react'
import Envelop from '../../public/icons/Envelop'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import Onboarding from '@/layout/Onboarding'

export default function Verified() {
  const router = useRouter()
  return (
    <Onboarding>
        <div className='flex flex-wrap items-center mb-10'>
            <div className='modal-container w-full flex flex-wrap items-center justify-center bg-white rounded-xl'>
                <img src="/images/verified.svg" alt="Image for successfull verificaition" />
                
                <h1 className="text-3xl capitalize font-jakarta w-full text-center font-bold text-neutral-1000">Verified!</h1>
                <h3 className='mt-4 mb-6 text-base text-neutral4 w-full font-inter font-semibold text-center text-neutral-900'>
                    You Successfully completed your registration process, Book your favorite events with Afro Reservation now!
                </h3>
                <Button variant="primary" onClick={() => router.push("/")}> Login </Button>
            </div>
        </div>
    </Onboarding>
  )
}

