import React from 'react'

export default function Table({children}) {
  return (
    <div className="table-container border-1.5 border-gray-200 bg-white rounded-xl p-1">
        <table className="responsive-table ">
            {children}
        </table>
    </div>
  )
}
