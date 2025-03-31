import { cn } from "@/Utilities/cn"
import { cva } from "class-variance-authority"
import Avatar from "../../public/icons/Avatar"
import Edit from "../../public/icons/Edit"
import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify'
import Image from "next/image"
import { imageValidator } from "@/Utilities/helpers"

export default function Uploader({children, className, variant, size, handler, existingUrl=null, ...attributes}) {
    const ref = useRef(null)
    const [url, setUrl] = useState(null)
    const [file, setFile] = useState(null)
    const clickHandler = (e) => {
        if(ref.current){
            ref.current.click()
        }
    }

    const uploadFileHandler = (val) => {
        handler(val)
        setUrl(URL.createObjectURL(val))
    }

    const coverHandler = (e) => {
        if(e.target.files && e.target.files.length>0){
            if(imageValidator(e.target.files[0])){
                setFile(e.target.files[0])
            }
        }
    }

    useEffect(()=>{
        if(file){
            uploadFileHandler(file)
        }
    },[file])

    return (
        <div className={cn(profileVariants({variant,size,className}))}>
            {!url && !existingUrl && <Avatar />}

            {url?<img src={url} alt="User-profile" className="h-full w-full rounded-full object-cover" /> : <img src={existingUrl} alt="User-profile" className="h-full w-full rounded-full object-cover" />}
            
            
            <input className="hidden" type="file" ref={ref} onChange={coverHandler} />
            
            <button onClick={clickHandler} className="absolute bottom-0 right-2 size-9 rounded-full bg-white flex items-center justify-center border border-neutral3 hover:bg-neutral3">
                <Edit />
            </button>
        </div>
    )
}

const profileVariants = cva("relative",{
    variants:{
        variant:{
            "default":"flex flex-wrap items-center justify-center rounded-full bg-neutral3 text-white border-none ",
        },
        size:{
            "default": "size-36"
        }
    },
    defaultVariants:{
        variant: "default",
        size: "default"
    }
})