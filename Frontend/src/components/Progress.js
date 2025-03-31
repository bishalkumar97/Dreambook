import { cn } from "@/Utilities/cn";
import { cva } from "class-variance-authority";

export default function Progress({children, variant, progress,color,background,className}) {
  return (
    <div className={cn(progressVariants({variant}), backgroundColorVariants({background}))}>
        <div className={cn(progressVariants({variant}), progressColorVariants({color}))} style={{width:`${progress}%`}}></div>
    </div>
  )
}
const progressVariants = cva("border-none",{
    variants:{
        variant:{
            default:" h-2.5 rounded-xl"
        }
    },
    defaultVariants:{
        variant: "default"
    }
})
const backgroundColorVariants = cva("",{
    variants:{
        background:{
            default:"bg-[#F6F6F6]"
        }
    },
    defaultVariants:{
        background:"default"
    }
})

const progressColorVariants = cva("",{
    variants:{
        color:{
            default:"bg-[#12B3A6]",
            red: "bg-primary3"
        }
    },
    defaultVariants:{
        color:"default",
    }
})