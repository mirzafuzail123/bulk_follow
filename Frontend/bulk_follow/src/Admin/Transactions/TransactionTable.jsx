import React, { useEffect, useContext, useState } from 'react'
import AdminContext from '../Context/AdminContext'
import GlobalStateContext from '../../Context/GlobalStateContext'
import ToolTip from '../../UI Elemets/ToolTip'

export default function TransactionTable({ TransactionList, setTransactionList }) {

    const { TransactionListFunc } = useContext(AdminContext)
    const { ConvertDateFormat } = useContext(GlobalStateContext)
    const [showCreatedTip, setshowCreatedTip] = useState(null)


    useEffect(() => {
        TransactionListFunc().then((data) => {
            setTransactionList(data)
        })
    }, [])


    return (
        TransactionList.length == 0 ? <h1 className='text-sm text-center tracking-wide mt-40'>No transactions !</h1> :
            <>
                <div className="relative h-[80vh] px-2 bg-white  shadow-lg overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5 mx-5">

                    <div className="relative ">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[25%] text-center">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                        Customer
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[10%] text-center">
                                        Gateway
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                        Amount
                                    </th>
                                    <th scope="col" className="pr-7 py-3 whitespace-nowrap w-[10%] text-center">
                                        Created
                                    </th>


                                </tr>
                            </thead>
                            <tbody className=''>
                                {TransactionList.map((transaction, index) => {
                                    return (
                                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}   relative top-1 `}>

                                            <td className="px-6 py-2 text-xs  whitespace-nowrap w-[5%] text-center">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[25%] text-center ">
                                                {transaction.depositId}
                                            </td>

                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[20%] text-center ">
                                                {transaction.user}
                                            </td>
                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[10%] text-center ">
                                                {transaction.gateway}
                                            </td>
                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[10%] text-center font-mono ">
                                                <span className='text-sm'>$</span>{transaction.amount}
                                            </td>

                                            <td className="pt-5 pr-5 text-xs  whitespace-nowrap w-[5%] text-center flex flex-col ">
                                                <div className='flex flex-col'>
                                                    {showCreatedTip === transaction.id && <span className='absolute z-50 -mt-7  '><ToolTip key={index} message={ConvertDateFormat(transaction.created)[1]} /></span>}

                                                    <span
                                                        className='cursor-pointer relative'
                                                        onMouseEnter={() => setshowCreatedTip(transaction.id)}
                                                        onMouseLeave={() => setshowCreatedTip(null)}
                                                    >
                                                        {ConvertDateFormat(transaction.created)[0]}
                                                    </span>
                                                </div>
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
