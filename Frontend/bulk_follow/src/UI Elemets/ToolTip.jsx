import React from 'react'

export default function ToolTip({ message }) {


    return (
        <div className={` bg-gray-600  py-1 px-4  rounded-md   `} >
            <h1 className='text-xs text-center text-white tracking-wide '>{message}</h1>
        </div>
    )
}
