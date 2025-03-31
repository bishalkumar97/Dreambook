import React from 'react'

export default function Preferred({data}) {
    
    return (
        <div className='w-full flex flex-wrap items-end justify-between bg-white p-5 rounded-lg my-8'>
            <div className='w-full flex items-center justify-between'>
                <h4 className='text-black font-sans text-xl font-semibold'>Preferred Details</h4>
            
            </div>
            <div className='w-full flex items-center mt-6'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Preferred Positions</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.preferred_positions ? data?.preferred_positions : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Preferred Grade(s) / Level(s)</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.preferred_grade ? data?.preferred_grade : 'N/A'}</h5>
            </div>
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Preferred Subjects</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.preferred_subjects ? data?.preferred_subjects : 'N/A'}</h5>
            </div> 
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Substitute Position Availability</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.substitute_position_availability ? data?.substitute_position_availability : 'N/A'}</h5>
            </div> 
            <div className='w-full flex items-center mt-4'>
                <h5 className='text-grey font-medium text-sm w-3/12'>Additional Skills</h5>
                <h5 className='text-grey font-medium text-sm w-1/12'>:</h5>
                <h5 className='text-black font-normal text-sm w-7/12'>{data?.additional_skills ? data?.additional_skills : 'N/A'}</h5>
            </div> 
        </div>
    )
}
