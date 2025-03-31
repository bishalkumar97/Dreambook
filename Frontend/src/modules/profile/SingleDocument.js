import React from 'react'
import File from '../../../public/icons/File'
import Button from '@/components/Button'
import Download from '../../../public/icons/Download'
import Link from '@/components/Link'

export default function SingleDocument({title,url}) {
  return (
    <div className='shadow-searchbox p-5 rounded-md w-full'>
      <div className='flex gap-2 items-center'>
        <File/>
        <h5 className='text-input-label font-medium text-sm'>{title}</h5>
      </div>
      <img src={url} alt={title} className='w-full rounded-md mt-5 h-40' />
      <Link href={url} target="_blank" rel="noreferrer"  ><Button variant={'green'} className="flex items-center gap-2 mt-3">
        <Download/>
        Download
      </Button></Link>
    </div>
  )
}
