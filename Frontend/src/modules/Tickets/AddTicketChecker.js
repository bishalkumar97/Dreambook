import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import PhoneNumber from '@/components/PhoneNumber'
import { createTicketChecker } from '@/services/APIs/author'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function AddTicketChecker({handler}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const addTicketChecker = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const payload = {
            "email": formData.get("checkerEmail"),
            "name": formData.get("checkerName"),
            "phone": e.target[2].value
        }
        if(!payload.phone){
            toast.warning("Please provide Phone number",{
                toastId:`Validation-${Math.random()}`
            });
        }
        const res = await createTicketChecker(payload);
        if(res.status){
            router.push("/ticket-checker");
            handler(false);
        }
        else{
            setLoading(false);
        }
    }
    return (
        <Modal>
          <div className='grid grid-cols-1 gap-4 w-full max-w-64 md:max-w-md p-5 bg-white rounded-lg'>
            <div className='w-full flex flex-wrap items-center justify-between'>
                <h3 className='text-xl text-black-3 font-semibold'>Add Ticket Checker</h3>
                <button onClick={() => handler(false)} className='px-2 py-1 text-xs border border-blue rounded-md text-blue font-semibold hover:text-white hover:bg-blue'>ESC</button>
            </div>
            <div className='w-full flex flex-wrap'>
                <form onSubmit={addTicketChecker} className='mt-3 w-full'>
                    <label className="flex flex-wrap w-full">
                        <span className="w-full text-sm font-medium mb-1">Full name</span>
                        <Input required={true} type="text" placeholder="Enter ticket name" name="checkerName" />
                    </label>

                    <label className="flex flex-wrap mt-4 w-full">
                        <span className="w-full text-sm font-medium mb-1">Email</span>
                        <Input required={true} name="checkerEmail" type="email" placeholder="Enter single ticket price" invalidmessage="Please enter valid mail"></Input>
                    </label>

                    <label className="flex flex-wrap mt-4 w-full">
                        <span className="w-full text-sm font-medium mb-1">Phone</span>
                        <PhoneNumber required={true} handler={() => {}} />
                    </label>

                    <div className='grid grid-cols-2 gap-8 mt-8'>
                        <Button type="reset" variant="secondary" onClick={()=> handler(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={loading}>
                            Send Invite
                        </Button>
                    </div>
                </form>
            </div>
          </div>
        </Modal>
    )
}
