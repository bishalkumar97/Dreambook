import { imageValidator } from '@/Utilities/helpers';
import React, { useEffect, useRef, useState } from 'react'
import Camera from '../../../public/icons/Camera';

export default function CameraUploader({title, handler, existingUrl=null, existingFile=null, files=false, ...attributes}) {
    const ref = useRef(null);
    const [url, setUrl] = useState(null)
    const [file, setFile] = useState(null)

    const clickHandler = () => {
        if(ref.current){
            ref.current.click();
        }
    }

    const uploadFileHandler = (val) => {
        handler && handler(val)
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
        <>
            <div className='size-10 rounded-full bg-green flex items-center justify-center cursor-pointer' onClick={clickHandler}>
                <Camera/>
            </div>
            <input type="file" ref={ref} className='hidden' onChange={coverHandler} {...attributes} />

            
        </>
    )
}
