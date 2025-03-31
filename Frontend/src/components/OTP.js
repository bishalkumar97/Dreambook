"use client"
import { cn } from '@/Utilities/cn';
import { useRef } from 'react';
import Input from './Input';

export default function OTP({children, className, digits=6, handler}) {
    const inputRefs = useRef([]);
    let value = []
    const addInputIntoRefArray = (index, el) => {
        inputRefs.current[index] = el
    }
    const handleInputChange = (index, e) => {
        e.currentTarget.value = parseInt(e.currentTarget.value) % 10;
        value[index] = parseInt(e.currentTarget.value) % 10;
        const nextIndex = index + 1;
        if (nextIndex < inputRefs.current.length) {
            inputRefs.current[nextIndex].querySelectorAll("input")[0].focus()
        }
        else{
            let returnString = ""
            inputRefs.current[index].querySelectorAll("input")[0].blur();
            for(let i=0;i<value.length; i++){
                if(value[i] >= 0){
                    returnString = returnString.concat(value[i])
                }
                else{
                    inputRefs.current[i].querySelectorAll("input")[0].focus()
                    break;
                }
            }
            if(returnString.length == parseInt(digits)){
                handler(returnString,true)
            }
        }
    }

    if(parseInt(digits)==4) return (
        <div ref={ref} className={cn("w-auto grid grid-cols-4 gap-3 my-3",className)}>
            <div className='max-w-12'>
                <Input type="number" min="0" max="9" className="text-center" placeholder="-" />
            </div>
            <div className='max-w-12'>
                <Input type="number" min="0" max="9" className="text-center" placeholder="-" />
            </div>
            <div className='max-w-12'>
                <Input type="number" min="0" max="9" className="text-center" placeholder="-" />
            </div>
            <div className='max-w-12'>
                <Input type="number" min="0" max="9" className="text-center" placeholder="-" />
            </div>
        </div>
    )

    return (
        <div className={cn("w-auto grid grid-cols-6 gap-2 my-3",className)}>
            {[...Array(parseInt(digits))].map((_, index) => (<div key={`otp-input-${index}`} className='max-w-12' ref={(el) => addInputIntoRefArray(index, el)}>
                    <Input type="number" min="0" max="9" className="text-center" placeholder="-" index={index} onChange={(e) => handleInputChange(index, e)} />
                </div>
            ))}
        </div>
    )
}
