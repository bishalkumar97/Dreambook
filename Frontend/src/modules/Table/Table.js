import React from 'react'

export default function Table({cols, children}) {
  return (
    <table className='w-full'>
        {children}
    </table>
  )
}
