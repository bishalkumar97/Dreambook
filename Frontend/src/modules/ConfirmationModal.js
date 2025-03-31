import Button from '@/components/Button'
import Input from '@/components/Input';
import { changeStausOfUserToAppliedJob } from '@/services/APIs/author';
import React, { useState } from 'react'

export default function ConfirmationModal({handler,id,user,type,refresh}) {
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState('')
    const yesHandler = async () => {
        const formdata = new FormData();
        if(type == 'hire'){
            formdata.append("status",  3);
            apiHandler(formdata)
        }
        if(type == 'decline' && message.trim().length > 0){
            formdata.append("status",  2);
            formdata.append("reject_message", message);
            apiHandler(formdata)
        }
        if(type == 'shortlist'){
            formdata.append("status",  1);
            apiHandler(formdata)
        }
    }
    const apiHandler = async (formdata) => {
        setLoading(true)
        const response = await changeStausOfUserToAppliedJob(formdata,id)
        if(response.status){
            refresh("")
            handler()
            setLoading(false)
        }else{
            setLoading(false)
        }
    }
    return (
        <div className='modal-container'>
            <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
                <h2 className='font-sora text-zinc-600 text-2xl text-center w-full font-medium leading-relaxed'>
                    Are you sure you want to <span className={`font-bold ${type == 'hire' && 'text-green'} ${type == 'shortlist' && 'text-yellow'} ${type == 'decline' && 'text-danger'}`}>{type}</span> {user}?
                </h2>
                {type == 'decline' && <div className='w-full mt-5'>
                    <h6 className='text-black font-normal text-sm mb-1'>Reason<span className='text-danger'>*</span></h6>
                    <textarea rows={7} className='font-inter rounded-lg border border-solid border-border-input px-3 py-2.5 font-normal text-sm text-black outline-none w-full resize-none' placeholder="Enter reason for decline" value={message} onChange={e=>setMessage(e.target.value)} />
                </div>}
                <div className='w-full grid grid-cols-2 mt-5 gap-3'>
                    <Button variant="normal" onClick={handler}>No</Button>
                    {type == 'hire' && <Button variant="primary" loading={loading} onClick={yesHandler}>Yes</Button>}
                    {type == 'shortlist' && <Button variant="yellow" loading={loading} onClick={yesHandler}>Yes</Button>}
                    {type == 'decline' && <Button variant="danger" loading={loading} onClick={yesHandler}>Yes</Button>}
                </div>
            </div>
        </div>
    )
}
