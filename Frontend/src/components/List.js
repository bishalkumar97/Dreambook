"use client";

import React, { useRef, useState } from 'react'
import Option from './Option';
import Female from '../../public/icons/Female';
import Male from '../../public/icons/Male';
import Bars from '../../public/icons/Bars';

export default function List({value, multiple=true, callback}) {
  const ref = useRef(null)
  const [values, setValues] = useState([])
  const handler = (e) => {
    let val = e.target.getAttribute("value")

    ref.current.querySelectorAll("button").forEach(node => {
      node.classList.remove("bg-[#EAFAF8]")
      node.classList.remove("border-[#0E867C]")
      node.classList.add("bg-[#F6F6F6]")
    });

    e.target.classList.remove("bg-[#F6F6F6]")
    e.target.classList.add("bg-[#EAFAF8]")
    e.target.classList.add("bg-[#EAFAF8]")

    if(multiple){
      callback([...values, val])
      setValues(prev => [...prev, val])
    }
    else{
      callback(val)
      setValues(val)
    }
  }
  return (
    <div ref={ref} className='w-full flex flex-wrap gap-4'>
        <Option variant="fw" className={value=="male"?"bg-[#EAFAF8] border-[#0E867C]":""} value="male" onClick={handler}>
            <Male />
            Male
        </Option>
        <Option variant="fw" className={value=="female"?"bg-[#EAFAF8] border-[#0E867C]":""} value="female" onClick={handler}>
            <Female />
            Female
        </Option>
        <Option variant="fw" value="Prefer not to say" onClick={handler}>
            <Bars />
            Prefer not to say
        </Option>
    </div>
  )
}
