import Button from '@/components/Button'
import Layout from '@/layout/Layout'
import React from 'react'
import Visa from '../../public/icons/Visa'
import Lock from '../../public/icons/Lock'

export default function billing() {
  return (
    <Layout>
        <div className='bg-white rounded-lg p-8 w-full flex flex-wrap'>
            <div className='w-5/6'>
                <h5 className='text-[#94a3b8] font-normal text-sm'>Current Plan</h5>
                <h2 className='text-black font-semibold text-2xl mt-4'>Premium</h2>
                <h5 className='text-black font-normal text-sm mt-4 w-3/4 leading-loose'>Unlimited access to the essential tools for job finders in Job Seeker lorem ipsum dolaer sit amet</h5>
                <h5 className='text-grey font-normal text-xs mt-2'>Next payment: $12.99 on 1 Oct, 2024</h5>
            </div>
            <div className='w-1/6'>
                <Button variant={"green"} className="w-full" type="submit" >Enable Subscription</Button>
                <Button variant={"normal"} className="mt-6 cursor-pointer">Cancel Subscription</Button>
            </div>
            <h5 className='text-[#94a3b8] font-normal text-sm w-full mt-8'>Payment Method</h5>
            <div className='flex items-center justify-between w-full mt-2'>
                <div className='flex items-center w-1/2 gap-1'>
                    <Visa/>
                    <h6 className='text-black font-semibold text-sm pl-1'>**** 8456</h6>
                    <Lock/>
                </div>
                <div className='flex items-center gap-8 w-1/6'>
                    <h2 className='text-danger font-normal text-xs cursor-pointer'>Remove</h2>
                    <Button variant={"normal"} className="cursor-pointer">Change Card</Button>
                </div>
            </div>
        </div>
        <div className='bg-white rounded-lg p-8 w-full flex flex-wrap mt-5'>
            <h2 className='text-black font-semibold text-2xl'>Billing History</h2>
            <div className='border rounded-md border-border-nput w-full mt-5'>
                <div className='grid grid-cols-4 w-full p-3 bg-green-lightier'>
                    <h5 className='text-[#94a3b8] font-normal text-xs uppercase'>Date</h5>
                    <h5 className='text-[#94a3b8] font-normal text-xs uppercase text-center'>Type</h5>
                    <h5 className='text-[#94a3b8] font-normal text-xs uppercase text-center'>Transaction ID</h5>
                    <h5 className='text-[#94a3b8] font-normal text-xs uppercase text-center'>Price</h5>
                </div>
                <div className='grid grid-cols-4 w-full p-3 border-t border-border-nput'>
                    <h5 className='text-black font-normal text-sm'>2019-08-25 11:06 UTC</h5>
                    <h5 className='text-black font-normal text-sm text-center'>Premium</h5>
                    <h5 className='text-black font-normal text-sm text-center'>8FSKMS9002KK222</h5>
                    <h5 className='text-black font-normal text-sm text-center'>$12.99</h5>
                </div>
                <div className='grid grid-cols-4 w-full p-3 border-t border-border-nput'>
                    <h5 className='text-black font-normal text-sm'>2019-07-25 07:06 UTC</h5>
                    <h5 className='text-black font-normal text-sm text-center'>Premium</h5>
                    <h5 className='text-black font-normal text-sm text-center'>1AIDKS9002285KK8</h5>
                    <h5 className='text-black font-normal text-sm text-center'>$12.99</h5>
                </div>
            </div>
        </div>
    </Layout>
  )
}
