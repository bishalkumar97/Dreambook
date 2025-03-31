import React, { useState } from 'react'
import Button from './Button'

export default function ReportUser({successHandler, cancelHandler, loading}) {
  const [reason, setReason] = useState("")
  const handler = () => {
    successHandler(reason)
  }
  return (
    <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center flex-wrap z-50 bg-[rgba(0,0,0,0.1)]'>
        <div className='w-[320px] rounded-xl p-4 flex flex-wrap bg-white'>
            <span className='font-semibold'>Sure you want to report user?</span>
            <span className='text-sm mt-1 text-neutral4'>This will be reported to admin </span>
            <textarea rows={3} onChange={(e) => setReason(e.target.value)} className='w-full border mt-3 focus:outline-none p-2 text-sm' placeholder='Please describe the reason' />
            <div className='mt-6 w-full grid grid-cols-2 gap-4'>
                 <Button variant="secondary" onClick={(e) => cancelHandler(prev => !prev)}>Cancel</Button>
                 <Button variant="primary" onClick={handler} loading={loading}>Report</Button>
            </div>
        </div>
    </div>
  )
}
