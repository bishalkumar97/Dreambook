import Button from '@/components/Button'
import DOB from '@/components/DOB'
import Input from '@/components/Input'
import PhoneNumber from '@/components/PhoneNumber'
import React, { useState } from 'react'
import CrossCircle from '../../../public/icons/CrossCircle'
import { useRouter } from 'next/router'
import { isRequired, stringAndObjectChecker } from '@/Utilities/helpers'
import { setUser } from '@/services/firebase-services/cookies'
import dayjs from 'dayjs'
import { updateProfile } from '@/services/APIs/onBoarding'
import Uploader from '../Uploader'

export default function DocumentModal(props) {
    const [loading,setLoading] = useState(false)
    const [numberFile,setNumberFile] = useState(props.data?.upload_company_registration)
    const [logoFile,setLogoFile] = useState(props.data?.upload_logo)
    const numberFileHandler = (val) => {
        setNumberFile(val)
    }
    const logoFileHandler = (val) => {
        setLogoFile(val)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if(stringAndObjectChecker(numberFile,"Registration Number Photo")){
                
            const formdata = new FormData();
            formdata.append("upload_company_registration", numberFile);
            // formdata.append("upload_logo", logoFile);
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
                <h4 className='text-black font-sans text-2xl font-semibold'>Upload Details</h4>
                <div onClick={props.handler} className='cursor-pointer'>
                    <CrossCircle/>
                </div>
            </div>
            <>
                <label className="w-full text-sm font-medium mb-1 flex mt-6">Upload Company Registration Number<span className='text-danger'>*</span></label>
                <Uploader existingUrl={numberFile} handler={numberFileHandler} />
            </>
            {/* <>
                <label className="w-full text-sm font-medium mb-1 flex mt-6">Upload Company Logo</label>
                <Uploader existingUrl={logoFile} handler={logoFileHandler} />
            </> */}
            <div className={`w-full grid grid-cols-2 gap-5`}>
                <Button variant={"green-with-border"} className="mt-6 cursor-pointer" onClick={props.handler}>Back</Button>
                <Button variant={"green"} loading={loading} className="mt-6 cursor-pointer">Update</Button>
            </div> 
        </form>
    </div>
  )
}
