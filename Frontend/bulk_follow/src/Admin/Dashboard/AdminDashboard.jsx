import React from 'react'
import AdminContext from '../Context/AdminContext'
import { useEffect, useContext, useState } from 'react'
import PendingLogo from '../assets/PendingLogo.png'
import TotalLogo from '../assets/TotalLogo.png'
import CompletedLogo from '../assets/CompletedLogo.png'
import InProgressLogo from '../assets/InProgressLogo.png'

export default function AdminDashboard() {

    const { TwitchOrderListFunc } = useContext(AdminContext)
    const [OrderList, setOrderList] = useState([])

    useEffect(() => {
        TwitchOrderListFunc().then((data) => {
            setOrderList(data)
        })
    }, [])


    return (
        <div className='bump w-[95%] mx-auto'>

            <div className='flex justify-between '>

                <div className='border-b-2 border-gray-200 ml-1'>
                    <h1 className='text-2xl font-bold tracking-wide text-secondary'>Dashboard</h1>
                </div>

            </div>

            <div className='grid place-items-center xs:grid-cols-1 lg:grid-cols-3  gap-y-10 w-[90%] mx-auto  mt-10 '>

                {/* Total */}
                <div className=' h-28 w-60 flex justify-center bg-white shadow-lg border-100 rounded-sm '>
                    <div className='flex flex-col mr-2 my-4 '>
                        <div className='flex space-x-2'>
                            <img src={TotalLogo} className='h-12 w-12' alt="" />
                            <h1 className='text-secondary font-semibold text-xl pt-2'>Total Orders</h1>
                        </div>
                        <p className='text-xl text-center font-mono tracking-wide pb-2'>{OrderList.length}</p>
                    </div>
                </div>

                {/* Completed */}
                <div className=' h-28 flex justify-center w-60 text-center bg-white shadow-lg border-100 rounded-sm'>
                    <div className='flex flex-col  my-4 '>
                        <div className='flex space-x-2'>
                            <img src={CompletedLogo} className='h-8 w-8' alt="" />
                            <h1 className='text-secondary font-semibold text-xl'>Orders completed</h1>
                        </div>
                        <p
                            className='text-xl text-center font-mono tracking-wide'>
                            {OrderList.filter((order) => order.status === 'completed').length}</p>
                    </div>
                </div>

                {/* Pending */}
                <div className=' h-28 w-60 flex justify-center bg-white shadow-lg border-100 rounded-sm '>
                    <div className='flex flex-col  my-4 '>
                        <div className='flex space-x-2'>
                            <img src={PendingLogo} className='h-8 w-8 text-primary' alt="" />
                            <h1 className='text-secondary font-semibold text-xl'>Pending Orders</h1>
                        </div>
                        <p className='text-xl text-center font-mono tracking-wide'>{OrderList.filter((order) => order.status === 'pending').length}</p>
                    </div>
                </div>

                {/* In Progress */}
                <div className=' h-28 flex justify-center w-60 text-center bg-white shadow-lg border-100 rounded-sm'>
                    <div className='flex flex-col mr-2 my-4 '>
                        <div className='flex space-x-2'>
                            <img src={InProgressLogo} className='h-9 w-9' alt="" />
                            <h1 className='text-secondary font-semibold text-xl'>In Progress</h1>
                        </div>
                        <p
                            className='text-xl text-center font-mono tracking-wide'>
                            {OrderList.filter((order) => order.status !== 'pending')
                                .filter((order) => order.status !== 'completed').length}</p>
                    </div>
                </div>


            </div>

        </div>
    )
}
