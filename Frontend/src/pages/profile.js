import React, { useEffect, useState } from 'react'
import Personal from '@/modules/profile/Personal'
import Documents from '@/modules/profile/Documents'
import Layout from '@/layout/Layout'
import CompanyDetail from '@/modules/profile/CompanyDetail'
import Google from '../../public/icons/Google'
import { getUser, setUser } from '@/services/firebase-services/cookies'
import CameraUploader from '@/modules/profile/CameraUploader'
import { updateProfile } from '@/services/APIs/onBoarding'
import { CircleLoader, MoonLoader, PuffLoader, RingLoader } from 'react-spinners'

export default function Profile() {
    const [data,setData] = useState('')
    const [banner,setBanner] = useState('')
    const [dp,setDp] = useState('')
    const [loading,setLoading] = useState(false)
    const dpHandler = (val) => {
        setDp(URL.createObjectURL(val))
        const formdata = new FormData();
        formdata.append("upload_logo", val);
        uploadMediaHandler(formdata)
    }
    const bannerHandler = (val) => {
        setBanner(URL.createObjectURL(val))
        const formdata = new FormData();
        formdata.append("cover_photo", val);
        uploadMediaHandler(formdata)
    }
    const uploadMediaHandler = async (formdata) => {
        setLoading(true)
        const response = await updateProfile(formdata)
        if(response?.status){
            setData(response?.data)
            setUser(response?.data)
            getDetails()
        }
        setLoading(false)
    }
    const getDetails = () => {
        setData(getUser())
        setBanner(getUser().cover_photo)
        setDp(getUser().upload_logo)
    }
    useEffect(()=>{
        if(getUser()){
            getDetails()
        }
        
    },[])
    return (
        <Layout>
            <img className={`w-full h-56 object-cover z-10 rounded-lg`} src={banner != '' ? banner : "url('/images/eventBanner.png')"}></img>
            <section className='container'>
                <div className='w-full flex items-end justify-between -mt-12 z-40 relative'>
                    <div className='flex items-end gap-6'>
                        <div className='border-4 border-white size-32 rounded-full relative'>
                            <img src={dp != '' ? dp : "/images/event.jpg"} alt="jj" className='h-full w-full rounded-full object-cover' />
                            <div className='absolute bottom-1 -right-3'>
                                {!loading ? <CameraUploader handler={dpHandler} />: <div className='size-10 rounded-full bg-green flex items-center justify-center'><PuffLoader color="white" size="20px" /></div>}
                            </div>
                        </div>
                        <div>
                            <h4 className='text-xl text-black font-semibold font-sans mb-8'>{data?.company_name}</h4>
                        </div>
                    </div>
                    <div className='absolute -top-2 right-4'>
                        {!loading ? <CameraUploader handler={bannerHandler} />: <div className='size-10 rounded-full bg-green flex items-center justify-center'><PuffLoader color="white" size="20px" /></div>}
                    </div>
                </div>
                <div className='w-full grid grid-cols-2 gap-8 my-8'>
                    <Personal data={data} edit={true} refresh={getDetails} />
                    <CompanyDetail data={data} refresh={getDetails} />
                </div>
                <Documents data={data} refresh={getDetails}/>
            </section>
        </Layout>

    )
}
