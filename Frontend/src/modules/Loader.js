import React from 'react'
import { RotatingTriangles } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className='w-full flex items-center justify-center my-3'>
            <RotatingTriangles
                visible={true}
                height="100"
                width="100"
                ariaLabel="rotating-triangels-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-triangels-wrapper"
                colors={['#5D60EF', '#efefff', '#ddddee']}
            />
        </div>
    )
}
