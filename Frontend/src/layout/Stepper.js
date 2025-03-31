import { useRouter } from 'next/router';

export default function Stepper({step}) {
    return (
        <div className='w-full text-center flex flex-wrap justify-center items-center'>
            {/* <img src="/images/afro_logo_2.png" alt="Large afro logo" /> */}
            {/* <h1 className='w-full text-2xl font-poppins font-bold text-black-2'>Give us a few more informations </h1> */}

            <div className='w-full flex flex-wrap justify-center items-center mt-5 transition-all'>
                <span className={`${(step >= 1)? step == 1 ? "bg-yellow" : 'bg-green':" bg-border-nput"} size-6  flex flex-wrap items-center justify-center rounded-full text-xs `}></span>
                <span className={`h-0.5 w-5 ${(step && step > 1)?"bg-green":"bg-border-nput"} `}></span>
                <span className={`h-0.5 w-5 ${(step && step > 1)?"bg-green":"bg-border-nput"} `}></span>

                <span className={`${(step >= 2)? step == 2 ? "bg-yellow" : 'bg-green':" bg-border-nput"} size-6  flex flex-wrap items-center justify-center rounded-full text-xs `}></span>
                <span className={`h-0.5 w-5 ${(step && step > 2)?"bg-green":"bg-border-nput"} `}></span>
                <span className={`h-0.5 w-5 ${(step && step > 2)?"bg-green":"bg-border-nput"} `}></span>

                <span className={`${(step >= 3)? step == 3 ? "bg-yellow" : 'bg-green':" bg-border-nput"} size-6  flex flex-wrap items-center justify-center rounded-full text-xs `}></span>
                <span className={`h-0.5 w-5 ${(step && step > 3)?"bg-green":"bg-border-nput"} `}></span>
                <span className={`h-0.5 w-5 ${(step && step > 3)?"bg-green":"bg-border-nput"} `}></span>

                <span className={`${(step >= 4)? step == 4 ? "bg-yellow" : 'bg-green':" bg-border-nput"} size-6  flex flex-wrap items-center justify-center rounded-full text-xs `}></span>
                
            </div>
        </div>
    )
}