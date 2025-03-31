import Button from "@/components/Button";
import Link from "@/components/Link";
import dayjs from "dayjs";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function SingleApplyUser({item,refresh}){
    const [modal,setModal] = useState(false)
    const [type,setType] = useState('')
    const modalHandler = () => {
        setModal(!modal)
    }
    const selector = (e) => {
        setType(e.currentTarget.getAttribute("value"))
        modalHandler()
    }
    return (
        <div  className='px-6 border-b py-3.5 w-full flex items-center justify-between'>
            <h5 className='font-poppins text-xs text-black w-2/12 font-normal'>{item?.full_name ? item?.full_name : 'N/A'}</h5>
            <h5 className='font-poppins text-xs text-black w-2/12 font-normal'>{item?.email ? item?.email : 'N/A'}</h5>
            <h5 className='font-poppins text-xs text-black w-2/12 font-normal text-center'>{dayjs(item?.applied_jobs[0]?.created_at).format("DD MMM YYYY")}</h5>
            <div className='w-2/12 flex justify-center'>
                {item?.applied_jobs[0]?.application_status == 0 && <h6 className='text-sm font-normal text-blue px-4 py-1 rounded-md w-fit text-center'>Pending</h6>}
                {item?.applied_jobs[0]?.application_status == 1 && <h6 className='text-sm font-normal text-yellow px-4 py-1 rounded-md w-fit text-center'>Shortlisted</h6>}
                {item?.applied_jobs[0]?.application_status == 3 && <h6 className='text-sm font-normal text-green px-4 py-1 rounded-md w-fit text-center'>Hired</h6>}
                {item?.applied_jobs[0]?.application_status == 2 && <h6 className='text-sm font-normal text-danger px-4 py-1 rounded-md  w-fit text-center'>Rejected</h6>}
            </div>
            <div className='flex flex-wrap items-center justify-end gap-3 w-4/12'>
                <Link href={`/seekers/${item.id}`}><Button variant={"green-with-border"} className="cursor-pointer">View</Button></Link>
                {item?.applied_jobs[0]?.application_status < 2 && <Button variant={"green"} value="hire" onClick={selector} className="cursor-pointer w-fit px-5">Hire</Button>}
                {item?.applied_jobs[0]?.application_status == 0 && <Button variant={"green"} value="shortlist" onClick={selector} className="cursor-pointer w-fit bg-yellow">Shortlist</Button>}
                {item?.applied_jobs[0]?.application_status < 2 && <Button variant={"danger"} value="decline" onClick={selector} className="cursor-pointer w-fit">Decline</Button>}
            </div>
            {modal && <ConfirmationModal type={type} id={item.applied_jobs[0].id} user={item.full_name} handler={modalHandler} refresh={refresh} />}
        </div>
    )
}