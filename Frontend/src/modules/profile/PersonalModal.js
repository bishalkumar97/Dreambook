import Button from '@/components/Button'
import DOB from '@/components/DOB'
import Input from '@/components/Input'
import PhoneNumber from '@/components/PhoneNumber'
import React, { useState } from 'react'
import CrossCircle from '../../../public/icons/CrossCircle'
import { useRouter } from 'next/router'
import { isRequired } from '@/Utilities/helpers'
import { setUser } from '@/services/firebase-services/cookies'
import dayjs from 'dayjs'
import { updateProfile } from '@/services/APIs/onBoarding'

export default function PersonalModal(props) {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [dob,setDob] = useState(props.data?.dob)
    const dobHandler = (val) => {
        setDob(val)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if(isRequired(formData.get("name"),"Name") && isRequired(dob == '' ? dob : dayjs(dob).format("YYYY-MM-DD"),"DOB") && isRequired(formData.get("identity"),"ID/Passport Number")){
            const formdata = new FormData();
            formdata.append("full_name", formData.get("name"));
            formdata.append("DOB", dayjs(dob).format("YYYY-MM-DD"));
            formdata.append("id_passport_number", formData.get("identity"));
            setLoading(true)
            const response = await updateProfile(formdata)
            if(response?.status){
                setUser(response?.data)
                props.handler()
            }else{
                setLoading(false)
            }
            setLoading(false)
        }            
        
    }
  return (
    <div className='modal-container'>
        <form onSubmit={submitHandler} className='bg-white rounded-lg p-8 w-1/3'>
            <div className='flex items-center justify-between'>
                <h4 className='text-black font-sans text-2xl font-semibold'>Personal Details</h4>
                <div onClick={props.handler} className='cursor-pointer'>
                    <CrossCircle/>
                </div>
            </div>
            <>
                <label className="w-full text-sm font-medium mb-1 flex mt-4">Full Name<span className='text-danger'>*</span></label>
                <Input type="text" placeholder="Please enter your full name" name="name" defaultValue={props.data?.full_name} />
            </>
            <>
                <label className="w-full text-sm font-medium mb-1 flex mt-4">Email<span className='text-danger'>*</span></label>
                <Input type="email" placeholder="Enter email" readOnly defaultValue={props.data?.email} invalidmessage="Please enter a valid email." name="email" />
            </>
            {/* <>
                <label className="w-full text-sm font-medium mb-1 mt-4">Phone Number<span className='text-danger'>*</span></label>
                <PhoneNumber value={router.query.phone} name="phone" />
            </> */}
            <>
                <label className="w-full text-sm font-medium flex mb-1 mt-4">Date of Birth<span className='text-danger'>*</span></label>
                <DOB callback={dobHandler} value={props.data?.DOB} />
            </>
            <>
                <label className="w-full text-sm font-medium flex mb-1 mt-4">ID/Passport Number<span className='text-danger'>*</span></label>
                <Input type="text" placeholder="Please enter your id number" name="identity" defaultValue={props.data?.id_passport_number} />
            </>
            <div className={`w-full grid grid-cols-2 gap-5`}>
                <Button variant={"green-with-border"} className="mt-6 cursor-pointer" onClick={props.handler}>Back</Button>
                <Button variant={"green"} loading={loading} className="mt-6 cursor-pointer">Update</Button>
            </div> 
        </form>
    </div>
  )
}
