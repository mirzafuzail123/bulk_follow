import React from 'react'
import SupportTable from './SupportTable'

export default function SupportPage() {
    return (
        <div>
            <div className='flex justify-between'>
                <div className='border-b-2 border-gray-200 ml-3 pb-2'>
                    <h1 className='text-2xl font-bold tracking-wide text-secondary '>Cutomer Support</h1>
                </div>

                <div>
                </div>
            </div>

            <SupportTable />
        </div>
    )
}
