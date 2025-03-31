import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import Envelop from '../../public/icons/Envelop'
import Onboarding from '@/layout/Onboarding'
import CountdownTimer from '@/components/Counter'
import useFirebaseAuth from '@/services/firebase-services/useFirebaseAuth'
import { auth } from '@/services/firebase-services/firebase'

export default function Verify() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const {resendEmailVerificationLink} = useFirebaseAuth();
  const resendHandler = async (e) => {
    e.preventDefault();
    if(startTimer){
      setLoading(true);
      const res = await resendEmailVerificationLink();
      if(res.status){
        setStartTimer(true);
      }
      setLoading(false);
    }
  }
  const timerHandler = () => {
    setStartTimer(false);
  }
  useEffect(()=>{
    const interval = setInterval(()=>{
      auth && auth.currentUser && auth.currentUser.reload().then(()=>{
        if(auth.currentUser.emailVerified){
          setEmailVerified(true);
        }
      }).catch(error => {
        console.log(error);
      })
    },3000);

    return () => clearInterval(interval);
  },[])
  return (
    <Onboarding>

      <div className='w-full flex justify-center items-center'>
        <div className='mt-12 bg-white rounded-lg py-8 w-1/3 px-10 flex justify-center flex-wrap'>
          <span className='border border-green-light rounded-full bg-white flex items-center justify-center mb-4' style={{height:"60px", width:"60px"}}>
            <Envelop />
          </span>
          <h1 className="text-3xl font-semibold font-sans w-full text-center">{!emailVerified? `Check you email`:`Email Verified Successfully!`}</h1>
          <h3 className='mt-4 mb-6 text-sm text-grey w-full font-inter font-normal text-center'>
            {!emailVerified?`We have sent a verification link to your email. Please click on the link and come back to the platform.`:`Thank you for verifying your email! To keep your account secure, please log in again to continue.`}
          </h3>
          {!emailVerified?<Button variant={(!loading && startTimer)?"disable-green":"green"} loading={loading} onClick={resendHandler}>
            {loading && "Processing..."}
            {!loading && !startTimer &&"Resend Link"}
            {!loading && startTimer && <CountdownTimer interval={60} className={"text-sm ml-0"} handler={timerHandler} />}
          </Button>:
          <Button variant={"green"} onClick={()=> router.push("/")}>
            Go to Login
          </Button>}
          {!emailVerified && <div className='my-4 w-full flex items-center justify-center'>
            <span className='text-sm font-semibold text-black'>Already Verify?</span>
            <span role='button' className='text-green text-sm font-semibold ml-1 hover:underline' onClick={()=>router.push("/")}>Go to login</span>
          </div>}
        </div>
      </div>
    </Onboarding>
  )
}
