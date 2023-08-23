import React from 'react'
import { useContext, useEffect, useState } from 'react'
import GlobalStateContext from '../../Context/GlobalStateContext'
import BackendContext from '../../Context/BackendContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import ToolTip from '../../UI Elemets/ToolTip'
import NotFound from '../../partials/NotFound'

export default function OrderHistoryTable({ OrderData }) {

    const { ConvertDateFormat } = useContext(GlobalStateContext)
    const [showCreatedTip, setshowCreatedTip] = useState(null)



    return (
        OrderData.length === 0 ? <NotFound /> :

            <div className=' mx-auto'>


                <table className="w-full text-sm text-left text-gray-500  overflow-auto ">
                    <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10 ">
                        <tr>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                Order ID
                            </th>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                Channel Name
                            </th>
                            <th scope="col" className="px-6 py-3  w-[10%] text-center">
                                No of views
                            </th>
                            <th scope="col" className="px-6 py-3  w-[5%] text-center">
                                Viewers Count
                            </th>
                            <th scope="col" className="px-6 py-3  w-[5%] text-center">
                                JoinDelay
                            </th>
                            <th scope="col" className="px-6 py-3  w-[5%] text-center">
                                TotalCharge
                            </th>

                            <th scope="col" className="px-6 py-3 whitespace-nowrap w-[10%] text-center">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                Ordered at
                            </th>

                            {/* <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                Order Again
                            </th> */}

                        </tr>
                    </thead>
                    <tbody className=''>
                        {OrderData.map((order, index) => {
                            return (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}  `}>

                                    <td className="p-3 text-xs  whitespace-nowrap w-[5%] text-center">
                                        {order.index}
                                    </td>

                                    <td className="p-3 text-xs  whitespace-nowrap w-[20%] text-center ">
                                        {order.orderId}
                                    </td>

                                    <td className="px-6 py-4 text-xs  whitespace-nowrap w-[20%] text-center ">
                                        {order.channelName}
                                    </td>
                                    <td className="p-3 text-xs  whitespace-nowrap w-[10%] text-center ">
                                        {order.no_of_views}
                                    </td>
                                    <td className="p-3 text-xs  whitespace-nowrap w-[5%] text-center ">
                                        {order.desiredViewersCount}
                                    </td>
                                    <td className="p-3 text-xs  whitespace-nowrap w-[5%] text-center ">
                                        {order.joinDelay}
                                    </td>
                                    <td className="p-3 text-xs font-mono  whitespace-nowrap w-[5%] text-center ">
                                        <span className='font-bold text-sm'>$</span>{order.totalCharge}
                                    </td>

                                    <td className="p-3 flex py-4 text-xs  whitespace-nowrap">
                                        <div className={`${order.status === 'completed' ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}  h-5   rounded-full `}>
                                            <span
                                                className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">
                                                {order.status === 'completed' ? 'completed' : 'pending'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-xs  whitespace-nowrap w-[5%] text-center ">
                                        <div className='flex flex-col'>
                                            {showCreatedTip === order.id && <span className='absolute z-50 -mt-7  '><ToolTip key={index} message={ConvertDateFormat(order.created)[1]} /></span>}

                                            <span
                                                className='cursor-pointer relative'
                                                onMouseEnter={() => setshowCreatedTip(order.id)}
                                                onMouseLeave={() => setshowCreatedTip(null)}
                                            >
                                                {ConvertDateFormat(order.created)[0]}
                                            </span>
                                        </div>

                                    </td>
                                    {/* 
                                    <td className="p-3  text-xs  whitespace-nowrap w-[5%] text-center ">
                                        <FontAwesomeIcon icon={faCartShopping} className='text-lg cursor-pointer' />
                                    </td> */}
                                </tr>
                            )
                        })}


                    </tbody>
                </table>

            </div>
    )
}
