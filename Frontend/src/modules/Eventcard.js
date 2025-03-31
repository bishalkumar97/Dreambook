import Button from '@/components/Button'
import Popuplist from '@/components/Popuplist'
import Toggler from '@/components/Toggler'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Eventcard({event}) {
    
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // const eventStatusHandler = async () => {
    //     if(!event.isPublished){
    //         const res = await updateEventStatus(event._id);
    //         if(res.status){
    //             router.push(`/events`);
    //         }
    //     }
    //     else{
    //         toast.info("You can not unpublish the event.",{
    //             toastId:`API-Response-success-${Math.random()}`
    //         });
    //     }
    // }
    const deleteEventHandler = () => {
        setConfirmation(true);
    }
    // const yesConfirmation = async () => {
    //     setLoading(true);
    //     const res = await deleteEvent(event._id);
    //     console.log(res);
    //     if(res.status){
    //         setConfirmation(false);
    //         setLoading(false);
    //         router.push({
    //             pathname: router.pathname,
    //         });
    //     }
    //     else{
    //         setConfirmation(false);
    //         setLoading(false);
    //     }
    // }
    const noHandler = () => {
        setConfirmation(false);
    }
    return (
        <div className='w-full flex flex-wrap p-4 rounded-lg bg-white border border-[#EEEEEF] items-start relative'>
            <label className='absolute font-medium right-6 top-6 text-xs capitalize w-20 rounded-md py-2 leading-3 font-poppins text-success bg-green-100 flex items-center justify-center'>Active</label>
            {/* : <label className='absolute font-medium right-6 top-6 text-xs capitalize w-20 rounded-md py-2 leading-3 font-poppins text-danger bg-red-100 flex items-center justify-center'>Unpublish</label>} */}
            <img src={'/images/event.jpg'} className='rounded w-full h-60 object-cover' alt={"Job 1"} />
            <div className='w-full flex mt-4 justify-between'>
                <div className=' flex flex-wrap w-10/12'>
                    <div className='flex flex-wrap items-center gap-1 w-full'>
                        <span className='text-[#808085] text-[12px] font-sans font-medium'>Development</span>
                        <span className='size-1 bg-[#808085] rounded-full flex'></span>
                        <span className='text-[#808085] text-[12px] font-medium'>Online</span>
                    </div>
                    <h2 className='font-jakarta text-neutral-1000 font-semibold text-lg mt-1 capitalize truncate'>
                        Web Developer
                    </h2>
                </div>
                <Popuplist>
                    <span value="unfollow" className='cursor-pointer w-full py-2 px-3 gap-2 flex flex-wrap items-center text-blue hover:text-primary hover:bg-primary3 rounded-lg font-medium'>
                        Edit
                    </span>
                    {/* {!event.isPublished && <span
                        className='cursor-pointer w-full py-2 px-3 gap-2 flex flex-wrap items-center rounded-lg font-medium text-blue hover:text-primary hover:bg-primary3'
                        onClick={deleteEventHandler}
                    >
                        Delete
                    </span>}
                    <span onClick={()=> router.push(`/events/${event._id}/tickets`)} className='cursor-pointer w-full py-2 px-3 gap-2 flex flex-wrap items-center rounded-lg font-medium text-blue hover:text-primary hover:bg-primary3'>
                        Manage Tickets
                    </span>
                    {!event.isPublished && <span onClick={eventStatusHandler} className='cursor-pointer w-full py-2 px-3 gap-2 flex flex-wrap items-center rounded-lg font-medium text-blue hover:text-primary hover:bg-primary3'>
                        Mark it Publish 
                    </span>} */}
                </Popuplist>
            </div>
            <Button onClick={()=> router.push(`/manage-jobs/5}`)} variant="green-with-border" className="mt-6"> View Job </Button>
            {/* <div className='flex items-center flex-wrap w-full mt-4'>
                <h3 className='text-sm text-neutral-1000 font-jakarta font-semibold w-5/12'>Make event live</h3>
                <Toggler 
                    isSelected={event.isPublished?true: false} 
                    variant="default" 
                    size="sm" 
                    color="white" 
                    callback={eventStatusHandler} 
                    label1="Publish" 
                    label2="Unpublish" 
                    className="w-7/12"
                    markOnlyTrue={true}
                ></Toggler>
            </div> */}
            {/* {confirmation && <div className='z-50 fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur'>
                <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
                <h2 className='font-sora text-2xl text-center w-full font-semibold'>
                    Do you want to delete?
                </h2>
                <h3 className='w-full text-sm text-center my-3 text-neutral-700 font-sora'>
                    By clicking on Yes the event will be delete and will no longer accessable.
                </h3>
                <div className='w-full grid grid-cols-2 mt-5 gap-3'>
                    <Button variant="secondary" onClick={noHandler}>No</Button>
                    <Button variant="danger" loading={loading} onClick={yesConfirmation}>Yes</Button>
                </div>
                </div>
            </div>} */}
        </div>
    )
}
