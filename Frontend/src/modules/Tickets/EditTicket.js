import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { updateTicket } from '@/services/APIs/author';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
export default function EditTicket({ticket, handler}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const editTicketHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const payload = {
            "name": formData.get("ticketName"),
            "price": {
              "currency": "USD",
              "value": parseInt(formData.get("ticketPrice"))
            },
            "availableCount": parseInt(formData.get("ticketsCount")),
            "isEnabled": true
        }
        let flag = false;
        if(ticket.name != payload.name){
            flag = true;
        }
        else if(ticket.price.value != payload.price.value){
            flag = true;
        }
        else if(ticket.availableCount != payload.availableCount){
            flag = true;
        }
        else{
            flag = false;
        }
        if(flag){
            const res = await updateTicket(payload, ticket.event, ticket._id);
            if(res.status){
                router.push(`/events/${ticket.event}/tickets`);
                setLoading(false);
                handler(null, false);
            }
            else{
                setLoading(false);
            }
        }
        else{
            setLoading(false);
            toast.warning("Nothing to update as you have not made any changes.",{
                toastId:`API-Response-success-${Math.random()}`
            })
        }
        
    }
    return (
        <Modal>
            <div className='grid grid-cols-1 gap-4 w-full max-w-64 md:max-w-md p-5 bg-white rounded-lg'>
                <div className='w-full flex flex-wrap items-center justify-between'>
                    <h3 className='text-xl text-black-3 font-semibold'>Edit Ticket</h3>
                    <button onClick={()=> handler(null, false)} className='px-2 py-1 text-xs border border-blue rounded-md text-blue font-semibold hover:text-white hover:bg-blue'>ESC</button>
                </div>
                <div className='w-full flex flex-wrap'>
                    <form onSubmit={editTicketHandler} className='mt-6 w-full'>
                        <label className="flex flex-wrap w-full">
                            <span className="w-full text-sm font-medium mb-1">Ticket name</span>
                            <Input type="text" placeholder="Enter ticket name" defaultValue={ticket.name} name="ticketName" required={true} />
                        </label>

                        <label className="flex flex-wrap mt-4 w-full">
                            <span className="w-full text-sm font-medium mb-1">Ticket Price ($)</span>
                            <Input type="number" placeholder="Enter single ticket price" defaultValue={ticket.price.value} name="ticketPrice" required={true} ></Input>
                        </label>

                        <label className="flex flex-wrap mt-4 w-full">
                            <span className="w-full text-sm font-medium mb-1">Ticket Count</span>
                            <Input type="number" placeholder="Total number of tickets" name="ticketsCount" defaultValue={ticket.availableCount} required={true} ></Input>
                        </label>

                        <div className='grid grid-cols-2 gap-8 mt-8'>
                            <Button variant="secondary" onClick={()=> setAddTicketModel(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" loading={loading}>
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
                
            </div>
        </Modal>
    )
}
