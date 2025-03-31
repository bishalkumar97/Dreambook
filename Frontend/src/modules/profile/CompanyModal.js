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

export default function CompanyModal(props) {
    const [loading,setLoading] = useState(false)
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if(isRequired(formData.get("company"),"Company") && formData.get("registration"),"Registration" && formData.get("id"),"ID"){
            const formdata = new FormData();
            formdata.append("company_name", formData.get("company"));
            // formdata.append("id_passport_number", formData.get("id"));
            formdata.append("company_registration_number", formData.get("registration"));
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
                <h4 className='text-black font-sans text-2xl font-semibold'>Company Details</h4>
                <div onClick={props.handler} className='cursor-pointer'>
                    <CrossCircle/>
                </div>
            </div>
            <>
                <label className="w-full text-sm font-medium mb-1 flex mt-4">Company Name</label>
                <Input type="text" placeholder="Please enter your company name" name="company" defaultValue={props?.data?.company_name} />
            </>
            <>
                <label className="w-full text-sm font-medium mb-1 flex mt-4">Company Registration Number</label>
                <Input type="text" placeholder="Please enter your flex company registration number" name="registration" defaultValue={props?.data?.company_registration_number}/>
            </>
            {/* <>
                <label className="w-full text-sm font-medium mb-1 flex mt-4">ID Number</label>
                <Input type="text" placeholder="Please enter your id number" name="id" defaultValue={props?.data?.id_number} />
            </>   */}
            <div className={`w-full grid grid-cols-2 gap-5`}>
                <Button variant={"green-with-border"} className="mt-6 cursor-pointer" onClick={props.handler}>Back</Button>
                <Button variant={"green"} loading={loading} className="mt-6 cursor-pointer">Update</Button>
            </div> 
        </form>
    </div>
  )
}
