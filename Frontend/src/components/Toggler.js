import { cn } from "@/Utilities/cn"
import { cva } from "class-variance-authority"
import { useEffect, useState } from "react"


export default function Toggler({variant, isSelected=true, background, size, color, className,label1,label2, callback, markOnlyTrue=false}) {
    const [selected, setSelected] = useState(true)
    const handler = () => {
        if(!markOnlyTrue){
            callback(!selected)
            setSelected(prev => !prev)
        }
        else{
            callback(true);
            setSelected(true)
        }
    }
    useEffect(()=>{
        setSelected(isSelected)
    },[isSelected])
    return (
        <div className={cn(bgVariants({variant, background}),"flex items-center p-1 w-full", className)}>
            <div className={selected?cn(togglerVariants({variant, size, color})):cn(togglerVariants({variant, size}))} onClick={handler}>
                <span className="text-sm">{label1}</span>
            </div>
            <div className={!selected?cn(togglerVariants({variant, size, color})):cn(togglerVariants({variant, size}))} onClick={handler}>
                <span className="text-sm">{label2}</span>
            </div>
        </div>
    )
}

const togglerVariants = cva("w-full flex items-center justify-center cursor-pointer text-[10px]",{
    variants:{
        variant:{
            default:"rounded-full font-normal"
        },
        size:{
            lg:"py-1.5 px-5 text-base",
            sm:"py-1 px-2 text-xs"
        },
        color:{
            default: "bg-transparent",
            "white": "bg-primary text-white shadow-md"
        }
    },
    defaultVariants:{
        variant: "default",
        size: "lg",
        color:"default"
    }
})
const bgVariants = cva("text-blue select-none",{
    variants:{
        variant:{
            default:"rounded-full"
        },
        background:{
            default:"bg-white",
        }
    },
    defaultVariants:{
        variant: "default",
        background: "default"
    }
})