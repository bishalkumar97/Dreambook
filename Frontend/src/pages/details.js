import React, { useEffect, useState } from 'react'
import Input from '@/components/Input'
import DOB from '@/components/DOB'
import Stepper from '@/layout/Stepper'
import Uploader from '@/modules/Uploader'
import Button from '@/components/Button'
import Shield from '../../public/icons/Shield'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Onboarding from '@/layout/Onboarding'
import PhoneNumber from '@/components/PhoneNumber'
import { isRequired, stringAndObjectChecker } from '@/Utilities/helpers'
import { updateProfile } from '@/services/APIs/onBoarding'
import dayjs from 'dayjs'
import { setUser } from '@/services/firebase-services/cookies'
export default function Details() {
    const router = useRouter();
    const { step } = router.query;
    const [dob,setDob] = useState('')
    const [numberFile,setNumberFile] = useState('')
    const [companyLogo,setCompanyLogo] = useState('')
    const [coverPhoto,setCoverPhoto] = useState('')
    const [profilePhoto,setProfilePhoto] = useState('')

    const [loading,setLoading] = useState(false)
    const updateQueryParams = (newQueryParams) => {
        const updatedQuery = { ...router.query, ...newQueryParams };
        router.push({
          pathname: router.pathname,
          query: updatedQuery,
        });
    };
    const numberFileHandler = (val) => {
        setNumberFile(val)
    }
    const logoFileHandler = (val) => {
        setCompanyLogo(val)
    }
    const profilePhotoHandler = (val) => {
        setProfilePhoto(val);
    }
    const coverFileHandler = (val) => {
        setCoverPhoto(val);
    }
    const nextHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if(step == 2){
            if(isRequired(formData.get("name"),"Name") && isRequired(dob == '' ? dob : dayjs(dob).format("YYYY-MM-DD"),"DOB") && isRequired(formData.get("identity"),"ID/Passport Number")){
                const formdata = new FormData();
                formdata.append("full_name", formData.get("name"));
                formdata.append("DOB", dayjs(dob).format("YYYY-MM-DD"));
                formdata.append("id_passport_number", formData.get("identity"));
                setLoading(true)
                const response = await updateProfile(formdata)
                if(response?.status){
                    setLoading(false)
                    setUser(response.data);
                }else{
                    setLoading(false)
                }
                updateQueryParams({step: parseInt(step)+1})
            }            
        }else if(step == 1){
            const company_name = formData.get("company");
            const company_reg = formData.get("registration");
            // const company_id = formData.get("id");
            if(isRequired(company_name, "Company") && isRequired(company_reg, "Registration number")){
                const formdata = new FormData();
                formdata.append("company_name", formData.get("company"));
                // formdata.append("id_number", formData.get("id"));
                formdata.append("company_registration_number", formData.get("registration"));
                setLoading(true)
                const response = await updateProfile(formdata)
                if(response?.status){
                    setLoading(false);
                    setUser(response.data);
                }else{
                    setLoading(false)
                }
                updateQueryParams({step: parseInt(step)+1})
            }            
        }else if(step == 3){
            if(stringAndObjectChecker(numberFile,"Registration Number Photo") && stringAndObjectChecker(companyLogo,"Company Logo")){
                const formdata = new FormData();
                formdata.append("upload_company_registration", numberFile);
                formdata.append("upload_logo", companyLogo);
                setLoading(true)
                const response = await updateProfile(formdata)
                if(response?.status){
                    setUser(response?.data);
                    setLoading(false)
                }else{
                    setLoading(false)
                }
                updateQueryParams({step: parseInt(step)+1})
            }
        }else if(step == 4){
            if(stringAndObjectChecker(profilePhoto,"Profile Photo") && stringAndObjectChecker(coverPhoto,"Cover photo")){
                const formdata = new FormData();
                formdata.append("profile_photo", profilePhoto);
                formdata.append("cover_photo", coverPhoto);
                setLoading(true)
                const response = await updateProfile(formdata)
                if(response?.status){
                    setUser(response?.data)
                    router.push("/manage-jobs")
                }else{
                    setLoading(false)
                }
            }
        }
    }
    const dobHandler = (val) => {
        setDob(val)
    }
    const backHandler = () => {
        updateQueryParams({step: parseInt(step)-1})
    }
    useEffect(()=>{
        if(router.asPath == '/details'){
            updateQueryParams({step: 1})
        }
    },[])
    return (
        <Onboarding>
            <div className='w-full flex justify-center items-center'>
                <form onSubmit={nextHandler} className='mt-5 z-30 rounded-lg w-6/12 flex flex-wrap justify-center pb-5'>
                    {step < 5 && <div className={`${step < 5 ? 'w-9/12':"w-full"} flex flex-wrap justify-center items-start z-30 shadow-lg rounded-lg mt-12 bg-white pb-10 px-8`}>
                        {step < 5 && <Stepper step={step}></Stepper>}
                        {step && step == 2 && <>
                            <h2 className='font-sans text-lg font-semibold mt-5 text-black-3 mb-1'>Personal Details<span className='text-danger'>*</span></h2>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Full Name<span className='text-danger'>*</span></label>
                                <Input type="text" placeholder="Please enter your full name" name="name" defaultValue={router.query.name} />
                            </>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Email<span className='text-danger'>*</span></label>
                                <Input type="email" placeholder="Enter email" readOnly defaultValue={router.query.email} invalidmessage="Please enter a valid email." name="email" />
                            </>
                            {/* <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Phone Number<span className='text-danger'>*</span></label>
                                <PhoneNumber value={router.query.phone} name="phone" />
                            </> */}
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Date of Birth<span className='text-danger'>*</span></label>
                                <DOB callback={dobHandler} />
                            </>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">ID/Passport Number<span className='text-danger'>*</span></label>
                                <Input type="text" placeholder="Please enter your id number" name="identity"/>
                            </>
                            
                        </>}
                        {step && step == 1 && <>
                            <h2 className='font-sans text-lg font-semibold mt-5 text-black-3 mb-1'>Company Details<span className='text-danger'>*</span></h2>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Company Name<span className='text-danger'>*</span></label>
                                <Input type="text" placeholder="Please enter your company name" name="company"/>
                            </>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Company Registration Number<span className='text-danger'>*</span></label>
                                <Input type="text" placeholder="Please enter your company registration number" name="registration"/>
                            </>
                            <>
                                {/* <label className="w-full text-sm font-medium mb-1 mt-4">ID Number<span className='text-danger'>*</span></label>
                                <Input type="text" placeholder="Please enter your id number" name="id"/> */}
                            </>      
                        </>}
                        {step && step == 3 && <>
                            <h2 className='font-sans text-lg font-semibold mt-5 text-black-3 mb-1'>Upload Details<span className='text-danger'>*</span></h2>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Upload Company Registration Certificate<span className='text-danger'>*</span></label>
                                <Uploader handler={numberFileHandler} />
                            </>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Upload Company Logo<span className='text-danger'>*</span></label>
                                <Uploader handler={logoFileHandler} />
                                
                            </>
                        </>}
                        {step && step == 4 &&<>
                            <h2 className='font-sans text-lg font-semibold mt-5 text-black-3 mb-1'>Upload Photos<span className='text-danger'>*</span></h2>
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Upload Cover Photo<span className='text-danger'>*</span></label>
                                <Uploader handler={coverFileHandler} />
                            </> 
                            <>
                                <label className="w-full text-sm font-medium mb-1 mt-4">Upload Profile Photo<span className='text-danger'>*</span></label>
                                <Uploader handler={profilePhotoHandler} />
                            </>
                        </>}
                        <div className={`w-full grid grid-cols-1 gap-5`}>
                            {/* {step > 1 && <Button variant={"green-with-border"} className="mt-6 cursor-pointer" onClick={backHandler}>Back</Button>} */}
                            <Button variant={"green"} type="submit" loading={loading} className="mt-6 cursor-pointer" >{step < 4 ? 'Next' : 'Submit'}</Button>
                        </div> 
                    </div>}
                    {step == 5 && <div className='flex w-8/12 flex-wrap justify-center items-start rounded-lg mt-24 bg-white p-20'>
                        <Shield/>
                        <h2 className='text-green text-5xl w-full text-center font-sans font-semibold mt-5'>You are all set</h2>
                        <h5 className='text-black text-center text-sm font-medium mt-3'>You can later change your preferences from profile.</h5>
                        <Link href="/manage-jobs" className="w-full text-center pt-5 text-sm text-green hover:underline">Go to Manage Jobs Page</Link>
                    </div>}
                </form>  
            </div>              
        </Onboarding>
    )
}
