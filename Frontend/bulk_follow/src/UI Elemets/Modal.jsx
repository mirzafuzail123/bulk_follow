import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ Modal, setModal, Card }) {


    return (
        Modal && <div>

            <div id="popup-modal" tabIndex="-1" className="fixed  top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" >
                <div className="relative w-80 h-full  md:h-auto mx-auto mt-28">
                    <div className="relative bg-white rounded-lg shadow">

                        {/* Close */}
                        <div className='flex justify-end p-2'>
                            <span className='border h-6 w-6 px-2 cursor-pointer rounded-full bg-gray-100 hover:bg-dark-primary hover:text-white' onClick={() => { setModal(false) }}>
                                <FontAwesomeIcon className='text-sm pb-[0.15rem]' icon={faClose} />
                            </span>
                        </div>

                        <div className=" flex flex-col p-5">
                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
