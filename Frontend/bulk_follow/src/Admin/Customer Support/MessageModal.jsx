import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faMessage } from '@fortawesome/free-solid-svg-icons'

export default function MessageModal({ Modal, setModal, message }) {


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-80 h-full  md:h-auto mx-auto mt-28">
                    <div className="relative bg-white rounded-lg shadow px-3">

                        {/* Header */}
                        <div className='flex justify-between  h-[20%] border-b'>

                            {/* Heading */}
                            <div className='p-5'>
                                <h1 className='text-xl text-secondary font-bold'>{message.username}'s message </h1>
                            </div>

                            {/* Close */}
                            <span className='my-2 border h-6 w-6 px-2 cursor-pointer rounded-full bg-gray-100 hover:bg-dark-primary hover:text-white' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pb-[0.15rem]' icon={faClose} />
                            </span>
                        </div>

                        {/* Body */}
                        <div className=" flex flex-col space-y-3 py-7 px-5">

                            <div className='flex'>
                                <FontAwesomeIcon icon={faMessage} className='text-gray-400 ' />
                                <h1 className='font-semibold pl-2 relative bottom-[0.35rem]'>Message</h1>
                            </div>

                            {/* Message */}
                            <div className={`flex  items-center border-2 text-sm  py-2 px-2 rounded-sm `}>
                                <textarea
                                    rows={6}
                                    value={message.message}
                                    readOnly
                                    className="pl-2 outline-none  w-full  border-none resize-none scrollbar-thin scrollbar-y-none scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-medium rounded-scrollbar"
                                    name='message'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
