import React, { useEffect, useContext, useState } from 'react'
import AdminContext from '../Context/AdminContext'
import GlobalStateContext from '../../Context/GlobalStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons'
import ToolTip from '../../UI Elemets/ToolTip'


export default function OrderTable({ OrderList, setOrderList, setshowOrderDetail, setSelectedOrder, setshowEditOrder, dummyState }) {

    const { TwitchOrderListFunc } = useContext(AdminContext)
    const { ConvertDateFormat } = useContext(GlobalStateContext)
    const [showCreatedTip, setshowCreatedTip] = useState(null)


    const handleOrderStatusColor = (status) => {
        var statusColor
        switch (status) {
            case 'completed':
                statusColor = 'bg-green-300 text-green-900'
                break;

            case 'pending':
                statusColor = 'bg-red-300 text-red-900'
                break;

            default:
                statusColor = 'bg-yellow-300 text-yellow-900'
                break;
        }
        return statusColor
    }



    useEffect(() => {
        TwitchOrderListFunc().then((data) => {
            setOrderList(data)
        })
    }, [dummyState])



    return (
        OrderList.length == 0 ? <h1 className='text-sm text-center tracking-wide mt-40'>No Orders !</h1> :

            <>
                <div className="relative h-[80vh] px-2 bg-white  shadow-lg   overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5 mx-5">

                    <div className="relative ">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                        Order ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                        API Order ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                        Channel Name
                                    </th>

                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[10%] text-center">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                        Ordered at
                                    </th>

                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                        Detail
                                    </th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                {OrderList.map((order, index) => {
                                    return (
                                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}   relative top-1 `}>

                                            <td className="px-6 py-2 text-xs  whitespace-nowrap w-[5%] text-center">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[20%] text-center ">
                                                {order.orderId}
                                            </td>

                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[20%] text-center ">
                                                {order.apiOrderId}
                                            </td>
                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[20%] text-center ">
                                                {order.channelName}
                                            </td>

                                            <td className="px-6 flex py-4 text-xs  whitespace-nowrap">
                                                <div
                                                    className={`${handleOrderStatusColor(order.status)}  h-5   rounded-full `}>
                                                    <span
                                                        className="text-[0.70rem] px-1 left-1 relative  font-medium mr-2">
                                                        {order.status}
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

                                            <td className="px-6 py-4 flex space-x-4 cursor-pointer whitespace-nowrap w-[5%] text-center ">
                                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => { setshowEditOrder(true); setSelectedOrder(OrderList[index]) }} />
                                                <FontAwesomeIcon icon={faEye} onClick={() => { setshowOrderDetail(true); setSelectedOrder(OrderList[index]) }} />
                                            </td>

                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>

                </div>

            </>
    )
}
