import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown';
import { cn } from '@/Utilities/cn'
import Dates from '@/Utilities/dates';
import { infoMessage } from '@/Utilities/toasters';
import dayjs from 'dayjs';
export default function DOB({variant, className, callback, date, value, ...atributes}) {
    const [dates, setDates] = useState(null);
    const [day, setDay] = useState(value ? dayjs(value).format("DD") : '')
    const [month, setMonth] = useState(value ? dayjs(value).format("MMM") : '')
    const [year, setYear] = useState(value ? dayjs(value).format("YYYY") : '')
    const dayHandler = (val) => {
        setDay(val)
    }
    const monthHandler = (val,val2) => {
        setMonth(val2)
    }
    const yearHandler = (val) => {
        setYear(val)
        if(day == ''){
            infoMessage("Select day")
        }else if(month == ''){
            infoMessage("Select month")
        }else if(day != '' && month != ''){
            let date = new Date(`"${val}-${month}-${day}"`)
            callback(date);
        }
        
    }
    useEffect(()=>{
        setDates(Dates())
        if(date){
            setDay(date.getDate());
            setMonth(date.getMonth() + 1);
            setYear(date.getFullYear());
        }
    },[])
    return (
        <div className={cn('w-full grid grid-cols-3 gap-3', className)} {...atributes}>
            <Dropdown data={dates && dates.days} value={day} placeholder={day ? day : "Day"} callback={dayHandler} />
            {(variant && variant=="long")?<Dropdown value={month} callback={monthHandler} data={dates && dates.months.long} placeholder={month ? month : "Month"}  />:<Dropdown value={month} data={dates && dates.months.short} placeholder={month ? month : "Month"} callback={monthHandler} />}
            <Dropdown data={dates && dates.year} value={year} placeholder={year ? year : "Year"} callback={yearHandler} />
        </div>
    )
}