import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Onboarding from '@/layout/Onboarding'
import Input from '@/components/Input'
import Button from '@/components/Button'
import useFirebaseAuth from '@/services/firebase-services/useFirebaseAuth'
import { verifyEmail } from '@/Utilities/helpers'
import SocialFooter from '@/modules/SocialFooter'
export default function ForgotPassword() {
    const router = useRouter()
    const { forgotPassword } = useFirebaseAuth()
    const [loading, setLoading] = useState(false)
    
    const handler = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        if(verifyEmail(formData.get("email"))){
            setLoading(true)
            const res = await forgotPassword(formData.get("email"))
            setLoading(false)
            // router.push("/")
        }        
    }
    return (
        <div className='bg-landing w-full min-h-screen h-full flex flex-wrap flex-col items-center justify-between relative'>
            <div className='absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.08)] z-0'></div>
            <span className='w-full h-5'></span>
            <div className='w-full flex justify-center items-center relative z-50'>
                <form onSubmit={handler} className='bg-[#fdfcff] rounded-lg w-full flex flex-wrap justify-center max-w-[500px] p-7'>
                    <img src="/images/dream-book-logo.png" />
                    <div className="flex flex-wrap mt-10 w-full">
                        <label className="w-full text-sm text-inputLabel font-medium mb-1">Email</label>
                        <Input type="email" placeholder="Enter email" name={"email"} invalidmessage="Please enter a valid email." />
                    </div>
                    
                    <Button type="submit" variant="primary" loading={loading} className="mb-4 mt-6">Send Instructions </Button>
                    <Link href="/" className='w-fit flex justify-center text-grey text-sm font-semibold hover:underline'>Login</Link>
                </form>
            </div>
            <div className='max-w-[800px] w-full z-10'>
                <SocialFooter />
            </div>
        </div>
    )
}
