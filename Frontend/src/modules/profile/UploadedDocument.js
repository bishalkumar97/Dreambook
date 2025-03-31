import React, { useEffect, useState } from 'react'
import File from '../../../public/icons/File'
import Button from '@/components/Button'
import Download from '../../../public/icons/Download'
import Link from '@/components/Link'

export default function UploadedDocument({title,url}) {
  const [type,setType] = useState('image')
  useEffect(()=>{
    const temp = url.split(".")
    setType(temp[temp.length-1])
  },[])
  return (
    <div className='shadow-searchbox p-5 rounded-md w-full'>
      <div className='flex gap-2 items-center'>
        <File/>
        <h5 className='text-input-label font-medium text-sm'>{title}</h5>
      </div>
      {type != 'pdf' && <img src={url} alt={title} className='w-full rounded-md object-cover mt-5 h-40 border' />}
      {type == 'pdf' && <Link href={url} target="_blank" rel="noreferrer" className='w-full rounded-md border mt-5 h-40 gap-1 flex items-center justify-center'>
        <File/>
        <h5 className='text-input-label font-normal text-sm'>View {title}.{type}</h5>
      </Link>}
      <Link href={url} target="_blank" rel="noreferrer"><Button variant={'green'} className="flex items-center gap-2 mt-3 hover:no-underline">
        <Download/>
        Download
      </Button></Link>
    </div>
  )
}