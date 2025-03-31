import Button from '@/components/Button'
import DateTimeselector from '@/components/DateTimeselector'
import Modal from '@/components/Modal'
import { slotToISODateObject } from '@/Utilities/helpers';
import React, { useState } from 'react'
import dayjs from 'dayjs';
export default function Slots({handler}) {
    const [slotModal, setSlotModal] = useState(false);
    const [slots, setSlots] = useState([]);

    const slotHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const startDate = slotToISODateObject(formData.get("startDate"));
        const endDate = slotToISODateObject(formData.get("endDate"));
        let slot = {
            startDate,
            endDate
        };
        setSlots([...slots, slot]);
        setSlotModal(false);
        handler([...slots, slot]);
    }
    const deleteSlot = (index) => {
        const filteredSlots = slots.filter((item, ind) => index != ind);
        setSlots(filteredSlots);
        handler(filteredSlots);
    }
    return (
        <>
            <div className='w-full flex flex-wrap'>
                <div className='flex flex-wrap items-center justify-between mt-4 w-full'>
                    <label className="flex flex-wrap text-[#8181A5] text-sm font-medium">Event Slots</label>
                    <span role='button' onClick={()=> setSlotModal(true)} className='px-2 py-1 text-xs border border-blue rounded-md text-blue font-semibold hover:text-white hover:bg-blue'> Add Slot </span>
                </div>
                <ul className='w-full mt-2  justify-end grid grid-cols-1 gap-2'>
                    {slots && slots.map((item, index) => <li key={`Slot-${index}-${Math.random()}`} className='flex items-center justify-between w-full border rounded-md select-none py-1.5 px-4 text-blue '>
                            <span className=''> {dayjs(item.startDate).format("MMM D, YYYY h:mm A")} <b>-</b> {dayjs(item.endDate).format("MMM D, YYYY h:mm A")} </span>
                            <button className='cursor-pointer hover:bg-primary3 p-1 rounded-sm border' onClick={()=> deleteSlot(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M11.5999 4.40002L4.3999 11.6" stroke="#1c1c1c" strokeWidth="1.2" strokeinecap="round" strokeLinejoin="round"/>
                                    <path d="M4.3999 4.40002L11.5999 11.6" stroke="#1c1c1c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
            {slotModal && <Modal>
                <form onSubmit={slotHandler} className='grid grid-cols-1 gap-4 w-full max-w-64 md:max-w-md p-5 bg-white rounded-lg'>
                    <div className='w-full flex flex-wrap items-center justify-between'>
                        <h3 className='text-xl text-black-3 font-semibold'>Add Slot</h3>
                        <button onClick={()=> setSlotModal(false)} className='px-2 py-1 text-xs border border-blue rounded-md text-blue font-semibold hover:text-white hover:bg-blue'>ESC</button>
                    </div>
                    <div className='w-full flex flex-wrap'>
                        <label className="flex flex-wrap mt-1 w-full text-[#8181A5] text-sm font-medium mb-1">Event start date & time<span className='text-primary'>*</span></label>
                        <DateTimeselector required={true} name="startDate" />
                    </div>
                    <div className='w-full flex flex-wrap'>
                        <label className="flex flex-wrap w-full text-[#8181A5] text-sm font-medium mb-1">Event end date & time<span className='text-primary'>*</span></label>
                        <DateTimeselector required={true} name="endDate" />
                    </div>
                    <Button type="submit" variant="primary"> Save Slot </Button>
                </form>
            </Modal>}
        </>
    )
}
