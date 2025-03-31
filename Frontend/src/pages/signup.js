import React, { useState } from 'react'
import Input from '@/components/Input'
import Password from '@/components/Password'
import Button from '@/components/Button'
import Link from 'next/link'
import PhoneNumber from '@/components/PhoneNumber'
import { comparePasswords, isRequired, verifyEmail } from '@/Utilities/helpers'
import OTP from '@/components/OTP'
import { useRouter } from 'next/router'
import Onboarding from '@/layout/Onboarding'
import useFirebaseAuth from '@/services/firebase-services/useFirebaseAuth'
import Envelop from '../../public/icons/Envelop'
import CountdownTimer from '@/components/Counter'
import { loginEmployer, registerEmployer } from '@/services/APIs/onBoarding'
import { infoMessage } from '@/Utilities/toasters'
import Google from '../../public/icons/Google'

export default function SignupForm() {
    const router = useRouter()
    const { createUserWithEmailMethod, deleteMyAccount , signInWithGoogle} = useFirebaseAuth();
    const [loading,setLoading] = useState(false);
    const [verifier,setVerifier] = useState(false);
    const [validData, setValidData] = useState(false);
    const [data,setData] = useState('')

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        // alert(formData.get("email"));
        if(isRequired(formData.get("full_name"),"Full Name") &&verifyEmail(formData.get("email")) && isRequired(formData.get("password"),"Password") && isRequired(formData.get("confirm_password"),"Confirm Password") && comparePasswords(formData.get("password"),formData.get("confirm_password"))){
            setData({
                email:formData.get("email"),
                password:formData.get("password"),
                name:formData.get("full_name"),
                phone:formData.get("phone")
            });
            const res = await createUserWithEmailMethod(formData.get("email"), formData.get("password"));
            if(res.status){
                const formdataNew = new FormData();
                formdataNew.append("full_name", formData.get("full_name"));
                formdataNew.append("email", formData.get("email"));
                formdataNew.append("password", formData.get("password"));
                const response = await registerEmployer(formdataNew);
                if(response.status){
                    // router.push(`/details?step=1&name=${data.name}&phone=${data.phone}&email=${data.email}`)
                    router.push("/verify-email");
                    setLoading(false);
                    setVerifier(true);
                }else{
                    await deleteMyAccount();
                    setLoading(false);
                    setVerifier(false);
                }
            }
            else{
                setLoading(false);
            }
        }
        else{
            setLoading(false);
        }
    }
    const googleHandler = async () => {
        const res = await signInWithGoogle()
        if(res.status){
            if(res.isFirstSignIn){
                const formdataNew = new FormData();
                formdataNew.append("full_name", res.user.displayName);
                formdataNew.append("email", res.user.email);
                const response = await registerEmployer(formdataNew);
                if(response.status){
                    router.push(`/details?step=1&name=${res.user.displayName}&email=${res.user.email}`)
                }else{
                    await deleteMyAccount();
                    setLoading(false);
                }
            }else{
                const response = await loginEmployer(res.token)
                if(response.status){
                    setUser(response.data);
                    handleRedirect(response.data)
                }else{
                    setLoading(false);
                }
            }
        }
    }
    
    const handleRedirect = (data) => {
        if(!(data.company_name) || !(data.company_registration_number)){
            router.push(`/details?step=1&name=${data.full_name}&email=${data.email}`)
        }else if(!(data.full_name) || !(data.DOB) || !(data.id_passport_number)){
            router.push(`/details?step=2&name=${data.full_name}&email=${data.email}`)
        }
        else if(!(data.upload_logo) || !(data.upload_company_registration) || !(data.profile_photo) || !(data.cover_photo)){ 
            router.push(`/details?step=3&name=${data.full_name}&email=${data.email}`)
        }
        else{
            router.push(`/manage-jobs`);
        }
    }
    return (
        <Onboarding>
            <div className='w-full flex justify-center items-center mt-5 pt-8'>
                {!verifier && <form onSubmit={formSubmitHandler} className='mt-4 z-30 shadow-lg bg-white rounded-lg py-8 w-5/12 px-10'>
                    <h4 className='font-semibold text-3xl text-black text-center font-sans'>Sign Up</h4>
                    <h5 className='font-normal text-grey text-sm font-sans mt-1 text-center'>Enter your details</h5>
                    <label className="flex flex-wrap mt-5">
                        <span className="w-full text-sm text-inputLabel font-medium mb-1">Full name</span>
                        <Input type="text" placeholder="Enter full name" name="full_name" invalidmessage="Please enter a valid username." />
                    </label>
                    
                    <div className='w-full grid grid-cols-2 gap-5'>
                        <label className="flex flex-wrap mt-5">
                            <span className="w-full text-sm text-inputLabel font-medium mb-1">Email</span>
                            <Input type="email" placeholder="Enter email" name={"email"}  invalidmessage="Please enter a valid email." />
                        </label>
                        <label className="flex flex-wrap mt-5 w-full">
                            <span className="w-full text-sm text-inputLabel font-medium mb-1">Phone Number</span>
                            <PhoneNumber name={"phone"} value="" />
                        </label>
                        <label className="flex flex-wrap">
                            <span className="w-full text-sm font-medium mb-1">Password</span>
                            <Password name={"password"} placeholder="Enter password"></Password>
                        </label>
                        <label className="flex flex-wrap">
                            <span className="w-full text-sm font-medium mb-1">Confirm Password</span>
                            <Password name={"confirm_password"} placeholder="Re-enter password"></Password>                        
                        </label>
                    </div>
                    <Button type={"submit"} variant={"green"} className="mt-6" loading={loading}>{"Continue"}</Button>
                    <div className='w-full flex items-center justify-between mt-10'>
                        <div onClick={googleHandler} className='cursor-pointer flex items-center justify-center gap-2'>
                            <Google/>
                            <h5 className='text-sm text-[#2f2f2f] font-normal'>Continue with Google</h5>
                        </div>
                        <div className='flex items-center justify-center'>
                            <span className='text-sm text-black font-semibold'>Already have an account?</span>
                            <Link className='text-[#00A3FF] text-sm font-semibold ml-1 hover:underline' href="/">Login</Link>
                        </div>
                    </div>
                </form>}
            </div>
        </Onboarding>
    )
}
