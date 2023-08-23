import React from 'react'
import { useContext, useEffect, useState } from 'react'
import GlobalStateContext from '../../Context/GlobalStateContext'
import AdminContext from '../Context/AdminContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import MessageModal from './MessageModal'

export default function SupportTable() {

    const { UserSupportListFunc } = useContext(AdminContext)
    const { ConvertDateFormat } = useContext(GlobalStateContext)
    const [showMessageModal, setshowMessageModal] = useState(false)
    const [SupportList, setSupportList] = useState([])
    const [Message, setMessage] = useState(null)


    useEffect(() => {
        UserSupportListFunc().then((data) => {
            setSupportList(data);
        })
    }, [])


    return (
        SupportList.length == 0 ? <h1 className='text-sm text-center tracking-wide mt-40'>No messages !</h1> :
            <>
                <MessageModal Modal={showMessageModal} setModal={setshowMessageModal} message={Message} />
                <div className="relative h-[80vh] px-2 bg-white  shadow-lg overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar mt-5 mx-5">

                    <div className="relative ">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-[0.6rem] text-gray-400 uppercase bg-white sticky top-0 z-10 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[5%] text-center">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[30%] text-center">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[30%] text-center">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap w-[20%] text-center">
                                        Asked at
                                    </th>

                                    <th scope="col" className="pr-7 py-3 whitespace-nowrap w-[15%] text-center">
                                        Message
                                    </th>


                                </tr>
                            </thead>
                            <tbody className=''>
                                {SupportList.map((support, index) => {
                                    return (
                                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}   relative top-1 `}>

                                            <td className="px-6 py-2 text-xs  whitespace-nowrap w-[5%] text-center">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[25%] text-center ">
                                                {support.username}
                                            </td>

                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[20%] text-center ">
                                                {support.email}
                                            </td>



                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[5%] text-center">
                                                <div className='flex flex-col'>
                                                    {ConvertDateFormat(support.created)[0]}
                                                </div>
                                            </td>


                                            <td className="px-6 py-4 text-xs  whitespace-nowrap w-[5%] text-center ">

                                                <FontAwesomeIcon className='cursor-pointer relative' icon={faCircleInfo} onClick={() => { setshowMessageModal(true); setMessage({ 'username': support.username, 'message': support.message }) }} />
                                            </td>

                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>

                </div>
            </>)
}
