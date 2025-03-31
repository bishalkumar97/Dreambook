import Button from '@/components/Button';
import { imageValidator } from '@/Utilities/helpers';
import { Delete, ImageUp, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export default function Uploader({ title, handler, existingUrl = null, existingFile = null, files = false, ...attributes }) {
    const ref = useRef(null);
    const [url, setUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [isImage, setIsImage] = useState("image");
    const [name, setName] = useState("");

    const clickHandler = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const uploadFileHandler = (val) => {
        const isValidImage = imageValidator(val);
        setIsImage(isValidImage);
        if (isValidImage) {
            handler && handler(val);
            setUrl(URL.createObjectURL(val));
            setName(val.name);
        }
    };

    const coverHandler = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            uploadFileHandler(selectedFile);
        }
    };

    const deleteHandler = () => {
        setIsImage(false);
        setFile(null);
        setUrl(null);
        setName("")
    }
    useEffect(() => {
        if (file) {
            uploadFileHandler(file);
        }
    }, [file]);

    return (
        <>
            {files && file && (
                <div className="group relative w-full h-auto py-5 rounded-md flex flex-wrap items-center justify-start">
                    <div className="w-auto border border-dashed bg-purple-100 p-3 rounded-md">
                        {file.name}
                    </div>
                </div>
            )}
            {((!url && !existingUrl && !existingFile) || files) && (
                <div
                    className="w-full border-3 bg-input-bg border-dotted rounded-lg bg-primary3 p-6 flex flex-wrap items-center justify-center cursor-pointer uploader"
                    onClick={clickHandler}
                >
                    <ImageUp />
                    {/* <ImageUpscale/> */}
                    <h3 className="text-base w-full text-black-3 text-center mt-2">
                        {title}
                        <sup className="text-red-500">*</sup>
                    </h3>
                    <h3 className="text-sm w-full text-center text-[#B1B1B1] mt-0.5">
                        ( Acceptable formats: PDF, JPEG, PNG, Max 2mb )
                    </h3>
                </div>
            )}
            <input
                type="file"
                ref={ref}
                className="hidden"
                onChange={coverHandler}
                {...attributes}
            />

            {!files && (url || existingUrl || existingFile) && (
                <div
                    className="relative w-full px-2.5 py-3.5 rounded-md bg-input-bg flex flex-wrap items-center justify-between"
                    
                >
                    <div className='w-9/12 flex items-center'>
                        {isImage == 'image' && (
                            <Image
                                src={url || existingUrl || URL.createObjectURL(existingFile)}
                                alt="Uploaded content"
                                className="rounded-md"
                                height={56}
                                width={56}
                            />
                        )}
                        {isImage == 'file' && file && (
                            <div className="text-center">
                                <p className="font-poppins text-base text-black-3">{file.name}</p>
                            </div>
                        )}
                        <span className="text-sm ml-3 text-primary underline ">
                            {name}
                        </span>
                    </div>
                    <div className='w-2/12 flex flex-wrap justify-between items-center'>
                        <Button type="button" onClick={clickHandler} className={"w-7/12"} variant={"primary"}>Re-Upload</Button>
                        <Button type="button" className={"w-5/12"} variant={"secondary"} onClick={deleteHandler}>
                            <Trash2 color='#555555' />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
