import Button from '@/components/Button'
import Layout from '@/layout/Layout'
import Eventcard from '@/modules/Eventcard'
import JobCard from '@/modules/JobCard'
import { useRouter } from 'next/router'
import cookie from 'cookie';
import { useEffect, useState } from 'react'
import { getAllJobs } from '@/services/APIs/author'
import { getUserDetail } from '@/services/APIs/helper'
import AccountStatus from '@/modules/AccountStatus'
import Loader from '@/modules/Loader'
import { getProfile } from '@/services/APIs/onBoarding'
import { setUser } from '@/services/firebase-services/cookies'
import Table from '@/modules/Table'
import Image from 'next/image'
import { IndianRupee } from 'lucide-react'

export default function Index({role}) {
  console.log(role)
  const [data,setData] = useState([])
  const [user,setUserDetail] = useState(null)
  const [loading,setLoading] = useState(false)
  const dataSetter = async () => {
    setLoading(true)
    const resposne = await getAllJobs()
    if(resposne?.status){
      setData(resposne.data)
      setLoading(false)
    }else{
      setLoading(false)
    }
  }
  const refreshStatus = async () => {
    setLoading(true)
    const response = await getProfile()
    if(response.status){
      // setToken(res.token, res.expiryTime);
      setUser(response.data);
      setUserDetail(response.data)
      setLoading(false);
    }else{
      setLoading(false);
    }
  }

  const router = useRouter();
  useEffect(()=>{
    // setUserDetail(getUserDetail());
    // dataSetter()
  },[])
  
  return (
    <Layout role={role}>
      <div className='w-full flex flex-wrap items-center justify-between'>
        <h1 className='text-black-4 text-2xl font-semibold'>Dashboard</h1>
        {/* <Button variant="primary" className="w-2/12" onClick={() => router.push("/manage-jobs/create")}>Post Vacancy</Button> */}
      </div>
      
      {loading && <Loader/>}
      <div className={`w-full grid grid-cols-${role=="author"?3:5} gap-4 mt-8`}>
        {role!="author" && <div className='w-full flex flex-wrap p-4 bg-[#EFFFE2] rounded-[10px]'>
          <div className='w-full flex gap-2 items-center'>
            <span className='bg-[#C0FD8E] p-1.5 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 2.8125C12.4173 2.8125 15.1875 5.58274 15.1875 9C15.1875 12.4173 12.4173 15.1875 9 15.1875C5.58274 15.1875 2.8125 12.4173 2.8125 9V7.87541C2.8125 7.56475 2.56066 7.3125 2.25 7.3125C1.93934 7.3125 1.6875 7.56434 1.6875 7.875V9C1.6875 13.0386 4.96142 16.3125 9 16.3125C13.0386 16.3125 16.3125 13.0386 16.3125 9C16.3125 4.96142 13.0386 1.6875 9 1.6875L7.87554 1.6875L7.87501 2.8125L9 2.8125ZM7.3125 2.25C7.3125 2.56066 7.56435 2.8125 7.87501 2.8125L7.87554 1.6875C7.56488 1.6875 7.3125 1.93934 7.3125 2.25Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 4.5C1.93934 4.5 1.6875 4.75184 1.6875 5.0625C1.6875 5.37316 1.93934 5.625 2.25 5.625H5.0625C5.37316 5.625 5.625 5.37316 5.625 5.0625V2.25C5.625 1.93934 5.37316 1.6875 5.0625 1.6875C4.75184 1.6875 4.5 1.93934 4.5 2.25V3.7045L2.64775 1.85225C2.42808 1.63258 2.07192 1.63258 1.85225 1.85225C1.63258 2.07192 1.63258 2.42808 1.85225 2.64775L3.7045 4.5H2.25Z" fill="black"/>
                <path d="M9 4.5C9.31066 4.5 9.5625 4.75184 9.5625 5.0625V5.625H10.6875C10.9982 5.625 11.25 5.87684 11.25 6.1875C11.25 6.49816 10.9982 6.75 10.6875 6.75H8.15625C7.93247 6.75 7.71786 6.83889 7.55963 6.99713C7.40139 7.15536 7.3125 7.36997 7.3125 7.59375C7.3125 7.81753 7.40139 8.03214 7.55963 8.19037C7.71786 8.34861 7.93247 8.4375 8.15625 8.4375H9.84375C10.3659 8.4375 10.8667 8.64492 11.2359 9.01413C11.6051 9.38335 11.8125 9.8841 11.8125 10.4062C11.8125 10.9284 11.6051 11.4292 11.2359 11.7984C10.8667 12.1676 10.3659 12.375 9.84375 12.375H9.5625V12.9375C9.5625 13.2482 9.31066 13.5 9 13.5C8.68934 13.5 8.4375 13.2482 8.4375 12.9375V12.375H7.3125C7.00184 12.375 6.75 12.1232 6.75 11.8125C6.75 11.5018 7.00184 11.25 7.3125 11.25H9.84375C10.0675 11.25 10.2821 11.1611 10.4404 11.0029C10.5986 10.8446 10.6875 10.63 10.6875 10.4062C10.6875 10.1825 10.5986 9.96786 10.4404 9.80963C10.2821 9.65139 10.0675 9.5625 9.84375 9.5625H8.15625C7.63411 9.5625 7.13335 9.35508 6.76413 8.98587C6.39492 8.61665 6.1875 8.1159 6.1875 7.59375C6.1875 7.0716 6.39492 6.57085 6.76413 6.20163C7.13335 5.83242 7.63411 5.625 8.15625 5.625H8.4375V5.0625C8.4375 4.75184 8.68934 4.5 9 4.5Z" fill="black"/>
              </svg>
            </span>
            <span className='font-semibold text-black'>Platform Earnings</span>
          </div>
          <div className='w-full mt-4'>
            <span className='text-2xl font-bold'>₹4,360</span>
          </div>
        </div>}
        <div className='w-full flex flex-wrap p-4 bg-[#FFE8E2] rounded-[10px]'>
          <div className='w-full flex gap-2 items-center'>
            <span className='bg-[#FA5A7D] p-1.5 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 2.8125C12.4173 2.8125 15.1875 5.58274 15.1875 9C15.1875 12.4173 12.4173 15.1875 9 15.1875C5.58274 15.1875 2.8125 12.4173 2.8125 9V7.87541C2.8125 7.56475 2.56066 7.3125 2.25 7.3125C1.93934 7.3125 1.6875 7.56434 1.6875 7.875V9C1.6875 13.0386 4.96142 16.3125 9 16.3125C13.0386 16.3125 16.3125 13.0386 16.3125 9C16.3125 4.96142 13.0386 1.6875 9 1.6875L7.87554 1.6875L7.87501 2.8125L9 2.8125ZM7.3125 2.25C7.3125 2.56066 7.56435 2.8125 7.87501 2.8125L7.87554 1.6875C7.56488 1.6875 7.3125 1.93934 7.3125 2.25Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 4.5C1.93934 4.5 1.6875 4.75184 1.6875 5.0625C1.6875 5.37316 1.93934 5.625 2.25 5.625H5.0625C5.37316 5.625 5.625 5.37316 5.625 5.0625V2.25C5.625 1.93934 5.37316 1.6875 5.0625 1.6875C4.75184 1.6875 4.5 1.93934 4.5 2.25V3.7045L2.64775 1.85225C2.42808 1.63258 2.07192 1.63258 1.85225 1.85225C1.63258 2.07192 1.63258 2.42808 1.85225 2.64775L3.7045 4.5H2.25Z" fill="white"/>
                <path d="M9 4.5C9.31066 4.5 9.5625 4.75184 9.5625 5.0625V5.625H10.6875C10.9982 5.625 11.25 5.87684 11.25 6.1875C11.25 6.49816 10.9982 6.75 10.6875 6.75H8.15625C7.93247 6.75 7.71786 6.83889 7.55963 6.99713C7.40139 7.15536 7.3125 7.36997 7.3125 7.59375C7.3125 7.81753 7.40139 8.03214 7.55963 8.19037C7.71786 8.34861 7.93247 8.4375 8.15625 8.4375H9.84375C10.3659 8.4375 10.8667 8.64492 11.2359 9.01413C11.6051 9.38335 11.8125 9.8841 11.8125 10.4062C11.8125 10.9284 11.6051 11.4292 11.2359 11.7984C10.8667 12.1676 10.3659 12.375 9.84375 12.375H9.5625V12.9375C9.5625 13.2482 9.31066 13.5 9 13.5C8.68934 13.5 8.4375 13.2482 8.4375 12.9375V12.375H7.3125C7.00184 12.375 6.75 12.1232 6.75 11.8125C6.75 11.5018 7.00184 11.25 7.3125 11.25H9.84375C10.0675 11.25 10.2821 11.1611 10.4404 11.0029C10.5986 10.8446 10.6875 10.63 10.6875 10.4062C10.6875 10.1825 10.5986 9.96786 10.4404 9.80963C10.2821 9.65139 10.0675 9.5625 9.84375 9.5625H8.15625C7.63411 9.5625 7.13335 9.35508 6.76413 8.98587C6.39492 8.61665 6.1875 8.1159 6.1875 7.59375C6.1875 7.0716 6.39492 6.57085 6.76413 6.20163C7.13335 5.83242 7.63411 5.625 8.15625 5.625H8.4375V5.0625C8.4375 4.75184 8.68934 4.5 9 4.5Z" fill="white"/>
              </svg>
            </span>
            <span className='font-semibold text-black'>Total Royalty</span>
          </div>
          <div className='w-full mt-4'>
            <span className='text-2xl font-bold'>₹4,360</span>
          </div>
        </div>
        <div className='w-full flex flex-wrap p-4 bg-[#FFE5F9] rounded-[10px]'>
          <div className='w-full flex gap-2 items-center'>
            <span className='bg-[#FE7AE1] p-1.5 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 2.8125C12.4173 2.8125 15.1875 5.58274 15.1875 9C15.1875 12.4173 12.4173 15.1875 9 15.1875C5.58274 15.1875 2.8125 12.4173 2.8125 9V7.87541C2.8125 7.56475 2.56066 7.3125 2.25 7.3125C1.93934 7.3125 1.6875 7.56434 1.6875 7.875V9C1.6875 13.0386 4.96142 16.3125 9 16.3125C13.0386 16.3125 16.3125 13.0386 16.3125 9C16.3125 4.96142 13.0386 1.6875 9 1.6875L7.87554 1.6875L7.87501 2.8125L9 2.8125ZM7.3125 2.25C7.3125 2.56066 7.56435 2.8125 7.87501 2.8125L7.87554 1.6875C7.56488 1.6875 7.3125 1.93934 7.3125 2.25Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 4.5C1.93934 4.5 1.6875 4.75184 1.6875 5.0625C1.6875 5.37316 1.93934 5.625 2.25 5.625H5.0625C5.37316 5.625 5.625 5.37316 5.625 5.0625V2.25C5.625 1.93934 5.37316 1.6875 5.0625 1.6875C4.75184 1.6875 4.5 1.93934 4.5 2.25V3.7045L2.64775 1.85225C2.42808 1.63258 2.07192 1.63258 1.85225 1.85225C1.63258 2.07192 1.63258 2.42808 1.85225 2.64775L3.7045 4.5H2.25Z" fill="white"/>
                <path d="M9 4.5C9.31066 4.5 9.5625 4.75184 9.5625 5.0625V5.625H10.6875C10.9982 5.625 11.25 5.87684 11.25 6.1875C11.25 6.49816 10.9982 6.75 10.6875 6.75H8.15625C7.93247 6.75 7.71786 6.83889 7.55963 6.99713C7.40139 7.15536 7.3125 7.36997 7.3125 7.59375C7.3125 7.81753 7.40139 8.03214 7.55963 8.19037C7.71786 8.34861 7.93247 8.4375 8.15625 8.4375H9.84375C10.3659 8.4375 10.8667 8.64492 11.2359 9.01413C11.6051 9.38335 11.8125 9.8841 11.8125 10.4062C11.8125 10.9284 11.6051 11.4292 11.2359 11.7984C10.8667 12.1676 10.3659 12.375 9.84375 12.375H9.5625V12.9375C9.5625 13.2482 9.31066 13.5 9 13.5C8.68934 13.5 8.4375 13.2482 8.4375 12.9375V12.375H7.3125C7.00184 12.375 6.75 12.1232 6.75 11.8125C6.75 11.5018 7.00184 11.25 7.3125 11.25H9.84375C10.0675 11.25 10.2821 11.1611 10.4404 11.0029C10.5986 10.8446 10.6875 10.63 10.6875 10.4062C10.6875 10.1825 10.5986 9.96786 10.4404 9.80963C10.2821 9.65139 10.0675 9.5625 9.84375 9.5625H8.15625C7.63411 9.5625 7.13335 9.35508 6.76413 8.98587C6.39492 8.61665 6.1875 8.1159 6.1875 7.59375C6.1875 7.0716 6.39492 6.57085 6.76413 6.20163C7.13335 5.83242 7.63411 5.625 8.15625 5.625H8.4375V5.0625C8.4375 4.75184 8.68934 4.5 9 4.5Z" fill="white"/>
              </svg>
            </span>
            <span className='font-semibold text-black'>Total Books</span>
          </div>
          <div className='w-full mt-4'>
            <span className='text-2xl font-bold'>300</span>
          </div>
        </div>
        <div className='w-full flex flex-wrap p-4 bg-[#E5E6FF] rounded-[10px]'>
          <div className='w-full flex gap-2 items-center'>
            <span className='bg-[#5D60EF] p-1.5 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 2.8125C12.4173 2.8125 15.1875 5.58274 15.1875 9C15.1875 12.4173 12.4173 15.1875 9 15.1875C5.58274 15.1875 2.8125 12.4173 2.8125 9V7.87541C2.8125 7.56475 2.56066 7.3125 2.25 7.3125C1.93934 7.3125 1.6875 7.56434 1.6875 7.875V9C1.6875 13.0386 4.96142 16.3125 9 16.3125C13.0386 16.3125 16.3125 13.0386 16.3125 9C16.3125 4.96142 13.0386 1.6875 9 1.6875L7.87554 1.6875L7.87501 2.8125L9 2.8125ZM7.3125 2.25C7.3125 2.56066 7.56435 2.8125 7.87501 2.8125L7.87554 1.6875C7.56488 1.6875 7.3125 1.93934 7.3125 2.25Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 4.5C1.93934 4.5 1.6875 4.75184 1.6875 5.0625C1.6875 5.37316 1.93934 5.625 2.25 5.625H5.0625C5.37316 5.625 5.625 5.37316 5.625 5.0625V2.25C5.625 1.93934 5.37316 1.6875 5.0625 1.6875C4.75184 1.6875 4.5 1.93934 4.5 2.25V3.7045L2.64775 1.85225C2.42808 1.63258 2.07192 1.63258 1.85225 1.85225C1.63258 2.07192 1.63258 2.42808 1.85225 2.64775L3.7045 4.5H2.25Z" fill="white"/>
                <path d="M9 4.5C9.31066 4.5 9.5625 4.75184 9.5625 5.0625V5.625H10.6875C10.9982 5.625 11.25 5.87684 11.25 6.1875C11.25 6.49816 10.9982 6.75 10.6875 6.75H8.15625C7.93247 6.75 7.71786 6.83889 7.55963 6.99713C7.40139 7.15536 7.3125 7.36997 7.3125 7.59375C7.3125 7.81753 7.40139 8.03214 7.55963 8.19037C7.71786 8.34861 7.93247 8.4375 8.15625 8.4375H9.84375C10.3659 8.4375 10.8667 8.64492 11.2359 9.01413C11.6051 9.38335 11.8125 9.8841 11.8125 10.4062C11.8125 10.9284 11.6051 11.4292 11.2359 11.7984C10.8667 12.1676 10.3659 12.375 9.84375 12.375H9.5625V12.9375C9.5625 13.2482 9.31066 13.5 9 13.5C8.68934 13.5 8.4375 13.2482 8.4375 12.9375V12.375H7.3125C7.00184 12.375 6.75 12.1232 6.75 11.8125C6.75 11.5018 7.00184 11.25 7.3125 11.25H9.84375C10.0675 11.25 10.2821 11.1611 10.4404 11.0029C10.5986 10.8446 10.6875 10.63 10.6875 10.4062C10.6875 10.1825 10.5986 9.96786 10.4404 9.80963C10.2821 9.65139 10.0675 9.5625 9.84375 9.5625H8.15625C7.63411 9.5625 7.13335 9.35508 6.76413 8.98587C6.39492 8.61665 6.1875 8.1159 6.1875 7.59375C6.1875 7.0716 6.39492 6.57085 6.76413 6.20163C7.13335 5.83242 7.63411 5.625 8.15625 5.625H8.4375V5.0625C8.4375 4.75184 8.68934 4.5 9 4.5Z" fill="white"/>
              </svg>
            </span>
            <span className='font-semibold text-black'>Total Sale</span>
          </div>
          <div className='w-full mt-4'>
            <span className='text-2xl font-bold'>100</span>
          </div>
        </div>
        {role!="author" && <div className='w-full flex flex-wrap p-4 bg-[#FFF7E5] rounded-[10px]'>
          <div className='w-full flex gap-2 items-center'>
            <span className='bg-[#FFB612] p-1.5 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 2.8125C12.4173 2.8125 15.1875 5.58274 15.1875 9C15.1875 12.4173 12.4173 15.1875 9 15.1875C5.58274 15.1875 2.8125 12.4173 2.8125 9V7.87541C2.8125 7.56475 2.56066 7.3125 2.25 7.3125C1.93934 7.3125 1.6875 7.56434 1.6875 7.875V9C1.6875 13.0386 4.96142 16.3125 9 16.3125C13.0386 16.3125 16.3125 13.0386 16.3125 9C16.3125 4.96142 13.0386 1.6875 9 1.6875L7.87554 1.6875L7.87501 2.8125L9 2.8125ZM7.3125 2.25C7.3125 2.56066 7.56435 2.8125 7.87501 2.8125L7.87554 1.6875C7.56488 1.6875 7.3125 1.93934 7.3125 2.25Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.25 4.5C1.93934 4.5 1.6875 4.75184 1.6875 5.0625C1.6875 5.37316 1.93934 5.625 2.25 5.625H5.0625C5.37316 5.625 5.625 5.37316 5.625 5.0625V2.25C5.625 1.93934 5.37316 1.6875 5.0625 1.6875C4.75184 1.6875 4.5 1.93934 4.5 2.25V3.7045L2.64775 1.85225C2.42808 1.63258 2.07192 1.63258 1.85225 1.85225C1.63258 2.07192 1.63258 2.42808 1.85225 2.64775L3.7045 4.5H2.25Z" fill="white"/>
                <path d="M9 4.5C9.31066 4.5 9.5625 4.75184 9.5625 5.0625V5.625H10.6875C10.9982 5.625 11.25 5.87684 11.25 6.1875C11.25 6.49816 10.9982 6.75 10.6875 6.75H8.15625C7.93247 6.75 7.71786 6.83889 7.55963 6.99713C7.40139 7.15536 7.3125 7.36997 7.3125 7.59375C7.3125 7.81753 7.40139 8.03214 7.55963 8.19037C7.71786 8.34861 7.93247 8.4375 8.15625 8.4375H9.84375C10.3659 8.4375 10.8667 8.64492 11.2359 9.01413C11.6051 9.38335 11.8125 9.8841 11.8125 10.4062C11.8125 10.9284 11.6051 11.4292 11.2359 11.7984C10.8667 12.1676 10.3659 12.375 9.84375 12.375H9.5625V12.9375C9.5625 13.2482 9.31066 13.5 9 13.5C8.68934 13.5 8.4375 13.2482 8.4375 12.9375V12.375H7.3125C7.00184 12.375 6.75 12.1232 6.75 11.8125C6.75 11.5018 7.00184 11.25 7.3125 11.25H9.84375C10.0675 11.25 10.2821 11.1611 10.4404 11.0029C10.5986 10.8446 10.6875 10.63 10.6875 10.4062C10.6875 10.1825 10.5986 9.96786 10.4404 9.80963C10.2821 9.65139 10.0675 9.5625 9.84375 9.5625H8.15625C7.63411 9.5625 7.13335 9.35508 6.76413 8.98587C6.39492 8.61665 6.1875 8.1159 6.1875 7.59375C6.1875 7.0716 6.39492 6.57085 6.76413 6.20163C7.13335 5.83242 7.63411 5.625 8.15625 5.625H8.4375V5.0625C8.4375 4.75184 8.68934 4.5 9 4.5Z" fill="white"/>
              </svg>
            </span>
            <span className='font-semibold text-black'>Total Authors</span>
          </div>
          <div className='w-full mt-4'>
            <span className='text-2xl font-bold'>100</span>
          </div>
        </div>}
      </div>

      <div className='w-full bg-white rounded-lg p-4 mt-5'>
        <h2 className='font-medium mb-3 text-sm'>Sales Report</h2>
        <Table>
          <thead>
            <tr className='border-b-1.5'>
              <th className='w-3/12 text-light-grey text-left'>Platform Name</th>
              <th className='w-3/12 text-light-grey text-center'>Quantity</th>
              <th className='w-3/12 text-light-grey text-center'>Profits Earned</th>
              <th className='w-3/12 text-light-grey text-center'>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b-1.5 w-full'>
              <td className='w-3/12 text-light-black flex flex-wrap items-center gap-3'>
                <img src={"/images/amazon.jpg"} className='size-9 object-cover' alt="Amazon images" />
                Amazon
              </td>
              <td className='w-3/12 text-light-black text-center'>1</td>
              <td className='w-3/12 text-light-black text-center'> 
                ₹33.26
              </td>
              <td className='w-3/12 text-light-black text-center'>
                13 Jul 2024
              </td>
            </tr>
            <tr className='border-b-1.5'>
              <td className='w-3/12 text-light-black flex flex-wrap items-center gap-3'>
                <img src={"/images/amazon.jpg"} className='size-9 object-cover' alt="Amazon images" />
                Amazon
              </td>
              <td className='w-3/12 text-light-black text-center'>1</td>
              <td className='w-3/12 text-light-black text-center'>
                ₹33.26
              </td>
              <td className='w-3/12 text-light-black text-center'>
                13 Jul 2024
              </td>
            </tr>
            <tr className='border-b-1.5'>
              <td className='w-3/12 text-light-black flex flex-wrap items-center gap-3'>
                <img src={"/images/amazon.jpg"} className='size-9 object-cover' alt="Amazon images" />
                Amazon
              </td>
              <td className='w-3/12 text-light-black text-center'>1</td>
              <td className='w-3/12 text-light-black text-center'>
                ₹33.26
              </td>
              <td className='w-3/12 text-light-black text-center'>
                13 Jul 2024
              </td>
            </tr>
            <tr className=''>
              <td className='w-3/12 text-light-black flex flex-wrap items-center gap-3'>
                <img src={"/images/amazon.jpg"} className='size-9 object-cover' alt="Amazon images" />
                Amazon
              </td>
              <td className='w-3/12 text-light-black text-center'>1</td>
              <td className='w-3/12 text-light-black text-center'>
                ₹33.26
              </td>
              <td className='w-3/12 text-light-black text-center'>
                13 Jul 2024
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className='w-full bg-white rounded-lg p-4 mt-5'>
        <h2 className='font-medium mb-3 text-sm'>Top Rated Authors</h2>
        <Table>
          <thead>
            <tr className='border-b-1.5'>
              <th className='w-2/12 text-light-grey text-left'>Author Name</th>
              <th className='w-2/12 text-light-grey text-center'>Total Sales</th>
              <th className='w-2/12 text-light-grey text-center'>Total Earnings</th>
              <th className='w-2/12 text-light-grey text-center'>Total Returned</th>
              <th className='w-2/12 text-light-grey text-center'>Return Royalty</th>
              <th className='w-2/12 text-light-grey text-center'>Total to pay</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b-1.5'>
              <td className='w-2/12 text-light-black text-left'>Lark Hazley</td>
              <td className='w-2/12 text-light-black text-center'>100</td>
              <td className='w-2/12 text-light-black text-center'>
                ₹20,000
              </td>
              <td className='w-2/12 text-light-black text-center'>10</td>
              <td className='w-2/12 text-light-black text-center text-orange'>-₹500</td>
              <td className='w-2/12 text-light-black text-center '>₹4,500</td>
            </tr>
            <tr className='border-b-1.5'>
              <td className='w-2/12 text-light-black text-left'>Lark Hazley</td>
              <td className='w-2/12 text-light-black text-center'>100</td>
              <td className='w-2/12 text-light-black text-center'>
                ₹20,000
              </td>
              <td className='w-2/12 text-light-black text-center'>10</td>
              <td className='w-2/12 text-light-black text-center text-orange'>-₹500</td>
              <td className='w-2/12 text-light-black text-center '>₹4,500</td>
            </tr>
            <tr className='border-b-1.5'>
              <td className='w-2/12 text-light-black text-left'>Lark Hazley</td>
              <td className='w-2/12 text-light-black text-center'>100</td>
              <td className='w-2/12 text-light-black text-center'>
                ₹20,000
              </td>
              <td className='w-2/12 text-light-black text-center'>10</td>
              <td className='w-2/12 text-center text-orange'>-₹500</td>
              <td className='w-2/12 text-light-black text-center '>₹4,500</td>
            </tr>
            <tr className=''>
              <td className='w-2/12 text-light-black text-left'>Lark Hazley</td>
              <td className='w-2/12 text-light-black text-center'>100</td>
              <td className='w-2/12 text-light-black text-center'>
                ₹20,000
              </td>
              <td className='w-2/12 text-light-black text-center'>10</td>
              <td className='w-2/12 text-center text-orange'>-₹500</td>
              <td className='w-2/12 text-light-black text-center '>₹4,500</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
  const role = req.cookies._r || null;
  return {
    props: {
      role: role,
    },
  };
}