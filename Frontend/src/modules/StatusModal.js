import React from 'react'

export default function StatusModal(props) {
    const handler = (e) => {
        props.handler(e.currentTarget.getAttribute("value"))
    }
  return (
    <div className='w-28 bg-white p-4 rounded-xl absolute top-12 border border-[#ededed] left-0 z-50'>
        <label htmlFor='verified' className='w-full flex items-center gap-2 cursor-pointer' value="1" onClick={handler}>
            {props.value == '1' ? <input type="radio" name="status" id="verified" value="verified" checked />:<input type="radio" name="status" id="verified" value="verified" />}
            <h6 className='text-xs text-black font-normal'>Verified</h6>
        </label>
        <label htmlFor='pending' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="0" onClick={handler}>
            {props.value == '0' ? <input type="radio" name="status" id="pending" value="pending" checked />:<input type="radio" name="status" id="pending" value="pending" />}
            <h6 className='text-xs text-black font-normal'>Pending</h6>
        </label>
        <label htmlFor='declined' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="2" onClick={handler}>
            {props.value == '2' ? <input type="radio" name="status" id="declined" value="declined" checked />:<input type="radio" name="status" id="declined" value="declined" />}
            <h6 className='text-xs text-black font-normal'>Declined</h6>
        </label>
        <label htmlFor='all' className='w-full flex items-center gap-2 mt-4 cursor-pointer' value="" onClick={handler}>
            {props.value == 'all' ? <input type="radio" name="status" id="all" value="all" checked />:<input type="radio" name="status" id="all" value="all" />}
            <h6 className='text-xs text-black font-normal'>All</h6>
        </label>
    </div>
  )
}
