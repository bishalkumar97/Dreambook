import React, { useState } from 'react'
import Edit from '../../../public/icons/Edit'
import DocumentModal from './DocumentModal'
import SingleDocument from './SingleDocument'

export default function Documents({data,refresh}) {
  const [modal,setModal] = useState(false)
  const modalHandler = () => {
    setModal(!modal)
    refresh()
  }
  return (
    <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg my-8'>
      {modal && <DocumentModal data={data} handler={modalHandler} />}
      <div className='w-full flex flex-wrap items-end justify-between bg-white rounded-lg'>
        <div className='flex items-center justify-between w-full'>
          <h4 className='text-black font-sans text-xl font-semibold'>Documents Uploaded</h4>
          <div onClick={modalHandler} className='cursor-pointer'>
          <Edit/>
        </div>
        </div>
        <div className='w-full grid grid-cols-3 gap-8 mt-5'>
          {data?.upload_company_registration && <SingleDocument title="Company Registration" url={data?.upload_company_registration}/>}
          {/* {data?.upload_logo && <SingleDocument title="Company Logo" url={data?.upload_logo}/>} */}
        </div>
      </div>
    </div>
  )
}
