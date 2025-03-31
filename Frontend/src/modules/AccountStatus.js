import Button from '@/components/Button'
import Layout from '@/layout/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function AccountStatus({user,refresh,loading}) {
  const router = useRouter();
    if(user && parseInt(user.is_verify)==0){
        return (
          <Layout>
          <>
            <div className='w-full p-8 mt-5 flex flex-wrap items-center justify-center'>
              <div className='w-5/12 rounded-xl bg-white flex flex-wrap justify-center p-5'>
                  <img src={`/images/verification.png`} className='w-2/3' />
                  <h2 className='w-full text-green-dark font-extrabold text-2xl font-inter uppercase text-center'>Your application is in progress</h2>
                  <h3 className='text-center font-sm w-full opacity-80 my-2'>Your details have been successfully submit and will review by admin once admin verify your detail then you will have full access to this platform.</h3>
                  <div className='w-full flex item-center justify-center mt-2 mb-3'>
                      <Button variant="primary" className="w-6/12" loading={loading} onClick={()=>refresh()}>Refresh Status</Button>
                  </div>
              </div>
            </div>
          </>
        </Layout>
        )
    }
    else if(user && parseInt(user.is_verify)==2){
        return (
          <Layout>
            <>
              <div className='w-full p-8 mt-5 flex flex-wrap items-center justify-center'>
                <div className='w-5/12 rounded-xl bg-white flex flex-wrap justify-center p-5'>
                    <img src={`/images/rejected-vector.jpg`} className='w-2/3' />
                    <h2 className='w-full text-red-500 font-extrabold text-2xl font-inter capitalize text-center '>Profile <span className=''>rejected</span></h2>
                    <h3 className='text-center font-sm w-2/3 opacity-80'><span className='font-medium'>Admin Comment:</span> {user.decline_message?user.decline_message: "Comment not added by admin"}</h3>
                    <div className='w-full flex item-center justify-center mt-3 mb-2'>
                        <Button variant="primary" className="w-6/12" loading={loading} onClick={()=>refresh()}>Reset Details</Button>
                    </div>
                </div>
              </div>
            </>
          </Layout>
        )
    }
    else if(user && parseInt(user.is_block)==2){
        return (
          <Layout>
            <>
                <div className='w-full p-8 mt-5 flex flex-wrap items-center justify-center'>
                    <div className='w-5/12 rounded-xl bg-white flex flex-wrap justify-center p-5'>
                        <img src={`/images/blocked.jpg`} className='w-2/3' />
                        <h2 className='w-full text-red-500 font-extrabold text-2xl font-inter capitalize text-center '>Your account has been blocked</h2>
                        <h3 className='text-center font-sm w-2/3 opacity-80'>Your account has been blocked by admin. Contact with admin for furture queries.</h3>
                        <div className='w-full flex item-center justify-center mt-3 mb-2'>
                            <Button variant="primary" className="w-6/12" loading={loading} onClick={()=>refresh()}>Refresh Status</Button>
                        </div>
                    </div>
              </div>
            </>
          </Layout>
        )                                   
    }
    else{
        return <></>
    }
}
