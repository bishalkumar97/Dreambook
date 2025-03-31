import React, { useState } from 'react'

export default function Dropdown(props) {
  const [value,setValue] = useState(props.placeholder)
  const [show,setShow] = useState(false)
  const handler = (e) => {
    const val = e.currentTarget.getAttribute("value")
    setValue(val)
    props.callback(val,e.currentTarget.getAttribute("idValue"))
  }
  return (
    <div onClick={()=>setShow(!show)} className={`w-full relative border border-solid border-border-input bg-white ${show ? 'rounded-sm' :'rounded-md'}`}>
      <h5 className={`text-sm px-3 py-2.5 font-normal w-full cursor-text ${props.placeholder != value ? 'text-black' : 'text-placeholder' }`}>{value}</h5>
      {show && <div className='border dropdown bg-white border-solid border-border-input rounded-sm absolute w-full left-0 top-12 max-h-48 overflow-y-auto z-50'>
        {props.data?.map((item,index)=><h5 key={index} value={item.value} idValue={item?.id} onClick={handler} className='text-sm font-normal text-black px-4 py-2 hover:bg-green-light hover:text- cursor-pointer'>{item.value}</h5>)}
      </div>}
    </div>
  )
}
