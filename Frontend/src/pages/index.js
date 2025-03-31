import Button from '@/components/Button'
import Input from '@/components/Input'
import Password from '@/components/Password'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import { isRequired, verifyEmail } from '@/Utilities/helpers'
import Onboarding from '@/layout/Onboarding'
import Link from 'next/link'
import useFirebaseAuth from '@/services/firebase-services/useFirebaseAuth'
import { loginEmployer, registerEmployer } from '@/services/APIs/onBoarding'
import { setRole, setToken, setUser } from '@/services/firebase-services/cookies'
import { descriptionMessage, errorMessage } from '@/Utilities/toasters'
import Google from '../../public/icons/Google'
import Image from 'next/image'
import SocialFooter from '@/modules/SocialFooter'
export default function Signin() {
    const {loginWithEmailAndPassword,signInWithGoogle,deleteMyAccount} = useFirebaseAuth()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState(true) // True for email method, False for Phone method

    const handler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        if(verifyEmail(formData.get("email")) && isRequired(formData.get("password"), "Password")){
            const res = await loginWithEmailAndPassword(formData.get("email"), formData.get("password"));
            if(res.status){
                const formdata = new FormData();
                formdata.append("email", formData.get("email"));
                formdata.append("password", formData.get("password"));
                if(true || res.user.emailVerified){
                    const response = await loginEmployer(res.token)
                    if(response.status){
                        if(response.data.isBlocked){
                            errorMessage("Your account has been blocked.");
                        }
                        else{
                            setToken(res.token, res.expiryTime);
                            setUser(response.data);
                            setRole(response.data.role);
                            router.push("/dashboard")
                        }
                        setLoading(false);
                    }else{
                        setLoading(false);
                    }
                }
                else{
                    setLoading(false);
                    router.push("/verify-email");
                    descriptionMessage("Email Not Verified", "Your email is not yet verified. Please verify it first.")
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
    return (
        <div className='bg-landing w-full min-h-screen h-full flex flex-wrap flex-col items-center justify-between relative'>
            <div className='absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.08)] z-0'></div>
            <span className='w-full h-5'></span>
            <div className='w-full flex justify-center items-center relative z-50'>
                <form onSubmit={handler} className='bg-[#fdfcff] rounded-lg w-full flex flex-wrap justify-center max-w-[668px] p-7'>
                    <img src="/images/dream-book-logo.png" />
                    <div className="flex flex-wrap mt-10 w-full">
                        <label className="w-full text-sm text-inputLabel font-medium mb-1">Email</label>
                        <Input type="email" placeholder="Enter email" name={"email"} invalidmessage="Please enter a valid email." />
                    </div>
                    <div className="flex flex-wrap mt-5 w-full">
                        <label className="w-full text-sm font-medium mb-1">Password</label>
                        <Password placeholder="Enter password" name={"password"}></Password>
                    </div>
                    {/* {(fields.validemail )? */}
                    
                    <Button type="submit" variant={"primary"} className="mt-6" loading={loading}>Login</Button>
                    <Link href="/forgot-password" className='w-fit flex justify-center text-grey text-sm font-semibold mt-5 hover:underline'>Forgot Password?</Link>
                </form>
            </div>
            <div className='max-w-[800px] w-full z-10'>
                <SocialFooter />
            </div>
        </div>
    )
}
