import React from 'react'
import Location from '../../public/icons/Location'
import Clock from '../../public/icons/Clock'
import Apple from '../../public/icons/Apple'
import Google from '../../public/icons/Google'
import Link from 'next/link'
import Button from '@/components/Button'
import AppliedShield from '../../public/icons/AppliedShield'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Tag from '../../public/icons/Tag'
import DollarCircle from '../../public/icons/DollarCircle'
dayjs.extend(relativeTime)
export default function JobCard({data}) {
    const router = useRouter()
    return (
        <div className='w-full p-6 shadow-searchbox rounded-md bg-white overflow-hidden relative'>
            {data?.is_closed == 1 && <h6 className='bg-purple-400 text-white font-normal text-xs absolute rotate-45 py-1.5 px-4 w-24 text-center -right-6 top-2'>Closed</h6>}
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-wrap col-5/6 gap-4'>
                    
                    <img src={data?.company?.upload_logo ? data?.company?.upload_logo : "/images/event.jpg"} alt="logo" className='size-16 rounded-md shadow' />
                    
                    <div>
                        <h4 className='text-black font-medium text-lg capitalize'>{data?.company?.company_name ? data?.company?.company_name : "N/A"}</h4>
                        <div className='flex flex-wrap items-center gap-2 mt-1'>
                            <Clock/>
                            <h6 className='text-[#94a3b8] font-normal text-sm'>{dayjs(data?.created_at).fromNow()}</h6>
                        </div>
                    </div>
                </div>
                {/* <h5 className='px-2 py-1 capitalize rounded-md font-normal text-sm bg-green-lightier text-green'>{data?.job_type}</h5> */}
            </div>
            <Link href={`/manage-jobs/${data?.id}`} className='text-black font-semibold text-xl font-sans flex pt-5 hover:text-green capitalize'>{data?.job_title}</Link>
            
            <div className='w-full flex items-center justify-between mt-6'>
                <div className='flex flex-wrap items-center gap-2'>
                    <Location/>
                    <h6 className='text-[#94a3b8] font-normal text-sm capitalize'>{data?.location}</h6>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <h4 className='text-[#94a3b8] font-normal text-sm'>{data?.applied_job_count} Applicants</h4>
                    <AppliedShield/>
                </div>
            </div>
            <div className='w-full grid grid-cols-2 gap-2 my-3'>
                <div className='flex flex-wrap items-center gap-2'>
                    <Tag/>
                    <h6 className='text-[#94a3b8] font-normal text-sm capitalize truncate w-4/5'>{data?.job_category}</h6>
                </div>
                <div className='flex flex-wrap items-center justify-end gap-2'>
                    <h4 className='text-[#94a3b8] font-normal text-sm'>{data?.minimum_salary} - {data?.maximum_salary}</h4>
                    <DollarCircle/>
                </div>
            </div>
            <Button onClick={()=> router.push(`/manage-jobs/${data.id}`)} variant="green-with-border" className="mt-6"> View Job </Button>

        </div>
    )
}
