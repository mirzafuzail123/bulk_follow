import React from 'react'
import { useContext, useEffect, useState } from 'react'
import BackendContext from '../../Context/BackendContext'
import GlobalStateContext from '../../Context/GlobalStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import ToolTip from '../../UI Elemets/ToolTip'
import NotFound from '../../partials/NotFound'


export default function PaymentDetails({ PaymentDetailList }) {

    const { dummyState, ConvertDateFormat } = useContext(GlobalStateContext)
    const [showCreatedTip, setshowCreatedTip] = useState(null)


    return (
        <div>

            <div className='border-b border-gray-200 px-2 pb-4'>
                <h1 className='text-xl font-bold  text-secondary ' >
                    <span className='font-semibold text-2xl font-mono mr-1'><FontAwesomeIcon icon={faFileInvoice} className='text-primary' />
                    </span> Payment details</h1>
            </div>

            {PaymentDetailList.length === 0 ? <NotFound /> :

                <table className='w-full my-5'>

                    {/* Header */}
                    <thead className='text-sm' >
                        <tr className=''>

                            <th className='w-[15%] whitespace-nowrap text-center font-semibold'>
                                #
                            </th>

                            <th className='w-[30%] whitespace-nowrap text-center font-semibold'>
                                Deposit Id
                            </th>

                            <th className='w-[15%] whitespace-nowrap text-center font-semibold'>
                                Amount
                            </th>

                            <th className='w-[20%] whitespace-nowrap text-center font-semibold'>
                                Gateway
                            </th>
                            <th className='w-[25%] whitespace-nowrap text-center font-semibold'>
                                Deposited at
                            </th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className='' >
                        {PaymentDetailList.map((detail, index) => {
                            return (
                                <tr className={`text-xs ${index % 2 === 0 && 'bg-gray-50'} relative top-5`} key={index}>
                                    <td className='w-[15%] whitespace-nowrap text-center py-3' >
                                        {index + 1}
                                    </td>

                                    <td className='w-[35%] whitespace-nowrap text-center'>
                                        {detail.depositId}
                                    </td>

                                    <td className='w-[10%] whitespace-nowrap text-center  font-mono'>
                                        <span className='text-sm' >$</span>{detail.amount}
                                    </td>

                                    <td className='w-[20%] whitespace-nowrap text-center tracking-wide'>
                                        {detail.gateway}
                                    </td>

                                    <td className="p-3 text-xs  whitespace-nowrap text-center ">
                                        <div className='flex flex-col'>
                                            {showCreatedTip === detail.id && <span className='absolute z-50 -mt-7  '><ToolTip key={index} message={ConvertDateFormat(detail.created)[1]} /></span>}

                                            <span
                                                className='cursor-pointer relative'
                                                onMouseEnter={() => setshowCreatedTip(detail.id)}
                                                onMouseLeave={() => setshowCreatedTip(null)}
                                            >
                                                {ConvertDateFormat(detail.created)[0]}
                                            </span>
                                        </div>

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            }

        </div>
    )
}
