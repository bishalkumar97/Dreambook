
import React from 'react'
import CrossCircle from '../../public/icons/CrossCircle'
import Button from '@/components/Button'

export default function SendMessageModal(props) {
   
    return (
        <div className='modal-container'>
            <div className='bg-white rounded-lg p-8 w-1/3 max-h-[95vh] overflow-y-auto dropdown'>
                <div className='flex items-center justify-between'>
                    <h4 className='text-black font-sans text-2xl font-semibold'>Send Message</h4>
                    <div onClick={props.handler} className='cursor-pointer'>
                        <CrossCircle/>
                    </div>
                </div>
                
                <>
                    <label className="w-full text-sm font-medium flex mb-1 mt-6">Message</label>
                    <textarea rows={7} className='w-full resize-none font-inter rounded-lg border border-solid border-border-input px-3 py-2.5 font-normal text-sm text-black placeholder-shown:text-placeholder focus:outline-none focus:border-green focus:border-2' placeholder="Message will send through email" name="name"/>
                </>
                <div className={`w-full grid grid-cols-2 gap-5`}>
                    <Button variant={"green-with-border"} className="mt-6 cursor-pointer" onClick={props.handler}>Cancel</Button>
                    <Button variant={"green"} className="mt-6 cursor-pointer" onClick={props.handler}>Send</Button>
                </div> 
            </div>
        </div>
    )
}
